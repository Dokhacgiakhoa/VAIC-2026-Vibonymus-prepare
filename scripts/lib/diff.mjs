function arraysEqual(a = [], b = []) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((v, i) => v === sortedB[i]);
}

function diffMember(oldMember, newMember) {
  const changes = [];
  if (!arraysEqual(oldMember.occupations, newMember.occupations)) changes.push('occupations');
  if (!arraysEqual(oldMember.industries, newMember.industries)) changes.push('industries');
  if (!arraysEqual(oldMember.skills, newMember.skills)) changes.push('skills');
  if (oldMember.description !== newMember.description) changes.push('description');
  if (
    oldMember.links?.github !== newMember.links?.github ||
    oldMember.links?.linkedin !== newMember.links?.linkedin ||
    oldMember.links?.website !== newMember.links?.website
  ) {
    changes.push('links');
  }
  return changes;
}

function diffTeam(oldTeam, newTeam) {
  const changes = [];
  if (oldTeam.name !== newTeam.name) changes.push('name');
  if (!arraysEqual(oldTeam.interests, newTeam.interests)) changes.push('interests');
  if (!arraysEqual(oldTeam.skillsNeeded, newTeam.skillsNeeded)) changes.push('skillsNeeded');
  if (oldTeam.memberCount !== newTeam.memberCount) changes.push('memberCount');
  if (oldTeam.leaderHandle !== newTeam.leaderHandle) changes.push('leader');

  const oldHandles = new Set(oldTeam.members.map((m) => m.handle));
  const newHandles = new Set(newTeam.members.map((m) => m.handle));
  const membersAdded = newTeam.members.filter((m) => !oldHandles.has(m.handle)).map((m) => m.handle);
  const membersRemoved = oldTeam.members.filter((m) => !newHandles.has(m.handle)).map((m) => m.handle);

  return { changes, membersAdded, membersRemoved };
}

/**
 * So sánh 2 snapshot đầy đủ ({ teams: [...] }) theo thứ tự thời gian (oldSnapshot -> newSnapshot).
 * Trả về diff ở 3 cấp: đội mới/mất, đội đổi thông tin (+ thành viên vào/ra), hồ sơ cá nhân đổi.
 */
export function diffSnapshots(oldSnapshot, newSnapshot) {
  const oldTeams = new Map((oldSnapshot?.teams || []).map((t) => [t.slug, t]));
  const newTeams = new Map((newSnapshot?.teams || []).map((t) => [t.slug, t]));

  const teamsAdded = [];
  const teamsRemoved = [];
  const teamsChanged = [];
  const membersChanged = [];

  for (const [slug, newTeam] of newTeams) {
    const oldTeam = oldTeams.get(slug);
    if (!oldTeam) {
      teamsAdded.push({ slug, name: newTeam.name });
      continue;
    }

    const { changes, membersAdded, membersRemoved } = diffTeam(oldTeam, newTeam);
    if (changes.length || membersAdded.length || membersRemoved.length) {
      teamsChanged.push({ slug, name: newTeam.name, changes, membersAdded, membersRemoved });
    }

    const oldMembersByHandle = new Map(oldTeam.members.map((m) => [m.handle, m]));
    for (const member of newTeam.members) {
      const oldMember = oldMembersByHandle.get(member.handle);
      if (!oldMember) continue;
      const memberChanges = diffMember(oldMember, member);
      if (memberChanges.length) {
        membersChanged.push({ handle: member.handle, name: member.name, teamSlug: slug, changes: memberChanges });
      }
    }
  }

  for (const [slug, oldTeam] of oldTeams) {
    if (!newTeams.has(slug)) {
      teamsRemoved.push({ slug, name: oldTeam.name });
    }
  }

  return { teamsAdded, teamsRemoved, teamsChanged, membersChanged };
}

/** In tóm tắt diff ra console, ngắn gọn, dễ đọc. */
export function formatDiffSummary(diff) {
  const lines = [];
  lines.push(`🆕 ${diff.teamsAdded.length} đội mới${diff.teamsAdded.length ? ': ' + diff.teamsAdded.map((t) => t.name).join(', ') : ''}`);
  lines.push(`❌ ${diff.teamsRemoved.length} đội đã rút${diff.teamsRemoved.length ? ': ' + diff.teamsRemoved.map((t) => t.name).join(', ') : ''}`);
  lines.push(`👥 ${diff.teamsChanged.length} đội thay đổi thông tin/thành viên`);
  lines.push(`✏️  ${diff.membersChanged.length} thành viên cập nhật hồ sơ`);
  return lines.join('\n');
}

/** Sinh 1 mục CHANGELOG dạng Markdown cho 1 cặp snapshot liên tiếp. */
export function formatChangelogEntry(oldSnapshot, newSnapshot, diff) {
  const header = oldSnapshot
    ? `## ${newSnapshot.scrapedAt} — so với lần cào ${oldSnapshot.scrapedAt}`
    : `## ${newSnapshot.scrapedAt} — lần cào đầu tiên`;

  if (!oldSnapshot) {
    return `${header}\n- Khởi tạo dữ liệu ban đầu: ${newSnapshot.totalTeams} đội.\n`;
  }

  const bullets = [
    `- 🆕 ${diff.teamsAdded.length} đội mới${diff.teamsAdded.length ? ': ' + diff.teamsAdded.map((t) => t.name).join(', ') : ''}`,
    `- ❌ ${diff.teamsRemoved.length} đội đã rút${diff.teamsRemoved.length ? ': ' + diff.teamsRemoved.map((t) => t.name).join(', ') : ''}`,
    `- 👥 ${diff.teamsChanged.length} đội thay đổi thông tin/thành viên`,
    `- ✏️ ${diff.membersChanged.length} thành viên cập nhật hồ sơ`,
  ];

  return `${header}\n${bullets.join('\n')}\n`;
}
