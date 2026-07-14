import fs from 'node:fs';
import path from 'node:path';
import { ensureLoggedIn, usernameSlug } from './lib/auth.mjs';
import { fetchTaxonomies, fetchAllTeams, fetchProfile, ApiError, sleep, REQUEST_DELAY_MS } from './lib/api.mjs';
import { buildLabelMaps, transformTeam } from './lib/transform.mjs';
import { diffSnapshots, formatDiffSummary } from './lib/diff.mjs';

const SCRAPES_DIR = path.resolve('data/scrapes');
const CACHE_DIR = path.resolve('.cache/profiles');

function parseArgs(argv) {
  const limitArg = argv.find((a) => a.startsWith('--limit='));
  return { limit: limitArg ? Number(limitArg.split('=')[1]) : Infinity };
}

function nowStamp() {
  // 20260709T103000
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, '').slice(0, 15);
}

function listSnapshotFiles() {
  if (!fs.existsSync(SCRAPES_DIR)) return [];
  return fs
    .readdirSync(SCRAPES_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'latest.json')
    .sort(); // filenames start with ISO-like timestamp, sorts chronologically
}

function loadLatestSnapshot() {
  const files = listSnapshotFiles();
  if (files.length === 0) return null;
  const last = files[files.length - 1];
  return JSON.parse(fs.readFileSync(path.join(SCRAPES_DIR, last), 'utf8'));
}

function loadCachedProfile(handle) {
  const file = path.join(CACHE_DIR, `${handle}.json`);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function saveCachedProfile(handle, profile) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(path.join(CACHE_DIR, `${handle}.json`), JSON.stringify(profile));
}

function clearCache() {
  fs.rmSync(path.resolve('.cache'), { recursive: true, force: true });
}

async function main() {
  const { limit } = parseArgs(process.argv.slice(2));
  const startedAt = Date.now();

  const { token, me } = await ensureLoggedIn();
  const scraperName = usernameSlug(me);

  console.log('Đang tải danh mục tra cứu (taxonomies)...');
  const taxonomies = await fetchTaxonomies(token);
  const labelMaps = buildLabelMaps(taxonomies);

  console.log('Đang cào danh sách đội...');
  const rawTeams = await fetchAllTeams(token, {
    limit,
    onProgress: (count, total) => process.stdout.write(`\r  Đã lấy ${count}/${total} đội...`),
  });
  process.stdout.write('\n');

  const uniqueHandles = [...new Set(rawTeams.flatMap((t) => (t.members || []).map((m) => m.handle)).filter(Boolean))];
  console.log(`Cần cào hồ sơ của ${uniqueHandles.length} thành viên duy nhất...`);

  const profilesByHandle = new Map();
  let fetchedCount = 0;

  try {
    for (const handle of uniqueHandles) {
      const cached = loadCachedProfile(handle);
      if (cached) {
        profilesByHandle.set(handle, cached);
        fetchedCount += 1;
        continue;
      }

      const profile = await fetchProfile(token, handle);
      profilesByHandle.set(handle, profile);
      saveCachedProfile(handle, profile);
      fetchedCount += 1;
      process.stdout.write(`\r  Đã cào ${fetchedCount}/${uniqueHandles.length} thành viên...`);
      await sleep(REQUEST_DELAY_MS);
    }
  } catch (err) {
    process.stdout.write('\n');
    if (err instanceof ApiError && err.status === 401) {
      console.error(
        '\nPhiên đăng nhập đã hết hạn giữa chừng khi đang cào.\n' +
          `Đã cào được ${fetchedCount}/${uniqueHandles.length} thành viên (kết quả đã cào được giữ lại trong .cache/, sẽ dùng lại khi chạy tiếp).\n` +
          'Vui lòng chạy lại `npm run scrape` để đăng nhập lại và tiếp tục.'
      );
      process.exit(1);
    }
    throw err;
  }
  process.stdout.write('\n');

  const teams = rawTeams.map((rawTeam) => transformTeam(rawTeam, profilesByHandle, labelMaps));

  const newSnapshot = {
    scrapedAt: new Date().toISOString(),
    scrapedBy: scraperName,
    totalTeams: teams.length,
    teams,
  };

  const previousSnapshot = loadLatestSnapshot();
  const diff = diffSnapshots(previousSnapshot, newSnapshot);

  fs.mkdirSync(SCRAPES_DIR, { recursive: true });
  const snapshotFile = path.join(SCRAPES_DIR, `${nowStamp()}-${scraperName}.json`);
  fs.writeFileSync(snapshotFile, JSON.stringify(newSnapshot, null, 2));

  clearCache();

  const elapsedSec = Math.round((Date.now() - startedAt) / 1000);
  console.log(`\n=== HOÀN TẤT ===`);
  console.log(`Đã cào ${teams.length} đội, ${uniqueHandles.length} thành viên trong ${elapsedSec}s.`);
  console.log(`Snapshot: ${path.relative(process.cwd(), snapshotFile)}`);
  if (previousSnapshot) {
    console.log(`\nSo với lần cào trước (${previousSnapshot.scrapedAt}):`);
    console.log(formatDiffSummary(diff));
  } else {
    console.log('\nĐây là lần cào đầu tiên, chưa có dữ liệu để so sánh.');
  }
  console.log('\nChạy `npm run rebuild-index` để cập nhật latest.json / CHANGELOG.md / src/data/competitors-data.json.');
}

main().catch((err) => {
  console.error('\nLỗi khi cào dữ liệu:', err.message);
  process.exit(1);
});
