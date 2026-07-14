// Hàm hỗ trợ cho danh sách đầy đủ (Tất cả đội thi / Tất cả hacker) ở trang Competitors.
// Dữ liệu chính: src/data/competitors-data.json (hub-api, đầy đủ hồ sơ).
// Dữ liệu bổ sung: src/data/sheet-data.json (form đăng ký, dùng để tìm hacker chưa có đội).

function normalize(str) {
  return (str || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

/** Toàn bộ đội (trừ Vibonymus), sắp xếp theo số thành viên giảm dần. */
export function getAllTeams(teams, vibonymusSlug) {
  return teams
    .filter((t) => t.slug !== vibonymusSlug)
    .slice()
    .sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0));
}

/** Lọc đội theo tên đội, lĩnh vực quan tâm, hoặc kỹ năng cần. */
export function filterTeams(teams, query) {
  const q = normalize(query);
  if (!q) return teams;
  return teams.filter((t) => {
    const haystack = normalize([t.name, ...(t.interests || []), ...(t.skillsNeeded || [])].join(' '));
    return haystack.includes(q);
  });
}

/** Toàn bộ hacker (trừ Vibonymus) đã có đội chính thức trên hub, kèm team gắn kèm. */
export function getAllMembers(teams, vibonymusSlug) {
  return teams
    .filter((t) => t.slug !== vibonymusSlug)
    .flatMap((t) => t.members.map((m) => ({ member: m, team: t })));
}

/** Lọc hacker theo tên, nghề nghiệp, kỹ năng, hoặc tên đội. */
export function filterMembers(rows, query) {
  const q = normalize(query);
  if (!q) return rows;
  return rows.filter(({ member, team }) => {
    const haystack = normalize(
      [member.name, team.name, ...(member.occupations || []), ...(member.skills || [])].join(' ')
    );
    return haystack.includes(q);
  });
}

/** Hacker đăng ký qua Google Sheet nhưng chưa điền team_name (khả năng đang tìm đội/chưa vào đội chính thức). */
export function getSoloHackers(sheetData) {
  if (!sheetData?.hackers) return [];
  return sheetData.hackers.filter((h) => !h['team_name'] || h['team_name'].trim() === '');
}

/** Lọc danh sách hacker chưa có đội theo tên/lĩnh vực/kỹ năng. */
export function filterSoloHackers(rows, query) {
  const q = normalize(query);
  if (!q) return rows;
  return rows.filter((h) => {
    const haystack = normalize(
      [h['Full Name'], h['Field of interest'], h['Skills/ Role/Experience'], h['Note (thông tin thêm của người tham dự)']].join(' ')
    );
    return haystack.includes(q);
  });
}
