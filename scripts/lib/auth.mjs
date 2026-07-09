import fs from 'node:fs';
import path from 'node:path';

const AUTH_DIR = path.resolve('.auth');
const TOKEN_CACHE_FILE = path.join(AUTH_DIR, 'token.json');
const TOKEN_INPUT_FILE = path.join(AUTH_DIR, 'token.txt');
const API_BASE = 'https://hub-api.aiforvietnam.org';
const EXPIRY_SAFETY_MARGIN_SEC = 5 * 60;

// Ghi chú: ban đầu định dùng Playwright tự mở trình duyệt cho người dùng đăng nhập,
// nhưng Google chặn đăng nhập OAuth trong trình duyệt điều khiển tự động ("This browser
// may not be secure"). Vì vậy chuyển sang cách thủ công: người dùng tự đăng nhập trong
// Chrome bình thường của họ, copy token (Bearer JWT lưu trong localStorage), rồi tự tạo
// file .auth/token.txt dán token vào (không nhập qua stdin, vì không phải terminal nào
// cũng hỗ trợ nhập tương tác).

function decodeJwtExpiry(token) {
  try {
    const payloadB64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf8'));
    return payload.exp || null; // unix giây
  } catch {
    return null;
  }
}

async function getMe(token) {
  try {
    const res = await fetch(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function loadCachedToken() {
  if (!fs.existsSync(TOKEN_CACHE_FILE)) return null;
  try {
    const { token, exp } = JSON.parse(fs.readFileSync(TOKEN_CACHE_FILE, 'utf8'));
    if (!token || !exp) return null;
    const nowSec = Date.now() / 1000;
    if (exp - nowSec < EXPIRY_SAFETY_MARGIN_SEC) return null; // sắp hết hạn -> coi như hết hạn
    return token;
  } catch {
    return null;
  }
}

function loadTokenFromInputFile() {
  if (!fs.existsSync(TOKEN_INPUT_FILE)) return null;
  const token = fs.readFileSync(TOKEN_INPUT_FILE, 'utf8').trim();
  return token || null;
}

function saveTokenCache(token) {
  fs.mkdirSync(AUTH_DIR, { recursive: true });
  fs.writeFileSync(TOKEN_CACHE_FILE, JSON.stringify({ token, exp: decodeJwtExpiry(token) }, null, 2));
}

function printTokenInstructions() {
  console.log('\n=== CẦN TOKEN ĐĂNG NHẬP ===');
  console.log('Chưa có token hợp lệ (hoặc đã hết hạn / không hợp lệ).');
  console.log('Hãy lấy token từ chính trình duyệt Chrome bạn đang dùng hàng ngày (đã đăng nhập sẵn):\n');
  console.log('  1. Mở https://hub.aiforvietnam.org/ và đăng nhập nếu chưa đăng nhập.');
  console.log('  2. Nhấn F12 để mở DevTools, chọn tab Console.');
  console.log("  3. Dán và chạy lệnh: copy(localStorage.getItem('ai-hacks.authenticated_access_token'))");
  console.log('     (lệnh này tự động copy token vào clipboard)');
  console.log(`  4. Tạo file "${path.relative(process.cwd(), TOKEN_INPUT_FILE)}" (nếu chưa có), dán token vào, lưu lại.`);
  console.log('  5. Chạy lại `npm run scrape`.\n');
  fs.mkdirSync(AUTH_DIR, { recursive: true });
}

/**
 * Đảm bảo có token hợp lệ để gọi hub-api. Dùng lại token đã lưu (.auth/token.json)
 * nếu còn hạn; nếu không, đọc từ .auth/token.txt (người dùng tự dán vào); nếu vẫn
 * chưa có/không hợp lệ, in hướng dẫn rồi dừng script (không có bước nhập tương tác).
 */
export async function ensureLoggedIn() {
  let token = loadCachedToken();
  let me = token ? await getMe(token) : null;

  if (!me) {
    token = loadTokenFromInputFile();
    me = token ? await getMe(token) : null;
  }

  if (!me) {
    printTokenInstructions();
    process.exit(1);
  }

  saveTokenCache(token);
  console.log(`Đăng nhập thành công: ${me.full_name || me.email || 'user'}.\n`);

  return { token, me };
}

/** Chuẩn hoá tên/email người dùng thành 1 slug dùng trong tên file snapshot. */
export function usernameSlug(me) {
  const raw = (me && (me.handle || me.email || me.full_name)) || 'unknown';
  const diacritics = new RegExp('[\\u0300-\\u036f]', 'g');
  return (
    raw
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(diacritics, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'unknown'
  );
}
