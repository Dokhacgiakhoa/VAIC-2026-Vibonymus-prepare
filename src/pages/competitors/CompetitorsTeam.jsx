import React, { useMemo, useState } from 'react';
import { Users, Award, TrendingUp, BarChart2, Shield, Target, UserCheck, RotateCcw } from 'lucide-react';
import competitorsData from '../../data/competitors-data.json';
import {
  VIBONYMUS_SLUG,
  findTeamBySlug,
  computeTeamStats,
  rankTopThreats,
  averageStats,
  buildTrackTrends,
  averageDevRatio,
} from '../../utils/competitorAnalysis';
import { getAllTeams } from '../../utils/directoryUtils';
import TeamsDirectory from './TeamsDirectory';

const CompetitorsTeam = () => {
  const [selectedSlug, setSelectedSlug] = useState(null);

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
  const allTeamsDirectory = useMemo(() => getAllTeams(allTeams, VIBONYMUS_SLUG), [allTeams]);

  return (
    <>
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
                <div className="progress-bar-animated" style={{ width: `${track.percentage}%`, height: '100%', background: 'linear-gradient(90deg, #4dabf7, #ced4da)', borderRadius: '0.2941rem', transition: 'width 1s ease-in-out' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-split" style={{ marginBottom: '1.4118rem', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }}>
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
              <button onClick={() => setSelectedSlug(null)} style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', border: '1px solid var(--border)', background: 'var(--surface-page)', color: 'var(--text-secondary)', borderRadius: '0.5882rem', padding: '0.3529rem 0.7059rem', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
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

        <div className="card" style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
          <h2><Target /> Top {topThreats.length} Đối thủ đáng gờm nhất</h2>
          <p className="sub" style={{ margin: '0 0 0.9412rem' }}>Xếp hạng theo điểm đe doạ tổng hợp, tính từ dữ liệu thật.</p>
          <div style={{ position: 'relative', flex: '1 1 auto', minHeight: '11.7647rem' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: '0.7059rem', overflowY: 'auto', paddingRight: '0.3529rem', scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.1) transparent' }} className="custom-scrollbar">
              {topThreats.map((r, index) => {
                const rank = index + 1;
                const isSelected = selectedSlug === r.team.slug;
                return (
                  <div
                    key={r.team.slug}
                    onClick={() => setSelectedSlug(isSelected ? null : r.team.slug)}
                    style={{ padding: '0.9412rem', borderRadius: '0.7059rem', border: isSelected ? '1px solid var(--theme-color)' : '1px solid var(--border)', background: isSelected ? 'rgba(90, 73, 204, 0.06)' : 'var(--surface-page)', boxShadow: isSelected ? '0 4px 14px -4px rgba(90, 73, 204, 0.3)' : 'none', position: 'relative', transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease', cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(2px)'; if (!isSelected) e.currentTarget.style.borderColor = 'var(--theme-color)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; if (!isSelected) e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    <div style={{ position: 'absolute', top: '0.7059rem', right: '0.7059rem', width: '1.6471rem', height: '1.6471rem', borderRadius: '50%', background: rank === 1 ? 'gold' : rank === 2 ? '#ced4da' : rank === 3 ? '#cd7f32' : 'var(--border)', color: rank <= 3 ? '#fff' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', boxShadow: 'var(--shadow-sm)' }}>
                      #{rank}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.4706rem' }}>Team {r.team.name}</div>
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

      <div className="card" style={{ display: 'flex', gap: '0.9412rem', alignItems: 'flex-start', background: 'rgba(32, 201, 151, 0.04)', borderColor: 'rgba(32, 201, 151, 0.2)', marginBottom: '1.4118rem' }}>
        <UserCheck style={{ color: 'var(--s2)', flexShrink: 0, marginTop: '0.1176rem' }} size={24} />
        <div>
          <h3 style={{ margin: '0 0 0.3529rem 0', fontSize: '0.98rem', fontWeight: 700, color: 'var(--s2)' }}>Chiến lược ứng phó &amp; bứt phá của Vibonymus</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Nhiều đội đối thủ có quy mô 5-6 thành viên kỹ thuật, trong khi Vibonymus chỉ {vibonymus?.memberCount || 2} thành viên. Team sẽ không chạy đua về số lượng, mà tập trung vào tốc độ triển khai AI-Native, chất lượng UI/UX, và kịch bản pitching sắc bén để bù lại quy mô nhân sự.
          </p>
        </div>
      </div>

      <TeamsDirectory teams={allTeamsDirectory} />
    </>
  );
};

export default CompetitorsTeam;
