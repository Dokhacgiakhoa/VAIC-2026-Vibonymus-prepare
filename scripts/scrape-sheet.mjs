import fs from 'node:fs';
import path from 'node:path';
import { parseCsv, csvToObjects } from './lib/csv.mjs';

const SHEET_ID = '1ReeLa-FI_65bFFoNl4ep3nbl9QnYFVMGcLUZS3HGU1w';
const SHEET_EXPORT_URL = (gid) => `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;

const TABS = {
  hackers: 0,
  teams: 757105758,
};

// Cột chứa email cá nhân — không được ghi vào bản commit công khai.
const EMAIL_FIELDS = new Set(['Email', 'Lead Email']);
// Một số người điền email vào ô tự do (vd. "Note") — lọc bằng regex thay vì chỉ dựa vào tên cột.
const EMAIL_PATTERN = /[\w.+-]+@[\w-]+\.[\w.-]+/g;

const RAW_DIR = path.resolve('data/sheet-raw');
const PUBLIC_DIR = path.resolve('data/sheet');
const SRC_DATA_DIR = path.resolve('src/data');

function nowStamp() {
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, '').slice(0, 15);
}

async function fetchTab(gid) {
  const res = await fetch(SHEET_EXPORT_URL(gid));
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} khi tải sheet (gid=${gid})`);
  }
  const text = await res.text();
  return csvToObjects(parseCsv(text));
}

function redact(rows) {
  return rows.map((row) => {
    const clean = {};
    for (const [key, value] of Object.entries(row)) {
      if (EMAIL_FIELDS.has(key)) continue;
      clean[key] = typeof value === 'string' ? value.replace(EMAIL_PATTERN, '[email removed]') : value;
    }
    return clean;
  });
}

async function main() {
  console.log('Đang tải Google Sheet (public, không cần token)...');
  const hackers = await fetchTab(TABS.hackers);
  const teams = await fetchTab(TABS.teams);

  const scrapedAt = new Date().toISOString();
  const rawSnapshot = { scrapedAt, hackers, teams };
  const publicSnapshot = {
    scrapedAt,
    hackers: redact(hackers),
    teams: redact(teams),
  };

  fs.mkdirSync(RAW_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.mkdirSync(SRC_DATA_DIR, { recursive: true });

  const rawFile = path.join(RAW_DIR, `${nowStamp()}.json`);
  fs.writeFileSync(rawFile, JSON.stringify(rawSnapshot, null, 2));
  fs.writeFileSync(path.join(PUBLIC_DIR, 'latest.json'), JSON.stringify(publicSnapshot, null, 2));
  // Bản công khai (đã lược email) copy sang src/data/ để frontend import trực tiếp, giống competitors-data.json.
  fs.writeFileSync(path.join(SRC_DATA_DIR, 'sheet-data.json'), JSON.stringify(publicSnapshot, null, 2));

  console.log(`Đã cào ${hackers.length} hacker, ${teams.length} đội từ sheet.`);
  console.log(`Bản đầy đủ (có email, KHÔNG commit): ${path.relative(process.cwd(), rawFile)}`);
  console.log(`Bản công khai (đã lược email): ${path.relative(process.cwd(), path.join(PUBLIC_DIR, 'latest.json'))}`);
  console.log(`Bản dùng cho frontend: src/data/sheet-data.json`);
}

main().catch((err) => {
  console.error('\nLỗi khi cào Google Sheet:', err.message);
  process.exit(1);
});
