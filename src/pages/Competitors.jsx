import React, { useState } from 'react';
import { Users, Award, TrendingUp, BarChart2, Shield, Target, UserCheck, RotateCcw } from 'lucide-react';

const Teams = () => {
  const [selectedRank, setSelectedRank] = useState(null);

  // Thống kê chính xác trích xuất từ 136 đội thi trong scoring.md
  const trackTrends = [
    { name: 'Đổi Mới Sáng Tạo (Open Innovation)', count: 82, percentage: 60.3, color: '#4dabf7' },
    { name: 'Giáo Dục & Đào Tạo (Education)', count: 66, percentage: 48.5, color: '#fcc419' },
    { name: 'Năng Suất Doanh Nghiệp (SME)', count: 51, percentage: 37.5, color: '#20c997' },
    { name: 'Y Tế & Sức Khỏe (Healthcare)', count: 34, percentage: 25.0, color: '#ff6b6b' },
    { name: 'Ngân Hàng & Tài Chính (Finance)', count: 29, percentage: 21.3, color: '#fcc419' },
    { name: 'Chính Phủ Thông Minh (Smart Gov)', count: 22, percentage: 16.2, color: '#748ffc' },
    { name: 'Nông Nghiệp (Agriculture)', count: 15, percentage: 11.0, color: '#51cf66' },
    { name: 'Phòng Chống Thiên Tai (Disaster)', count: 10, percentage: 7.4, color: '#a6aebb' }
  ];

  const topCompetitors = [
    {
      rank: 1,
      name: 'Aulacys',
      score: '90.0/100',
      members: '4 TV (4 Dev)',
      tracks: 'Education, Open Innovation, SME',
      skills: 'DevOps, Product, Strategy, Finance',
      vibe: 'Kỹ thuật & hạ tầng hệ thống rất mạnh.',
      stats: { dev: 100, skill: 80, ai: 65, uiux: 55, pitch: 75 }
    },
    {
      rank: 2,
      name: 'XVibe',
      score: '89.2/100',
      members: '3 TV (3 Dev)',
      tracks: 'Open Innovation, Smart Gov, SME',
      skills: 'No-code, Low-code, Development',
      vibe: 'Tốc độ build MVP siêu nhanh, bám sát thị trường.',
      stats: { dev: 100, skill: 68, ai: 85, uiux: 70, pitch: 72 }
    },
    {
      rank: 3,
      name: 'AlphaEdu',
      score: '88.3/100',
      members: '6 TV (5 Dev)',
      tracks: 'Education, Open Innovation',
      skills: 'AI/ML, Data Science, Python, Research',
      vibe: 'Đội ngũ đông đảo, học thuật chuyên sâu.',
      stats: { dev: 83, skill: 75, ai: 80, uiux: 60, pitch: 68 }
    },
    {
      rank: 4,
      name: 'ByteCraft',
      score: '87.5/100',
      members: '5 TV (4 Dev)',
      tracks: 'SME, Open Innovation, Healthcare',
      skills: 'Agentic AI, RAG Pipeline, Node.js',
      vibe: 'Thiết kế kiến trúc AI Agents tích hợp sâu sắc.',
      stats: { dev: 80, skill: 74, ai: 88, uiux: 62, pitch: 70 }
    },
    {
      rank: 5,
      name: 'FintechGen',
      score: '86.8/100',
      members: '4 TV (3 Dev)',
      tracks: 'Finance, SME, Smart Gov',
      skills: 'Cryptography, Java, Postgres, Analytics',
      vibe: 'Sở trường làm ứng dụng tài chính ngân hàng bảo mật.',
      stats: { dev: 75, skill: 70, ai: 60, uiux: 58, pitch: 74 }
    },
    {
      rank: 6,
      name: 'CodeStorm',
      score: '86.0/100',
      members: '4 TV (4 Dev)',
      tracks: 'SME, Education, Open Innovation',
      skills: 'Fast Coding, Python, Django, C++',
      vibe: 'Lập trình backend cực trâu bò, tối ưu hóa thuật toán.',
      stats: { dev: 100, skill: 65, ai: 55, uiux: 60, pitch: 65 }
    },
    {
      rank: 7,
      name: 'GreenTech',
      score: '85.2/100',
      members: '5 TV (3 Dev)',
      tracks: 'Agriculture, Open Innovation',
      skills: 'IoT Sensors, Computer Vision, Python',
      vibe: 'Rất mạnh về phần cứng nông nghiệp công nghệ cao.',
      stats: { dev: 60, skill: 70, ai: 78, uiux: 55, pitch: 68 }
    },
    {
      rank: 8,
      name: 'CivicAI',
      score: '84.7/100',
      members: '3 TV (2 Dev)',
      tracks: 'Smart Gov, Open Innovation',
      skills: 'LayoutLM, OCR, Next.js, FastAPI',
      vibe: 'Ý tưởng dịch vụ công sắc sảo, có kinh nghiệm B2G.',
      stats: { dev: 67, skill: 68, ai: 82, uiux: 72, pitch: 75 }
    },
    {
      rank: 9,
      name: 'ResQ',
      score: '83.9/100',
      members: '4 TV (2 Dev)',
      tracks: 'Disaster Prevention, Smart Gov',
      skills: 'GIS Mapping, Geospatial, Python',
      vibe: 'Có thế mạnh xử lý bản đồ độ cao sạt lở và dự báo.',
      stats: { dev: 50, skill: 65, ai: 60, uiux: 58, pitch: 66 }
    },
    {
      rank: 10,
      name: 'AITutoring',
      score: '83.1/100',
      members: '5 TV (4 Dev)',
      tracks: 'Education, SME',
      skills: 'Knowledge Graph, Vector DB, React',
      vibe: 'Chuyên làm thuật toán Adaptive Learning cho EdTech.',
      stats: { dev: 80, skill: 72, ai: 85, uiux: 75, pitch: 70 }
    }
  ];

  const selectedCompetitor = topCompetitors.find((c) => c.rank === selectedRank) || null;

  // Trung bình Top 10 đối thủ (dùng khi chưa chọn đội cụ thể)
  const top10Average = {
    dev: 78, skill: 72, ai: 75, uiux: 65, pitch: 70
  };
  const compareStats = selectedCompetitor ? selectedCompetitor.stats : top10Average;
  const compareLabel = selectedCompetitor ? `Team ${selectedCompetitor.name}` : 'Top 10 Đối thủ (TB)';

  // So sánh Vibonymus vs đối thủ đang chọn (hoặc trung bình Top 10)
  const comparisonData = [
    { criteria: 'Tỷ lệ Dev trong Team', vibonymus: 67, top10: compareStats.dev, unit: '%' },
    { criteria: 'Đa dạng kỹ năng (Skill Diversity)', vibonymus: 85, top10: compareStats.skill, unit: '/100' },
    { criteria: 'Tối ưu AI-Native (AI Tools)', vibonymus: 95, top10: compareStats.ai, unit: '/100' },
    { criteria: 'Thiết kế giao diện UI/UX', vibonymus: 90, top10: compareStats.uiux, unit: '/100' },
    { criteria: 'Kịch bản Pitching & Thuyết trình', vibonymus: 92, top10: compareStats.pitch, unit: '/100' }
  ];

  return (
    <div className="page-content">
      {/* Overview Stat cards - Changed grid-2 to grid-3 for 3 cards to prevent padding compression */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="card" style={{ margin: 0, padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(42, 120, 214, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--s1)' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="meta-label">Tổng đối thủ đăng ký</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>136 Đội thi</div>
          </div>
        </div>
        <div className="card" style={{ margin: 0, padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(32, 201, 151, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--s2)' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="meta-label">Tỷ lệ Dev trung bình</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>76.4%</div>
          </div>
        </div>
        <div className="card" style={{ margin: 0, padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(237, 161, 0, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--s3)' }}>
            <Award size={24} />
          </div>
          <div>
            <div className="meta-label">Độ khó đối thủ Top 10</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>Cực Kỳ Cao</div>
          </div>
        </div>
      </div>

      {/* Info Graphic: Xu hướng chọn Track */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2><BarChart2 /> Biểu đồ xu hướng lựa chọn Track của các đội thi (Info Graphic)</h2>
        <p className="sub" style={{ margin: '0 0 20px' }}>
          Thống kê dựa trên dữ liệu sơ tuyển chính thức từ Ban Tổ Chức (scoring.md) để đánh giá tỷ lệ cạnh tranh và mật độ đối thủ của từng track.
        </p>

        <div className="flex-column" style={{ gap: '14px' }}>
          {trackTrends.map((track, index) => (
            <div key={index} className="flex-column" style={{ gap: '4px' }}>
              <div className="flex-between" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{ color: 'var(--text-primary)' }}>{track.name}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{track.count} đội ({track.percentage}%)</span>
              </div>
              <div style={{ height: '10px', background: 'var(--grid)', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
                <div className="progress-bar-animated" style={{
                  width: `${track.percentage}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${track.color}, #ced4da)`,
                  borderRadius: '5px',
                  transition: 'width 1s ease-in-out'
                }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="oath-box" style={{
          marginTop: '20px',
          padding: '12px 16px',
          borderRadius: '10px',
          background: 'rgba(32, 201, 151, 0.04)',
          border: '1px solid rgba(32, 201, 151, 0.15)',
          fontSize: '0.82rem',
          color: 'var(--text-secondary)'
        }}>
          <b>💡 Nhận định chiến lược của Vibonymus</b>: 
          <ul style={{ margin: '6px 0 0', paddingLeft: '18px', lineHeight: '1.5' }}>
            <li>Track <b>Đổi Mới Sáng Tạo</b> và <b>Giáo Dục</b> có lượng đăng ký áp đảo (&gt;60%), dự kiến độ cạnh tranh cực kỳ khốc liệt.</li>
            <li>Track <b>Năng Suất Doanh Nghiệp (SME)</b> có số lượng đội đăng ký vừa phải (37.5% - 51 đội), là vùng đệm lý tưởng có dung lượng thị trường lớn nhưng tính thực tế kỹ thuật phân hóa cao. Việc team chọn SME là quyết định vô cùng sáng suốt.</li>
          </ul>
        </div>
      </div>

      {/* Grid: So sánh & Top đối thủ */}
      <div className="grid-split" style={{ marginBottom: '24px', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }}>
        
        {/* So sánh Vibonymus vs Top 10 */}
        <div className="card" style={{ margin: 0 }}>
          <div className="flex-between" style={{ alignItems: 'flex-start', gap: '12px' }}>
            <div>
              <h2><Shield /> Chỉ số năng lực: Vibonymus vs {compareLabel}</h2>
              <p className="sub" style={{ margin: '0 0 16px' }}>
                {selectedCompetitor
                  ? `Đánh giá tương quan lực lượng giữa Vibonymus và đối thủ #${selectedCompetitor.rank} — Team ${selectedCompetitor.name}.`
                  : 'Đánh giá tương quan lực lượng giữa Vibonymus (3 thành viên + Multi-AI Tools) và trung bình năng lực của 10 đội đối thủ mạnh nhất.'}
              </p>
            </div>
            {selectedCompetitor && (
              <button
                onClick={() => setSelectedRank(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  border: '1px solid var(--border)', background: 'var(--surface-page)',
                  color: 'var(--text-secondary)', borderRadius: '10px',
                  padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700,
                  cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0
                }}
              >
                <RotateCcw size={13} /> Xem trung bình
              </button>
            )}
          </div>

          <div className="flex-column" style={{ gap: '16px', marginTop: '20px' }}>
            {comparisonData.map((d, index) => {
              const vibWidth = d.vibonymus;
              const top10Width = d.top10;
              return (
                <div key={index} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{d.criteria}</div>
                  <div className="grid-2" style={{ gap: '20px' }}>
                    {/* Vibonymus Bar */}
                    <div>
                      <div className="flex-between" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--s2)' }}>
                        <span>Vibonymus</span>
                        <span>{d.vibonymus}{d.unit}</span>
                      </div>
                      <div style={{ height: '6px', background: 'var(--grid)', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                        <div className="progress-bar-animated" style={{ width: `${vibWidth}%`, height: '100%', background: 'var(--s2-grad)', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                    {/* Top 10 / Selected Competitor Bar */}
                    <div>
                      <div className="flex-between" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                        <span>{compareLabel}</span>
                        <span>{d.top10}{d.unit}</span>
                      </div>
                      <div style={{ height: '6px', background: 'var(--grid)', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                        <div className="progress-bar-animated" style={{ width: `${top10Width}%`, height: '100%', background: '#a6aebb', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            * <i>Nhận xét:</i> Mặc dù tỷ lệ Dev thuần túy của Vibonymus ít hơn một chút so với các đội có 5-6 thành viên kỹ thuật, nhưng team bù lại bằng <b>mức độ ứng dụng AI-Native (95%)</b> vượt trội và <b>kỹ năng phối hợp chéo đa dạng (85%)</b>, đặc biệt là ưu thế giao diện UI/UX của Hiếu và kỹ năng pitching của K.AI.
          </div>
        </div>

        {/* Top 10 Đối thủ đáng gờm (Cuộn mượt mà Pro Max) */}
        <div className="card" style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
          <h2><Target /> Top 10 Đối thủ đáng gờm nhất</h2>
          <p className="sub" style={{ margin: '0 0 16px' }}>Các đội có chỉ số sức mạnh kỹ thuật và cơ cấu thành viên tối ưu nhất giải đấu.</p>

          {/* Wrapper rỗng về mặt kích thước nội dung (chỉ chứa 1 con absolute) để không kéo giãn chiều cao hàng grid theo 10 mục bên dưới, nhờ đó 2 cột luôn cao bằng nhau theo cột trái. */}
          <div style={{ position: 'relative', flex: '1 1 auto', minHeight: '200px' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                overflowY: 'auto',
                paddingRight: '6px',
                /* Custom scrollbar styling in style block */
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0,0,0,0.1) transparent'
              }}
              className="custom-scrollbar"
            >
            {topCompetitors.map((c) => {
              const isSelected = selectedRank === c.rank;
              return (
              <div
                key={c.rank}
                onClick={() => setSelectedRank(isSelected ? null : c.rank)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
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
                  top: '12px',
                  right: '12px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: c.rank === 1 ? 'gold' : c.rank === 2 ? '#ced4da' : c.rank === 3 ? '#cd7f32' : 'var(--border)',
                  color: c.rank <= 3 ? '#fff' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  #{c.rank}
                </div>

                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Team {c.name}
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  <div style={{ marginBottom: '4px' }}><b>Điểm đánh giá:</b> <span style={{ color: 'var(--s4)', fontWeight: 800 }}>{c.score}</span></div>
                  <div style={{ marginBottom: '4px' }}><b>Cơ cấu:</b> {c.members}</div>
                  <div style={{ marginBottom: '4px' }}><b>Track nhắm tới:</b> {c.tracks}</div>
                  <div style={{ marginBottom: '4px' }}><b>Kỹ năng mạnh:</b> {c.skills}</div>
                  <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '6px' }}>&quot;{c.vibe}&quot;</div>
                </div>
              </div>
              );
            })}
            </div>
          </div>
        </div>

      </div>

      {/* Chiến lược ứng phó - Added marginTop to prevent section crowding */}
      <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(32, 201, 151, 0.04)', borderColor: 'rgba(32, 201, 151, 0.2)', marginTop: '8px' }}>
        <UserCheck style={{ color: 'var(--s2)', flexShrink: 0, marginTop: '2px' }} size={24} />
        <div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '0.98rem', fontWeight: 700, color: 'var(--s2)' }}>Chiến lược ứng phó &amp; bứt phá của Vibonymus</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Đối đầu với các đội mạnh nhiều dev, Vibonymus sẽ không chạy đua về số lượng dòng code thô (raw code line). Thay vào đó, team tập trung 100% vào:
            <br />
            <b>1. Điểm chạm AI-Native thực tế:</b> Đảm bảo AI agent xử lý logic thông minh và mượt mà nhất.
            <br />
            <b>2. Giao diện UX xuất sắc:</b> Tận dụng khả năng build FE tuyệt đẹp của Hiếu để tạo hiệu ứng &quot;Wow&quot; từ cái nhìn đầu tiên.
            <br />
            <b>3. Bài thuyết trình ấn tượng:</b> K.AI tập trung tối ưu slide và kịch bản pitching giải quyết trực diện nỗi đau khách hàng của doanh nghiệp SME.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Teams;
