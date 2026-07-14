import React, { useState } from 'react';
import { Heart, Compass, Briefcase, Landmark, Leaf, GraduationCap, CloudRain, ShieldAlert, ChevronRight, Zap, Target, Layers, PlayCircle, ShieldCheck, User, Layout, Server } from 'lucide-react';
import { trackData } from '../data/tracks-data';

const TRACK_ICONS = { Heart, Compass, Briefcase, Landmark, Leaf, GraduationCap, CloudRain, ShieldAlert };

function TrackIcon({ iconName, iconColor, size }) {
  const Icon = TRACK_ICONS[iconName];
  return <Icon className="track-icon" style={{ color: iconColor }} size={size} />;
}

const Tracks = () => {
  const [selectedTrack, setSelectedTrack] = useState('nang-suat-sme');
  const [activeSubTab, setActiveSubTab] = useState('overview');


  const currentTrack = trackData.find(t => t.id === selectedTrack) || trackData[2];

  return (
    <div className="page-content">
      {/* Tiêu đề & Triết lý thi đấu */}
      <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-2.3529rem', right: '-2.3529rem', opacity: 0.05, pointerEvents: 'none' }}>
          <Layers size={200} />
        </div>
        <h2><Compass /> Phân tích &amp; Định vị 8 Track thử thách — VAIC 2026</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem', maxWidth: '80%' }}>
          Căn cứ vào tài liệu hướng dẫn <b>VAIC2026_Hackers-guidebook.md</b>, Vibonymus phân tích chi tiết từng track đề bài, từ đó sẵn sàng thiết kế kiến trúc AI tích hợp sâu sắc đạt chuẩn <b>AI-Native Oath</b> ngay khi BTC công bố đề bài chính thức vào 11:00 ngày 17/07.
        </p>
        
        <div className="oath-box" style={{
          marginTop: '1.1765rem',
          padding: '0.9412rem',
          borderRadius: '0.7059rem',
          background: 'rgba(237, 161, 0, 0.04)',
          border: '1px solid rgba(237, 161, 0, 0.15)',
          display: 'flex',
          gap: '0.7059rem',
          alignItems: 'center'
        }}>
          <Zap style={{ color: 'var(--warning)', flexShrink: 0 }} size={24} />
          <div style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
            <b style={{ color: 'var(--text-primary)', textTransform: 'uppercase' }}>100% AI-Native Oath</b>: Sản phẩm nộp bài bắt buộc phải có AI tham gia trực tiếp xử lý logic cốt lõi (Core Business Flow), có tài liệu <i>AI Collaboration Log</i> chứng minh, không chấp nhận việc dùng AI như một chatbot tĩnh bên lề.
          </div>
        </div>
      </div>

      {/* 2 PHƯƠNG ÁN CHỌN TRACK KHI CÔNG BỐ ĐỀ BÀI */}
      <div className="card">
        <h2><ShieldCheck /> 2 Phương án lựa chọn Track thi đấu khi công bố đề bài</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem' }}>Vibonymus chuẩn bị sẵn 2 kịch bản phản ứng nhanh để chốt đề tài ngay sau 11:00 ngày 17/07:</p>
        
        <div className="grid-2">
          <div style={{ border: '1px solid var(--border)', borderRadius: '0.7059rem', padding: '0.9412rem', background: 'rgba(32, 201, 151, 0.03)' }}>
            <h3 style={{ margin: '0 0 0.4706rem', color: 'var(--s2)', fontSize: '0.98rem', fontWeight: 800 }}>⚡ Phương án 1: Lĩnh vực team giỏi nhất (Năng lực cốt lõi)</h3>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <b>Nhóm mục tiêu:</b> Năng Suất Doanh Nghiệp (SME) hoặc Giáo Dục.
              <br />
              <b>Ưu điểm:</b> Tận dụng tối đa thế mạnh xử lý Backend/Database Postgres của Quân và khả năng thiết kế UI/UX giao diện mượt mà của K.AI để dựng sản phẩm mẫu (MVP) hoàn chỉnh, trực quan nhất trong 48h.
              <br />
              <b>Thách thức:</b> Số lượng đối thủ cạnh tranh trực tiếp sẽ rất lớn (dự kiến chiếm &gt;80% số đội thi theo thống kê).
            </p>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: '0.7059rem', padding: '0.9412rem', background: 'rgba(42, 120, 214, 0.03)' }}>
            <h3 style={{ margin: '0 0 0.4706rem', color: 'var(--s1)', fontSize: '0.98rem', fontWeight: 800 }}>🌊 Phương án 2: Lĩnh vực ít đội thi nhất (Đại dương xanh)</h3>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <b>Nhóm mục tiêu:</b> Phòng Chống Thiên Tai hoặc Nông Nghiệp.
              <br />
              <b>Ưu điểm:</b> Số lượng đội đăng ký cực kỳ ít (lần lượt chiếm 7.4% và 11.0% theo Competitors Info Graphic), giảm thiểu tối đa cạnh tranh trực diện. Ý tưởng độc lạ dễ gây ấn tượng mạnh với Hội đồng Giám khảo.
              <br />
              <b>Thách thức:</b> Đòi hỏi nghiên cứu kiến thức chuyên ngành phức tạp, khó thu thập dữ liệu kiểm chứng và làm giao diện demo sinh động trong thời gian ngắn.
            </p>
          </div>
        </div>
      </div>

      {/* Grid điều hướng & Panel chi tiết */}
      <div className="grid-split">
        
        {/* Danh sách 8 Track bên trái */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5882rem' }}>
          {trackData.map((t) => {
            const isSelected = selectedTrack === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTrack(t.id)}
                style={{
                  padding: '0.8235rem 1.0588rem',
                  borderRadius: '0.7059rem',
                  border: isSelected ? '1px solid var(--s1)' : '1px solid var(--border)',
                  background: isSelected ? 'rgba(42, 120, 214, 0.05)' : 'var(--surface-1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: isSelected ? 'none' : 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7059rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                    <TrackIcon iconName={t.iconName} iconColor={t.iconColor} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: isSelected ? 'var(--s1)' : 'var(--text-primary)' }}>
                      {t.name}
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: isSelected ? 'var(--s1)' : 'var(--text-muted)' }} />
              </div>
            );
          })}
        </div>

        {/* Panel Phân tích chi tiết bên phải */}
        <div className="card" style={{ margin: 0, padding: '1.4118rem' }}>
          {/* Header Track */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8235rem', marginBottom: '1.1765rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.9412rem' }}>
            <div style={{ width: '2.8235rem', height: '2.8235rem', borderRadius: '0.7059rem', background: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <TrackIcon iconName={currentTrack.iconName} iconColor={currentTrack.iconColor} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{currentTrack.name}</h3>
              <p style={{ margin: '0.2353rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{currentTrack.desc}</p>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid-3" style={{ marginBottom: '1.4118rem' }}>
            <div className="meta-card">
              <div className="meta-label">Độ khó đề bài</div>
              <div className="meta-value critical">{currentTrack.difficulty}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Dung lượng thị trường</div>
              <div className="meta-value success">{currentTrack.market}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Mức độ phù hợp với Team</div>
              <div className="meta-value warning">{currentTrack.fit}</div>
            </div>
          </div>

          {/* Sub-tabs điều hướng thông tin phân tích */}
          <div style={{ display: 'flex', gap: '0.5882rem', borderBottom: '1px solid var(--border)', marginBottom: '1.1765rem' }}>
            <button
              onClick={() => setActiveSubTab('overview')}
              style={{
                padding: '0.4706rem 0.9412rem',
                border: 'none',
                background: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: activeSubTab === 'overview' ? 'var(--theme-color)' : 'var(--text-secondary)',
                borderBottom: activeSubTab === 'overview' ? '2px solid var(--theme-color)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Phân tích SWOT
            </button>
            <button
              onClick={() => setActiveSubTab('workflow')}
              style={{
                padding: '0.4706rem 0.9412rem',
                border: 'none',
                background: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: activeSubTab === 'workflow' ? 'var(--theme-color)' : 'var(--text-secondary)',
                borderBottom: activeSubTab === 'workflow' ? '2px solid var(--theme-color)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Ý tưởng Workflow
            </button>
            <button
              onClick={() => setActiveSubTab('delegation')}
              style={{
                padding: '0.4706rem 0.9412rem',
                border: 'none',
                background: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: activeSubTab === 'delegation' ? 'var(--theme-color)' : 'var(--text-secondary)',
                borderBottom: activeSubTab === 'delegation' ? '2px solid var(--theme-color)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Đề xuất Phân công AI
            </button>
            <button
              onClick={() => setActiveSubTab('ai')}
              style={{
                padding: '0.4706rem 0.9412rem',
                border: 'none',
                background: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: activeSubTab === 'ai' ? 'var(--theme-color)' : 'var(--text-secondary)',
                borderBottom: activeSubTab === 'ai' ? '2px solid var(--theme-color)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Điểm tích hợp AI
            </button>
          </div>

          {/* Content panel */}
          <div style={{ minHeight: '12.9412rem' }}>
            
            {/* Overview Panel (SWOT Analysis) */}
            {activeSubTab === 'overview' && (
              <div>
                <div style={{ marginBottom: '0.9412rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4706rem', marginBottom: '0.3529rem' }}>
                    <Target size={16} style={{ color: 'var(--s1)' }} />
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Mục tiêu sản phẩm MVP dự kiến:</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{currentTrack.mvp}</p>
                </div>

                {/* SWOT Analysis Grid */}
                <div className="grid-2" style={{ gap: '0.8235rem', marginTop: '0.9412rem' }}>
                  <div style={{ padding: '0.8235rem', borderRadius: '0.5882rem', background: 'rgba(32, 201, 151, 0.04)', border: '1px solid rgba(32, 201, 151, 0.15)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--s2)', marginBottom: '0.3529rem', display: 'flex', alignItems: 'center', gap: '0.3529rem' }}>
                      <span>💪 Strengths (S) - Điểm mạnh</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{currentTrack.swot.s}</p>
                  </div>

                  <div style={{ padding: '0.8235rem', borderRadius: '0.5882rem', background: 'rgba(240, 62, 62, 0.04)', border: '1px solid rgba(240, 62, 62, 0.15)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--critical)', marginBottom: '0.3529rem', display: 'flex', alignItems: 'center', gap: '0.3529rem' }}>
                      <span>⚠️ Weaknesses (W) - Điểm yếu</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{currentTrack.swot.w}</p>
                  </div>

                  <div style={{ padding: '0.8235rem', borderRadius: '0.5882rem', background: 'rgba(42, 120, 214, 0.04)', border: '1px solid rgba(42, 120, 214, 0.15)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--s1)', marginBottom: '0.3529rem', display: 'flex', alignItems: 'center', gap: '0.3529rem' }}>
                      <span>🚀 Opportunities (O) - Cơ hội</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{currentTrack.swot.o}</p>
                  </div>

                  <div style={{ padding: '0.8235rem', borderRadius: '0.5882rem', background: 'rgba(245, 159, 0, 0.04)', border: '1px solid rgba(245, 159, 0, 0.15)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--warning)', marginBottom: '0.3529rem', display: 'flex', alignItems: 'center', gap: '0.3529rem' }}>
                      <span>🔥 Threats (T) - Thách thức</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{currentTrack.swot.t}</p>
                  </div>
                </div>

                <div style={{ marginTop: '0.9412rem', padding: '0.8235rem', borderRadius: '0.5882rem', background: 'var(--surface-page)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.2353rem' }}>Thách thức lớn nhất khi vận hành:</div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{currentTrack.challenge}</p>
                </div>
              </div>
            )}

            {/* Workflow Panel */}
            {activeSubTab === 'workflow' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4706rem', marginBottom: '0.8235rem' }}>
                  <PlayCircle size={16} style={{ color: 'var(--s1)' }} />
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Ý tưởng luồng vận hành của giải pháp:</span>
                </div>
                <div className="workflow-list">
                  {/* Vertical Line */}
                  <div className="workflow-line"></div>

                  {currentTrack.workflow.map((step, index) => (
                    <div key={index} className="workflow-step">
                      {/* Node Dot */}
                      <div className="workflow-dot"></div>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Bước {index + 1}:</span> {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Đề xuất Phân công AI Panel (NEWLY MOVED HERE) */}
            {activeSubTab === 'delegation' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4706rem', marginBottom: '0.8235rem' }}>
                  <Zap size={16} style={{ color: 'var(--s1)' }} />
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Đề xuất Phân công Cộng tác AI chi tiết cho từng thành viên:</span>
                </div>

                <div className="grid-3" style={{ gap: '0.8235rem' }}>
                  {/* Cột PM */}
                  <div className="meta-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.4706rem', padding: '0.8235rem', background: 'var(--surface-page)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.3529rem' }}>
                      <User size={14} style={{ color: 'var(--s1)' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--s1)' }}>K.AI (PM &amp; Slide)</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      <ul style={{ paddingLeft: '0.8235rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3529rem' }}>
                        {currentTrack.pm.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Cột Frontend */}
                  <div className="meta-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.4706rem', padding: '0.8235rem', background: 'var(--surface-page)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.3529rem' }}>
                      <Layout size={14} style={{ color: 'var(--s3)' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--s3)' }}>K.AI (Frontend)</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      <ul style={{ paddingLeft: '0.8235rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3529rem' }}>
                        {currentTrack.fe.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Cột Backend */}
                  <div className="meta-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.4706rem', padding: '0.8235rem', background: 'var(--surface-page)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.3529rem' }}>
                      <Server size={14} style={{ color: 'var(--s2)' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--s2)' }}>Quân (Backend &amp; DB)</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      <ul style={{ paddingLeft: '0.8235rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3529rem' }}>
                        {currentTrack.be.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Integration Points Panel */}
            {activeSubTab === 'ai' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4706rem', marginBottom: '0.8235rem' }}>
                  <Zap size={16} style={{ color: 'var(--warning)' }} />
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Điểm then chốt tích hợp AI (AI-Native Points):</span>
                </div>
                <div className="flex-column">
                  {currentTrack.aiPoints.map((pt, index) => (
                    <div key={index} className="ai-point-card">
                      <div className="ai-point-title">
                        {index + 1}. {pt.point}
                      </div>
                      <p className="ai-point-desc">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                  
                  {/* AI Proposal Section */}
                  <div style={{ 
                    marginTop: '0.9412rem', 
                    padding: '0.9412rem', 
                    borderRadius: '0.5882rem', 
                    background: 'rgba(42, 120, 214, 0.04)', 
                    border: '1px solid rgba(42, 120, 214, 0.15)' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4706rem', marginBottom: '0.4706rem' }}>
                      <Zap size={16} style={{ color: 'var(--s1)' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)' }}>AI kiến nghị kiến trúc &amp; defensibility cho đề tài này:</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {currentTrack.aiProposal}
                    </p>
                  </div>

                  <div style={{ marginTop: '0.5882rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    * Công nghệ dự kiến áp dụng: {currentTrack.tech}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Tracks;
