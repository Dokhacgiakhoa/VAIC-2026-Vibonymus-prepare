const API_BASE = 'https://hub-api.aiforvietnam.org';
const REQUEST_DELAY_MS = 350;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class ApiError extends Error {
  constructor(path, status, statusText) {
    super(`HTTP ${status} ${statusText} khi gọi ${path}`);
    this.name = 'ApiError';
    this.path = path;
    this.status = status;
  }
}

async function apiGet(token, pathAndQuery) {
  const res = await fetch(`${API_BASE}${pathAndQuery}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new ApiError(pathAndQuery, res.status, res.statusText);
  }
  return res.json();
}

/** Lấy toàn bộ danh mục tra cứu (occupations/skills/tracks/industries) để đổi code -> nhãn tiếng Việt. */
export async function fetchTaxonomies(token) {
  return apiGet(token, '/taxonomies');
}

/**
 * Cào toàn bộ danh sách đội qua /fan/teams (đã bao gồm đầy đủ danh sách thành viên
 * + vai trò đội trưởng/thành viên ngay trong response, không cần gọi thêm /teams/{slug}).
 */
export async function fetchAllTeams(token, { pageSize = 50, limit = Infinity, onProgress } = {}) {
  const teams = [];
  let page = 1;
  let total = Infinity;

  while (teams.length < Math.min(total, limit)) {
    const data = await apiGet(token, `/fan/teams?page=${page}&page_size=${pageSize}`);
    const items = data.items || [];
    total = data.total ?? items.length;
    if (items.length === 0) break;

    teams.push(...items);
    onProgress?.(teams.length, total);

    page += 1;
    if (teams.length < Math.min(total, limit)) await sleep(REQUEST_DELAY_MS);
  }

  return teams.slice(0, Number.isFinite(limit) ? limit : undefined);
}

/** Lấy hồ sơ đầy đủ 1 thành viên (nghề nghiệp, ngành, kỹ năng, link, mô tả...). */
export async function fetchProfile(token, handle) {
  return apiGet(token, `/profile/${encodeURIComponent(handle)}`);
}

export { ApiError, sleep, REQUEST_DELAY_MS };
