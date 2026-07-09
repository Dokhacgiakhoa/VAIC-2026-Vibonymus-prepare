export const API_BASE = 'https://hub-api.aiforvietnam.org';
export const TOKEN_KEY = 'ai-hacks.authenticated_access_token';

async function apiGet(token, pathAndQuery) {
  const res = await fetch(`${API_BASE}${pathAndQuery}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ${res.statusText} khi gọi ${pathAndQuery}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export function getMe(token) {
  return apiGet(token, '/users/me');
}

export function fetchTaxonomies(token) {
  return apiGet(token, '/taxonomies');
}

/** Cào toàn bộ danh sách đội (đã bao gồm đầy đủ danh sách thành viên + vai trò). */
export async function fetchAllTeams(token, { pageSize = 50, onProgress } = {}) {
  const teams = [];
  let page = 1;
  let total = Infinity;

  while (teams.length < total) {
    const data = await apiGet(token, `/fan/teams?page=${page}&page_size=${pageSize}`);
    const items = data.items || [];
    total = data.total ?? items.length;
    if (items.length === 0) break;

    teams.push(...items);
    onProgress?.(teams.length, total);
    page += 1;
  }

  return teams;
}

export function fetchProfile(token, handle) {
  return apiGet(token, `/profile/${encodeURIComponent(handle)}`);
}
