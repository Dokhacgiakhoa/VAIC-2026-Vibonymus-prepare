import React from 'react';
import { Heart, Compass, Briefcase, Landmark, Leaf, GraduationCap, CloudRain, ShieldAlert, BarChart3, TrendingUp } from 'lucide-react';
import { trackData, calcTrackScore } from '../data/tracks-data';

const TRACK_ICONS = { Heart, Compass, Briefcase, Landmark, Leaf, GraduationCap, CloudRain, ShieldAlert };

function TrackIcon({ iconName, iconColor, size }) {
  const Icon = TRACK_ICONS[iconName];
  return <Icon style={{ color: iconColor }} size={size} />;
}

const CRITERIA = [
  { key: 'market', label: 'Thị trường', max: 20, color: 'linear-gradient(90deg, #20c997, #63e6be)' },
  { key: 'teamFit', label: 'Phù hợp năng lực đội', max: 20, color: 'linear-gradient(90deg, #2a78d6, #74b9ff)' },
  { key: 'feasibility', label: 'Khả thi trong 48h', max: 15, color: 'linear-gradient(90deg, #f03e3e, #ff8787)' },
  { key: 'competition', label: 'Lợi thế cạnh tranh', max: 15, color: 'linear-gradient(90deg, #f76707, #ffa94d)' },
  { key: 'dataReadiness', label: 'Sẵn sàng dữ liệu/demo', max: 15, color: 'linear-gradient(90deg, #2f9e44, #8ce99a)' },
  { key: 'legalRisk', label: 'Rủi ro pháp lý/đạo đức (an toàn)', max: 15, color: 'linear-gradient(90deg, #4a3aa7, #9775fa)' }
];

const Benchmark = () => {
  const scoredTracks = trackData.map(t => ({ ...t, s: calcTrackScore(t.score) }));
  const rankedByTotal = [...scoredTracks].sort((a, b) => b.s.total - a.s.total);
  const rankById = Object.fromEntries(rankedByTotal.map((t, i) => [t.id, i + 1]));
  const maxTotal = rankedByTotal[0].s.total;

  return (
    <div className="page-content">
      {/* PHƯƠNG PHÁP CHẤM ĐIỂM */}
      <div className="card">
        <h2><BarChart3 /> Phương pháp chấm điểm 8 Track (thang 100 điểm)</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem' }}>6 tiêu chí định lượng dựa trên phân tích chi tiết từng track (workflow, SWOT, dữ liệu thật) — không chấm cảm tính. Xem phân tích chi tiết từng track tại tab <b>Phân tích Track</b>.</p>
        <div className="grid-2" style={{ gap: '0.7059rem' }}>
          <div style={{ border: '1px solid var(--border)', borderRadius: '0.5882rem', padding: '0.8235rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.2353rem' }}>1. Thị trường — /20</div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Chấm theo quy mô khách hàng tiềm năng thực tế tại VN (số liệu dẫn nguồn cụ thể cho từng track).</p>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: '0.5882rem', padding: '0.8235rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.2353rem' }}>2. Độ phù hợp năng lực đội — /20</div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}><code>(điểm phù hợp / 10) × 20</code> — đối chiếu kỹ năng hiện có của Vibonymus với yêu cầu track.</p>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: '0.5882rem', padding: '0.8235rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.2353rem' }}>3. Tính khả thi trong 48h — /15</div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}><code>(10 − độ khó/10) × 15</code> — độ khó đề bài càng cao, điểm khả thi càng thấp.</p>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: '0.5882rem', padding: '0.8235rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.2353rem' }}>4. Lợi thế cạnh tranh — /15</div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}><code>15 × (1 − % đội quan tâm)</code> — dữ liệu thật từ 233 đội đã cào được (14/07/2026).</p>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: '0.5882rem', padding: '0.8235rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.2353rem' }}>5. Độ sẵn sàng dữ liệu/demo — /15</div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Chấm theo khả năng có dữ liệu thật/dataset mở/API giả lập để dựng demo thuyết phục trong 48h.</p>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: '0.5882rem', padding: '0.8235rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.2353rem' }}>6. Rủi ro pháp lý/đạo đức dữ liệu — /15</div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Điểm càng cao = rủi ro càng thấp. Chấm theo mức độ nhạy cảm của dữ liệu và hậu quả nếu AI sai sót.</p>
          </div>
        </div>
        <p style={{ margin: '0.9412rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Tổng điểm = 6 tiêu chí cộng lại, tối đa 100. Điểm càng cao, track càng đáng ưu tiên xét theo dữ liệu hiện có.</p>
      </div>

      {/* BIỂU ĐỒ TỔNG ĐIỂM — DẠNG BENCHMARK SO SÁNH (kiểu CPU/GPU) */}
      <div className="card">
        <h2><TrendingUp /> Biểu đồ Benchmark: xếp hạng tổng điểm 8 Track</h2>
        <p className="sub" style={{ margin: '0 0 1.1765rem' }}>Độ dài thanh tính theo % so với track dẫn đầu (Năng Suất Doanh Nghiệp SME = 100%) — càng ngắn, càng cách xa track #1. Thứ tự các track giữ nguyên như danh sách 8 track, không xếp lại theo điểm.</p>
        <div className="flex-column" style={{ gap: '0.7059rem' }}>
          {scoredTracks.map((t) => {
            const rank = rankById[t.id];
            const medal = rank === 1 ? '#f5c518' : rank === 2 ? '#c0c8d1' : rank === 3 ? '#cd7f32' : 'var(--border)';
            const medalText = rank <= 3 ? '#1a1730' : 'var(--text-secondary)';
            const relative = Math.round((t.s.total / maxTotal) * 100);
            return (
              <div
                key={t.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9412rem',
                  padding: '0.7059rem 0.9412rem',
                  borderRadius: '0.7059rem',
                  border: rank === 1 ? '1px solid rgba(245, 197, 24, 0.4)' : '1px solid var(--border)',
                  background: rank === 1 ? 'rgba(245, 197, 24, 0.06)' : 'var(--surface-page)'
                }}
              >
                <div style={{
                  width: '2.1176rem', height: '2.1176rem', borderRadius: '50%', flexShrink: 0,
                  background: medal, color: medalText, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: '0.9rem', boxShadow: 'var(--shadow-sm)'
                }}>
                  {rank}
                </div>

                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <div className="flex-between" style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.3529rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4706rem', color: 'var(--text-primary)' }}>
                      <TrackIcon iconName={t.iconName} iconColor={t.iconColor} size={16} />
                      {t.name}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.4706rem', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>{relative}%</span>
                      <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--theme-color)' }}>{t.s.total}</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>/100</span>
                    </span>
                  </div>
                  <div style={{ height: '1.0588rem', background: 'var(--grid)', borderRadius: '0.5294rem', overflow: 'hidden' }}>
                    <div
                      className="progress-bar-animated"
                      style={{
                        width: `${relative}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${t.iconColor}, ${t.iconColor}cc)`,
                        borderRadius: '0.5294rem',
                        transition: 'width 1s ease-in-out'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BIỂU ĐỒ SO SÁNH TỪNG TIÊU CHÍ */}
      <div className="card">
        <h2><BarChart3 /> So sánh chi tiết theo từng tiêu chí</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem' }}>Mỗi tiêu chí so sánh riêng, giữ nguyên thứ tự 8 track — track dẫn đầu ở tiêu chí này chưa chắc dẫn đầu ở tiêu chí khác.</p>
        <div className="grid-2" style={{ gap: '1.1765rem' }}>
          {CRITERIA.map((c) => {
            return (
              <div key={c.key} style={{ border: '1px solid var(--border)', borderRadius: '0.7059rem', padding: '0.9412rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.7059rem' }}>{c.label} <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>(/{c.max})</span></div>
                <div className="flex-column" style={{ gap: '0.5882rem' }}>
                  {scoredTracks.map((t) => (
                    <div key={t.id} className="flex-column" style={{ gap: '0.1765rem' }}>
                      <div className="flex-between" style={{ fontSize: '0.74rem', fontWeight: 700 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{t.name}</span>
                        <span style={{ color: 'var(--text-primary)' }}>{t.s[c.key]}</span>
                      </div>
                      <div style={{ height: '0.3529rem', background: 'var(--grid)', borderRadius: '0.1765rem', overflow: 'hidden' }}>
                        <div
                          className="progress-bar-animated"
                          style={{ width: `${(t.s[c.key] / c.max) * 100}%`, height: '100%', background: c.color, borderRadius: '0.1765rem' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BẢNG BENCHMARK SO SÁNH 8 TRACK */}
      <div className="card" style={{ overflowX: 'auto' }}>
        <h2><BarChart3 /> Bảng benchmark so sánh 8 Track (xếp hạng theo tổng điểm)</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem' }}>Xem phân tích chi tiết (SWOT, workflow, phân công AI) của từng track ở tab Phân tích Track.</p>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Track</th>
              <th>Thị trường /20</th>
              <th>Phù hợp đội /20</th>
              <th>Khả thi 48h /15</th>
              <th>Cạnh tranh /15</th>
              <th>Sẵn sàng dữ liệu /15</th>
              <th>Rủi ro pháp lý /15</th>
              <th>Tổng /100</th>
            </tr>
          </thead>
          <tbody>
            {rankedByTotal.map((t, i) => (
              <tr key={t.id}>
                <td style={{ fontWeight: 800, color: 'var(--text-muted)' }}>{i + 1}</td>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.4706rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  <TrackIcon iconName={t.iconName} iconColor={t.iconColor} size={16} />
                  {t.name}
                </td>
                <td>{t.s.market}</td>
                <td>{t.s.teamFit}</td>
                <td>{t.s.feasibility}</td>
                <td>{t.s.competition}</td>
                <td>{t.s.dataReadiness}</td>
                <td>{t.s.legalRisk}</td>
                <td style={{ fontWeight: 900, fontSize: '1rem', color: 'var(--theme-color)' }}>{t.s.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Benchmark;
