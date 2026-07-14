import React, { useMemo, useState } from 'react';
import { Users, Award, TrendingUp, BarChart2, Shield, Target, UserCheck, RotateCcw, Star, Code2, Link2, Globe, LayoutGrid, Building2, UserSquare2 } from 'lucide-react';
import competitorsData from '../data/competitors-data.json';
import sheetData from '../data/sheet-data.json';
import {
  VIBONYMUS_SLUG,
  findTeamBySlug,
  computeTeamStats,
  rankTopThreats,
  averageStats,
  buildTrackTrends,
  averageDevRatio,
  rankTopMembers,
  averageMemberScore,
  getVibonymusMemberStats,
} from '../utils/competitorAnalysis';
import { getAllTeams, getAllMembers, getSoloHackers } from '../utils/directoryUtils';
import TeamsDirectory from './competitors/TeamsDirectory';
import HackersDirectory from './competitors/HackersDirectory';

const memberKey = (teamSlug, handle) => `${teamSlug}:${handle}`;

const TABS = [
  { id: 'analysis', label: 'Phân tích cạnh tranh', icon: LayoutGrid },
  { id: 'teams', label: 'Tất cả đội thi', icon: Building2 },
  { id: 'hackers', label: 'Tất cả hacker', icon: UserSquare2 },
];

const Teams = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [selectedMemberKey, setSelectedMemberKey] = useState(null);

  const allTeams = competitorsData.teams;
  const vibonymus = findTeamBySlug(allTeams, VIBONYMUS_SLUG);
  const otherTeams = allTeams.filter((t) => t.slug !== VIBONYMUS_SLUG);

  const trackTrends = buildTrackTrends(otherTeams).slice(0, 8);
  const topThreats = rankTopThreats(allTeams, vibonymus?.interests, 10);

  const selected = topThreats.find((r) => r.team.slug === selectedSlug) || null;
  const top10Average = averageStats(topThreats);
  const compareStats = selected ? selected.stats : top10Average;
  const compareLabel = selected ? `Team ${selected.team.name}` : 'Top 10 Đối thủ (TB)';

  const vibonymusStats = vibonymus ? computeTeamStats(vibonymus, vibonymus.interests) : null;
  const devRatioAvg = averageDevRatio(allTeams);

  const comparisonData = vibonymusStats
    ? [
        { criteria: 'Tỷ lệ Dev trong Team', vibonymus: vibonymusStats.devRatio, top10: compareStats.devRatio, unit: '%' },
        { criteria: 'Đa dạng kỹ năng (Skill Diversity)', vibonymus: vibonymusStats.skillDiversity, top10: compareStats.skillDiversity, unit: '/100' },
        { criteria: 'Điểm đe doạ tổng hợp', vibonymus: vibonymusStats.threatScore, top10: compareStats.threatScore, unit: '/100' },
      ]
    : [];

  const difficultyLabel = top10Average.threatScore >= 70 ? 'Cực Kỳ Cao' : top10Average.threatScore >= 50 ? 'Cao' : 'Trung Bình';

  const topMembers = rankTopMembers(allTeams, 10);
  const vibonymusMembers = getVibonymusMemberStats(vibonymus);
  const selectedMember = topMembers.find((r) => memberKey(r.team.slug, r.member.handle) === selectedMemberKey) || null;
  const topMembersAvgScore = averageMemberScore(topMembers);
  const compareMemberScore = selectedMember ? selectedMember.score : topMembersAvgScore;
  const compareMemberLabel = selectedMember ? selectedMember.member.name : `Top ${topMembers.length} cá nhân (TB)`;

  const allTeamsDirectory = useMemo(() => getAllTeams(allTeams, VIBONYMUS_SLUG), [allTeams]);
  const allMembersDirectory = useMemo(() => getAllMembers(allTeams, VIBONYMUS_SLUG), [allTeams]);
  const soloHackers = useMemo(() => getSoloHackers(sheetData), []);

  return (
    <div className="page-content">
      {/* Tab điều hướng */}
      <div style={{ display: 'flex', gap: '0.4706rem', marginBottom: '1.4118rem', borderBottom: '1px solid var(--border)' }}>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3529rem',
                padding: '0.5882rem 0.9412rem',
                border: 'none',
                background: 'none',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: isActive ? 'var(--theme-color)' : 'var(--text-secondary)',
                borderBottom: isActive ? '2px solid var(--theme-color)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'teams' && <TeamsDirectory teams={allTeamsDirectory} />}
      {activeTab === 'hackers' && <HackersDirectory members={allMembersDirectory} soloHackers={soloHackers} />}

      {activeTab === 'analysis' && (
      <>
      {/* Overview Stat cards */}
      <div className="grid-3" style={{ marginBottom: '1.4118rem' }}>
        <div className="card" style={{ margin: 0, padding: '1.1765rem', display: 'flex', alignItems: 'center', gap: '0.9412rem' }}>
          <div style={{ width: '2.8235rem', height: '2.8235rem', borderRadius: '0.7059rem', background: 'rgba(42, 120, 214, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--s1)' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="meta-label">Tổng đối thủ đăng ký</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2353rem' }}>{otherTeams.length} Đội thi</div>
          </div>
        </div>
        <div className="card" style={{ margin: 0, padding: '1.1765rem', display: 'flex', alignItems: 'center', gap: '0.9412rem' }}>
          <div style={{ width: '2.8235rem', height: '2.8235rem', borderRadius: '0.7059rem', background: 'rgba(32, 201, 151, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--s2)' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="meta-label">Tỷ lệ Dev trung bình</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2353rem' }}>{devRatioAvg}%</div>
          </div>
        </div>
        <div className="card" style={{ margin: 0, padding: '1.1765rem', display: 'flex', alignItems: 'center', gap: '0.9412rem' }}>
          <div style={{ width: '2.8235rem', height: '2.8235rem', borderRadius: '0.7059rem', background: 'rgba(237, 161, 0, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--s3)' }}>
            <Award size={24} />
          </div>
          <div>
            <div className="meta-label">Độ khó đối thủ Top 10</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2353rem' }}>{difficultyLabel}</div>
          </div>
        </div>
      </div>

      {/* Info Graphic: Xu hướng chọn Track */}
      <div className="card" style={{ marginBottom: '1.4118rem' }}>
        <h2><BarChart2 /> Biểu đồ xu hướng lựa chọn lĩnh vực của các đội thi (Info Graphic)</h2>
        <p className="sub" style={{ margin: '0 0 1.1765rem' }}>
          Thống kê thật từ {otherTeams.length} đội đã cào được ({new Date(competitorsData.scrapedAt).toLocaleDateString('vi-VN')}) để đánh giá tỷ lệ cạnh tranh và mật độ đối thủ của từng lĩnh vực.
        </p>

        <div className="flex-column" style={{ gap: '0.8235rem' }}>
          {trackTrends.map((track, index) => (
            <div key={index} className="flex-column" style={{ gap: '0.2353rem' }}>
              <div className="flex-between" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{ color: 'var(--text-primary)' }}>{track.name}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{track.count} đội ({track.percentage}%)</span>
              </div>
              <div style={{ height: '0.5882rem', background: 'var(--grid)', borderRadius: '0.2941rem', overflow: 'hidden', display: 'flex' }}>
                <div className="progress-bar-animated" style={{
                  width: `${track.percentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #4dabf7, #ced4da)',
                  borderRadius: '0.2941rem',
                  transition: 'width 1s ease-in-out'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: So sánh & Top đối thủ */}
      <div className="grid-split" style={{ marginBottom: '1.4118rem', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }}>

        {/* So sánh Vibonymus vs Top 10 */}
        <div className="card" style={{ margin: 0 }}>
          <div className="flex-between" style={{ alignItems: 'flex-start', gap: '0.7059rem' }}>
            <div>
              <h2><Shield /> Chỉ số năng lực: Vibonymus vs {compareLabel}</h2>
              <p className="sub" style={{ margin: '0 0 0.9412rem' }}>
                {selected
                  ? `Đánh giá tương quan lực lượng giữa Vibonymus và đối thủ — Team ${selected.team.name}.`
                  : `Đánh giá tương quan lực lượng giữa Vibonymus và trung bình ${topThreats.length} đội đối thủ có điểm đe doạ cao nhất.`}
              </p>
            </div>
            {selected && (
              <button
                onClick={() => setSelectedSlug(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.3529rem',
                  border: '1px solid var(--border)', background: 'var(--surface-page)',
                  color: 'var(--text-secondary)', borderRadius: '0.5882rem',
                  padding: '0.3529rem 0.7059rem', fontSize: '0.78rem', fontWeight: 700,
                  cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0
                }}
              >
                <RotateCcw size={13} /> Xem trung bình
              </button>
            )}
          </div>

          <div className="flex-column" style={{ gap: '0.9412rem', marginTop: '1.1765rem' }}>
            {comparisonData.map((d, index) => (
              <div key={index} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.7059rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4706rem' }}>{d.criteria}</div>
                <div className="grid-2" style={{ gap: '1.1765rem' }}>
                  <div>
                    <div className="flex-between" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--s2)' }}>
                      <span>Vibonymus</span>
                      <span>{d.vibonymus}{d.unit}</span>
                    </div>
                    <div style={{ height: '0.3529rem', background: 'var(--grid)', borderRadius: '0.1765rem', marginTop: '0.2353rem', overflow: 'hidden' }}>
                      <div className="progress-bar-animated" style={{ width: `${d.vibonymus}%`, height: '100%', background: 'var(--s2-grad)', borderRadius: '0.1765rem' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex-between" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                      <span>{compareLabel}</span>
                      <span>{d.top10}{d.unit}</span>
                    </div>
                    <div style={{ height: '0.3529rem', background: 'var(--grid)', borderRadius: '0.1765rem', marginTop: '0.2353rem', overflow: 'hidden' }}>
                      <div className="progress-bar-animated" style={{ width: `${d.top10}%`, height: '100%', background: '#a6aebb', borderRadius: '0.1765rem' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '0.9412rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            * <i>Điểm đe doạ</i> tổng hợp từ: số lượng thành viên, độ đa dạng kỹ năng, tỷ lệ thành viên có nghề nghiệp kỹ thuật (AI/ML, Developer), và việc có trùng lĩnh vực quan tâm với Vibonymus hay không — tính hoàn toàn từ dữ liệu thật cào được, không có số liệu giả định.
          </div>
        </div>

        {/* Top 10 Đối thủ đáng gờm */}
        <div className="card" style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
          <h2><Target /> Top {topThreats.length} Đối thủ đáng gờm nhất</h2>
          <p className="sub" style={{ margin: '0 0 0.9412rem' }}>Xếp hạng theo điểm đe doạ tổng hợp, tính từ dữ liệu thật.</p>

          <div style={{ position: 'relative', flex: '1 1 auto', minHeight: '11.7647rem' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7059rem',
                overflowY: 'auto',
                paddingRight: '0.3529rem',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0,0,0,0.1) transparent'
              }}
              className="custom-scrollbar"
            >
              {topThreats.map((r, index) => {
                const rank = index + 1;
                const isSelected = selectedSlug === r.team.slug;
                return (
                  <div
                    key={r.team.slug}
                    onClick={() => setSelectedSlug(isSelected ? null : r.team.slug)}
                    style={{
                      padding: '0.9412rem',
                      borderRadius: '0.7059rem',
                      border: isSelected ? '1px solid var(--theme-color)' : '1px solid var(--border)',
                      background: isSelected ? 'rgba(90, 73, 204, 0.06)' : 'var(--surface-page)',
                      boxShadow: isSelected ? '0 4px 14px -4px rgba(90, 73, 204, 0.3)' : 'none',
                      position: 'relative',
                      transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(2px)';
                      if (!isSelected) e.currentTarget.style.borderColor = 'var(--theme-color)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      if (!isSelected) e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '0.7059rem',
                      right: '0.7059rem',
                      width: '1.6471rem',
                      height: '1.6471rem',
                      borderRadius: '50%',
                      background: rank === 1 ? 'gold' : rank === 2 ? '#ced4da' : rank === 3 ? '#cd7f32' : 'var(--border)',
                      color: rank <= 3 ? '#fff' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '0.85rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      #{rank}
                    </div>

                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.4706rem' }}>
                      Team {r.team.name}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      <div style={{ marginBottom: '0.2353rem' }}><b>Điểm đe doạ:</b> <span style={{ color: 'var(--s4)', fontWeight: 800 }}>{r.stats.threatScore}/100</span></div>
                      <div style={{ marginBottom: '0.2353rem' }}><b>Số thành viên:</b> {r.team.memberCount}</div>
                      <div style={{ marginBottom: '0.2353rem' }}><b>Lĩnh vực:</b> {r.team.interests.join(', ') || 'Chưa cập nhật'}</div>
                      <div style={{ marginBottom: '0.2353rem' }}><b>Kỹ năng cần:</b> {r.team.skillsNeeded.join(', ') || 'Chưa cập nhật'}</div>
                      {r.stats.sharesTrack && (
                        <div style={{ color: 'var(--s2)', fontWeight: 700, marginTop: '0.3529rem' }}>⚠ Trùng lĩnh vực quan tâm với Vibonymus</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Grid: So sánh cá nhân & Top cá nhân đối thủ */}
      <div className="grid-split" style={{ marginBottom: '1.4118rem', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }}>

        {/* So sánh từng thành viên Vibonymus vs cá nhân đối thủ */}
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
              <button
                onClick={() => setSelectedMemberKey(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.3529rem',
                  border: '1px solid var(--border)', background: 'var(--surface-page)',
                  color: 'var(--text-secondary)', borderRadius: '0.5882rem',
                  padding: '0.3529rem 0.7059rem', fontSize: '0.78rem', fontWeight: 700,
                  cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0
                }}
              >
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

        {/* Top cá nhân đáng chú ý */}
        <div className="card" style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
          <h2><Star /> Top {topMembers.length} cá nhân đáng chú ý</h2>
          <p className="sub" style={{ margin: '0 0 0.9412rem' }}>Xếp hạng theo điểm mạnh cá nhân, bấm để so với từng thành viên Vibonymus.</p>

          <div style={{ position: 'relative', flex: '1 1 auto', minHeight: '11.7647rem' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7059rem',
                overflowY: 'auto',
                paddingRight: '0.3529rem',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0,0,0,0.1) transparent'
              }}
              className="custom-scrollbar"
            >
              {topMembers.map((r, index) => {
                const rank = index + 1;
                const key = memberKey(r.team.slug, r.member.handle);
                const isSelected = selectedMemberKey === key;
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedMemberKey(isSelected ? null : key)}
                    style={{
                      padding: '0.9412rem',
                      borderRadius: '0.7059rem',
                      border: isSelected ? '1px solid var(--theme-color)' : '1px solid var(--border)',
                      background: isSelected ? 'rgba(90, 73, 204, 0.06)' : 'var(--surface-page)',
                      boxShadow: isSelected ? '0 4px 14px -4px rgba(90, 73, 204, 0.3)' : 'none',
                      position: 'relative',
                      transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(2px)';
                      if (!isSelected) e.currentTarget.style.borderColor = 'var(--theme-color)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      if (!isSelected) e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '0.7059rem',
                      right: '0.7059rem',
                      width: '1.5294rem',
                      height: '1.5294rem',
                      borderRadius: '50%',
                      background: rank === 1 ? 'gold' : rank === 2 ? '#ced4da' : rank === 3 ? '#cd7f32' : 'var(--border)',
                      color: rank <= 3 ? '#fff' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '0.8rem',
                    }}>
                      #{rank}
                    </div>

                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.1176rem', paddingRight: '1.7647rem' }}>
                      {r.member.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4706rem' }}>
                      Team {r.team.name}{r.member.isLeader ? ' · Đội trưởng' : ''}
                    </div>

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

      {/* Chiến lược ứng phó */}
      <div className="card" style={{ display: 'flex', gap: '0.9412rem', alignItems: 'flex-start', background: 'rgba(32, 201, 151, 0.04)', borderColor: 'rgba(32, 201, 151, 0.2)', marginTop: '0.4706rem' }}>
        <UserCheck style={{ color: 'var(--s2)', flexShrink: 0, marginTop: '0.1176rem' }} size={24} />
        <div>
          <h3 style={{ margin: '0 0 0.3529rem 0', fontSize: '0.98rem', fontWeight: 700, color: 'var(--s2)' }}>Chiến lược ứng phó &amp; bứt phá của Vibonymus</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Nhiều đội đối thủ có quy mô 5-6 thành viên kỹ thuật, trong khi Vibonymus chỉ {vibonymus?.memberCount || 2} thành viên. Team sẽ không chạy đua về số lượng, mà tập trung vào tốc độ triển khai AI-Native, chất lượng UI/UX, và kịch bản pitching sắc bén để bù lại quy mô nhân sự.
          </p>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default Teams;
