/** Build { occupations: {code: label_vi}, skills: {...}, tracks: {...}, industries: {...} } từ /taxonomies. */
export function buildLabelMaps(taxonomies) {
  const maps = {};
  for (const [category, entries] of Object.entries(taxonomies)) {
    maps[category] = {};
    for (const entry of entries || []) {
      maps[category][entry.code] = entry.label_vi || entry.label_en || entry.code;
    }
  }
  return maps;
}

function resolveLabels(codes, map) {
  if (!Array.isArray(codes)) return [];
  return codes.map((code) => map?.[code] || code);
}

/**
 * Gộp 1 đội (raw từ /fan/teams) + hồ sơ chi tiết từng thành viên (raw từ /profile/{handle})
 * thành đúng shape output đã chốt: tên, lĩnh vực quan tâm, kỹ năng cần, số lượng thành viên,
 * danh sách thành viên, đội trưởng / tên, nghề nghiệp, ngành, kỹ năng, github, linkedin, website, mô tả.
 */
export function transformTeam(rawTeam, profilesByHandle, labelMaps) {
  const members = (rawTeam.members || []).map((m) => {
    const profile = profilesByHandle.get(m.handle) || {};
    return {
      handle: m.handle,
      name: m.full_name,
      isLeader: m.role === 'lead',
      occupations: resolveLabels(profile.occupations, labelMaps.occupations),
      industries: resolveLabels(profile.industries, labelMaps.industries),
      skills: resolveLabels(profile.skills, labelMaps.skills),
      links: {
        github: profile.github_url || null,
        linkedin: profile.linkedin_url || null,
        website: profile.website_url || null,
      },
      description: profile.bio || null,
    };
  });

  const leader = members.find((m) => m.isLeader);

  return {
    slug: rawTeam.slug,
    name: rawTeam.name,
    interests: resolveLabels(rawTeam.tracks, labelMaps.tracks),
    skillsNeeded: resolveLabels(rawTeam.needed_skills, labelMaps.skills),
    memberCount: rawTeam.current_member_count,
    leaderHandle: leader?.handle || null,
    members,
  };
}
