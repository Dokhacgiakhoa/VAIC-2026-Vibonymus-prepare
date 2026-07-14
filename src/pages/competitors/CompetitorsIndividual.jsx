import React, { useMemo, useState } from 'react';
import { Shield, Star, RotateCcw, Code2, Link2, Globe } from 'lucide-react';
import competitorsData from '../../data/competitors-data.json';
import sheetData from '../../data/sheet-data.json';
import { VIBONYMUS_SLUG, findTeamBySlug, rankTopMembers, averageMemberScore, getVibonymusMemberStats } from '../../utils/competitorAnalysis';
import { getAllMembers, getSoloHackers } from '../../utils/directoryUtils';
import HackersDirectory from './HackersDirectory';

const memberKey = (teamSlug, handle) => `${teamSlug}:${handle}`;

const CompetitorsIndividual = () => {
  const [selectedMemberKey, setSelectedMemberKey] = useState(null);

  const allTeams = competitorsData.teams;
  const vibonymus = findTeamBySlug(allTeams, VIBONYMUS_SLUG);

  const topMembers = rankTopMembers(allTeams, 10);
  const vibonymusMembers = getVibonymusMemberStats(vibonymus);
  const selectedMember = topMembers.find((r) => memberKey(r.team.slug, r.member.handle) === selectedMemberKey) || null;
  const topMembersAvgScore = averageMemberScore(topMembers);
  const compareMemberScore = selectedMember ? selectedMember.score : topMembersAvgScore;
  const compareMemberLabel = selectedMember ? selectedMember.member.name : `Top ${topMembers.length} cá nhân (TB)`;

  const allMembersDirectory = useMemo(() => getAllMembers(allTeams, VIBONYMUS_SLUG), [allTeams]);
  const soloHackers = useMemo(() => getSoloHackers(sheetData), []);

  return (
    <>
      <div className="grid-split" style={{ marginBottom: '1.4118rem', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }}>
        <div className="card" style={{ margin: 0 }}>
          <div className="flex-between" style={{ alignItems: 'flex-start', gap: '0.7059rem' }}>
            <div>
              <h2><Shield /> Điểm mạnh cá nhân: Vibonymus vs {compareMemberLabel}</h2>
              <p className="sub" style={{ margin: '0 0 0.9412rem' }}>
                {selectedMember
                  ? `So từng thành viên Vibonymus với ${selectedMember.member.name} (Team ${selectedMember.team.name}).`
                  : `So từng thành viên Vibonymus với điểm mạnh trung bình của Top ${topMembers.length} cá nhân đối thủ.`}
              </p>
            </div>
            {selectedMember && (
              <button onClick={() => setSelectedMemberKey(null)} style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', border: '1px solid var(--border)', background: 'var(--surface-page)', color: 'var(--text-secondary)', borderRadius: '0.5882rem', padding: '0.3529rem 0.7059rem', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
                <RotateCcw size={13} /> Xem trung bình
              </button>
            )}
          </div>

          <div className="flex-column" style={{ gap: '0.9412rem', marginTop: '1.1765rem' }}>
            {vibonymusMembers.map((vm) => (
              <div key={vm.member.handle} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.7059rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4706rem' }}>
                  {vm.member.name}{vm.member.isLeader ? ' (Đội trưởng)' : ''}
                </div>
                <div className="grid-2" style={{ gap: '1.1765rem' }}>
                  <div>
                    <div className="flex-between" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--s2)' }}>
                      <span>Vibonymus</span>
                      <span>{vm.score}/100</span>
                    </div>
                    <div style={{ height: '0.3529rem', background: 'var(--grid)', borderRadius: '0.1765rem', marginTop: '0.2353rem', overflow: 'hidden' }}>
                      <div className="progress-bar-animated" style={{ width: `${vm.score}%`, height: '100%', background: 'var(--s2-grad)', borderRadius: '0.1765rem' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex-between" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                      <span>{compareMemberLabel}</span>
                      <span>{compareMemberScore}/100</span>
                    </div>
                    <div style={{ height: '0.3529rem', background: 'var(--grid)', borderRadius: '0.1765rem', marginTop: '0.2353rem', overflow: 'hidden' }}>
                      <div className="progress-bar-animated" style={{ width: `${compareMemberScore}%`, height: '100%', background: '#a6aebb', borderRadius: '0.1765rem' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '0.9412rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            * <i>Điểm mạnh cá nhân</i> tổng hợp từ: độ đa dạng kỹ năng, nghề nghiệp kỹ thuật (AI/ML, Developer), có portfolio công khai (GitHub/LinkedIn/Website), và đa vai trò — tính từ hồ sơ thật cào được.
          </div>
        </div>

        <div className="card" style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
          <h2><Star /> Top {topMembers.length} cá nhân đáng chú ý</h2>
          <p className="sub" style={{ margin: '0 0 0.9412rem' }}>Xếp hạng theo điểm mạnh cá nhân, bấm để so với từng thành viên Vibonymus.</p>
          <div style={{ position: 'relative', flex: '1 1 auto', minHeight: '11.7647rem' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: '0.7059rem', overflowY: 'auto', paddingRight: '0.3529rem', scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.1) transparent' }} className="custom-scrollbar">
              {topMembers.map((r, index) => {
                const rank = index + 1;
                const key = memberKey(r.team.slug, r.member.handle);
                const isSelected = selectedMemberKey === key;
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedMemberKey(isSelected ? null : key)}
                    style={{ padding: '0.9412rem', borderRadius: '0.7059rem', border: isSelected ? '1px solid var(--theme-color)' : '1px solid var(--border)', background: isSelected ? 'rgba(90, 73, 204, 0.06)' : 'var(--surface-page)', boxShadow: isSelected ? '0 4px 14px -4px rgba(90, 73, 204, 0.3)' : 'none', position: 'relative', transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease', cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(2px)'; if (!isSelected) e.currentTarget.style.borderColor = 'var(--theme-color)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; if (!isSelected) e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    <div style={{ position: 'absolute', top: '0.7059rem', right: '0.7059rem', width: '1.5294rem', height: '1.5294rem', borderRadius: '50%', background: rank === 1 ? 'gold' : rank === 2 ? '#ced4da' : rank === 3 ? '#cd7f32' : 'var(--border)', color: rank <= 3 ? '#fff' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem' }}>
                      #{rank}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.1176rem', paddingRight: '1.7647rem' }}>{r.member.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4706rem' }}>Team {r.team.name}{r.member.isLeader ? ' · Đội trưởng' : ''}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      <div style={{ marginBottom: '0.2353rem' }}><b>Điểm mạnh:</b> <span style={{ color: 'var(--s4)', fontWeight: 800 }}>{r.score}/100</span></div>
                      <div style={{ marginBottom: '0.2353rem' }}><b>Nghề nghiệp:</b> {r.member.occupations.join(', ') || 'Chưa cập nhật'}</div>
                      <div style={{ marginBottom: '0.2353rem' }}><b>Kỹ năng:</b> {r.member.skills.join(', ') || 'Chưa cập nhật'}</div>
                    </div>
                    {r.linkCount > 0 && (
                      <div style={{ display: 'flex', gap: '0.5882rem', marginTop: '0.4706rem' }}>
                        {r.member.links.github && <a href={r.member.links.github} target="_blank" rel="noreferrer" title="GitHub" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--text-muted)' }}><Code2 size={15} /></a>}
                        {r.member.links.linkedin && <a href={r.member.links.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--text-muted)' }}><Link2 size={15} /></a>}
                        {r.member.links.website && <a href={r.member.links.website} target="_blank" rel="noreferrer" title="Website" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--text-muted)' }}><Globe size={15} /></a>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <HackersDirectory members={allMembersDirectory} soloHackers={soloHackers} />
    </>
  );
};

export default CompetitorsIndividual;
