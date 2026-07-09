// Phân tích đối thủ dựa trên dữ liệu thật cào được từ hub.aiforvietnam.org
// (src/data/competitors-data.json). Không dùng số liệu giả định.

const TECHNICAL_OCCUPATIONS = ['Trí tuệ nhân tạo / Dữ liệu / Học máy', 'Kỹ thuật / Developer'];
const MAX_MEMBERS = 6;
const SKILL_DIVERSITY_CAP = 15;

export const VIBONYMUS_SLUG = 'aiwarriors';

function uniqueSkills(team) {
  return new Set(team.members.flatMap((m) => m.skills));
}

function technicalMemberCount(team) {
  return team.members.filter((m) => m.occupations.some((o) => TECHNICAL_OCCUPATIONS.includes(o))).length;
}

export function findTeamBySlug(teams, slug) {
  return teams.find((t) => t.slug === slug) || null;
}

/** Tính các chỉ số thật cho 1 đội: tỷ lệ dev, đa dạng kỹ năng (0-100), điểm đe doạ tổng hợp. */
export function computeTeamStats(team, vibonymusInterests) {
  const memberCount = team.memberCount || team.members.length || 1;
  const devRatio = Math.round((technicalMemberCount(team) / memberCount) * 100);
  const skillDiversity = Math.round((Math.min(uniqueSkills(team).size, SKILL_DIVERSITY_CAP) / SKILL_DIVERSITY_CAP) * 100);
  const sharesTrack = vibonymusInterests ? team.interests.some((i) => vibonymusInterests.includes(i)) : false;

  const threatScore = Math.round(
    (Math.min(memberCount, MAX_MEMBERS) / MAX_MEMBERS) * 25 +
      skillDiversity * 0.35 +
      devRatio * 0.25 +
      (sharesTrack ? 15 : 0)
  );

  return { devRatio, skillDiversity, sharesTrack, threatScore };
}

/** Xếp hạng toàn bộ đội (trừ Vibonymus) theo điểm đe doạ, trả về top N. */
export function rankTopThreats(teams, vibonymusInterests, topN = 10) {
  return teams
    .filter((t) => t.slug !== VIBONYMUS_SLUG)
    .map((t) => ({ team: t, stats: computeTeamStats(t, vibonymusInterests) }))
    .sort((a, b) => b.stats.threatScore - a.stats.threatScore)
    .slice(0, topN);
}

/** Trung bình devRatio/skillDiversity/threatScore của 1 danh sách {team, stats}. */
export function averageStats(ranked) {
  const n = ranked.length || 1;
  const sum = ranked.reduce(
    (acc, r) => ({
      devRatio: acc.devRatio + r.stats.devRatio,
      skillDiversity: acc.skillDiversity + r.stats.skillDiversity,
      threatScore: acc.threatScore + r.stats.threatScore,
    }),
    { devRatio: 0, skillDiversity: 0, threatScore: 0 }
  );
  return {
    devRatio: Math.round(sum.devRatio / n),
    skillDiversity: Math.round(sum.skillDiversity / n),
    threatScore: Math.round(sum.threatScore / n),
  };
}

/** Thống kê số đội theo từng lĩnh vực quan tâm (track), sắp xếp giảm dần. */
export function buildTrackTrends(teams) {
  const counts = new Map();
  for (const team of teams) {
    for (const interest of team.interests) {
      counts.set(interest, (counts.get(interest) || 0) + 1);
    }
  }
  const total = teams.length || 1;
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, percentage: Math.round((count / total) * 1000) / 10 }))
    .sort((a, b) => b.count - a.count);
}

/** Tỷ lệ dev trung bình của toàn bộ đối thủ (trừ Vibonymus). */
export function averageDevRatio(teams) {
  const others = teams.filter((t) => t.slug !== VIBONYMUS_SLUG);
  if (others.length === 0) return 0;
  const totalDev = others.reduce((acc, t) => acc + technicalMemberCount(t), 0);
  const totalMembers = others.reduce((acc, t) => acc + (t.memberCount || t.members.length), 0) || 1;
  return Math.round((totalDev / totalMembers) * 100);
}
