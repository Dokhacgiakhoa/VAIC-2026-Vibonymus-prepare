import fs from 'node:fs';
import path from 'node:path';
import { diffSnapshots, formatChangelogEntry } from './lib/diff.mjs';

const SCRAPES_DIR = path.resolve('data/scrapes');
const LATEST_FILE = path.join(SCRAPES_DIR, 'latest.json');
const CHANGELOG_FILE = path.join(SCRAPES_DIR, 'CHANGELOG.md');
const COMPETITORS_DATA_FILE = path.resolve('src/data/competitors-data.json');

function listSnapshotFiles() {
  if (!fs.existsSync(SCRAPES_DIR)) return [];
  return fs
    .readdirSync(SCRAPES_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'latest.json')
    .sort(); // tên file bắt đầu bằng timestamp -> sort chuỗi = sort theo thời gian
}

function main() {
  const files = listSnapshotFiles();
  if (files.length === 0) {
    console.error('Không tìm thấy snapshot nào trong data/scrapes/. Hãy chạy `npm run scrape` trước.');
    process.exit(1);
  }

  const snapshots = files.map((f) => JSON.parse(fs.readFileSync(path.join(SCRAPES_DIR, f), 'utf8')));

  const changelogEntries = [];
  for (let i = 0; i < snapshots.length; i += 1) {
    const previous = i > 0 ? snapshots[i - 1] : null;
    const current = snapshots[i];
    const diff = previous ? diffSnapshots(previous, current) : null;
    changelogEntries.push(formatChangelogEntry(previous, current, diff));
  }
  changelogEntries.reverse(); // mới nhất lên đầu

  const latest = snapshots[snapshots.length - 1];

  fs.writeFileSync(LATEST_FILE, JSON.stringify(latest, null, 2));
  fs.writeFileSync(CHANGELOG_FILE, `# Lịch sử cào dữ liệu đối thủ\n\n${changelogEntries.join('\n')}`);

  fs.mkdirSync(path.dirname(COMPETITORS_DATA_FILE), { recursive: true });
  fs.writeFileSync(COMPETITORS_DATA_FILE, JSON.stringify(latest, null, 2));

  console.log(`Đã xử lý ${snapshots.length} snapshot.`);
  console.log(`- ${path.relative(process.cwd(), LATEST_FILE)}`);
  console.log(`- ${path.relative(process.cwd(), CHANGELOG_FILE)}`);
  console.log(`- ${path.relative(process.cwd(), COMPETITORS_DATA_FILE)}`);
}

main();
