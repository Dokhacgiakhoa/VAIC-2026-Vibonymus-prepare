import React, { useState, useEffect } from 'react';
import { Calendar, CheckSquare, ExternalLink, ChevronDown } from 'lucide-react';
import { scoringCriteria, ganttDays } from '../data/dashboard-data';

const Dashboard = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expandedCriterion, setExpandedCriterion] = useState(null);

  useEffect(() => {
    const target = new Date("2026-07-17T08:00:00+07:00").getTime();
    
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-content">
      {/* Header & Countdown */}
      <div className="card header-row">
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.7059rem' }}>
            <span className="icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.2941rem', height: '1.2941rem', color: '#fff' }}>
                <path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.93 14.93 0 01-5.84 2.58m-.12-8.54a6 6 0 00-7.38 5.84h4.8m2.58-5.84a14.93 14.93 0 00-2.58 5.84"/><circle cx="15" cy="9" r="1.2" fill="currentColor" stroke="none"/>
              </svg>
            </span>
            Vibonymus @ VAIC 2026
          </h1>
          <p className="sub" style={{ margin: '0.4706rem 0 0.9412rem' }}>Kế hoạch chuẩn bị &amp; thi đấu — K.AI · Quân · Mai · Quang · Lâm · Yến &nbsp;|&nbsp; Hackathon 48h, 17–19/07/2026, 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội</p>
          <div className="links">
            <a href="https://www.vietnamaichallenge.com/" target="_blank" rel="noopener noreferrer">Website <ExternalLink size={13} /></a>
            <a href="https://www.facebook.com/vietnamaiinnovationchallenge" target="_blank" rel="noopener noreferrer">Fanpage <ExternalLink size={13} /></a>
            <a href="https://community.vietnamaichallenge.com/c/welcome" target="_blank" rel="noopener noreferrer">Community Group <ExternalLink size={13} /></a>
          </div>
        </div>
        <div className="countdown">
          <div className="cd-box"><div className="cd-num">{timeLeft.days}</div><div className="cd-label">ngày</div></div>
          <div className="cd-box"><div className="cd-num">{timeLeft.hours}</div><div className="cd-label">giờ</div></div>
          <div className="cd-box"><div className="cd-num">{timeLeft.minutes}</div><div className="cd-label">phút</div></div>
          <div className="cd-box"><div className="cd-num">{timeLeft.seconds}</div><div className="cd-label">giây</div></div>
        </div>
      </div>

      {/* GANTT */}
      <div className="card">
        <h2><Calendar /> Gantt: Kế hoạch Chiến thuật 72h (17/07 - 19/07)</h2>
        <div className="gantt-scroll">
          <div className="gantt">
            {ganttDays.map((day, dIdx) => (
              <React.Fragment key={dIdx}>
                <div className="gantt-phase-label" style={{ marginTop: dIdx > 0 ? '1.5294rem' : '0' }}>
                  {day.label}
                </div>
                {day.lanes.map((lane, lIdx) => {
                  const rows = Math.max(1, ...lane.bars.map((b) => (b.row ?? 0) + 1));
                  return (
                  <div className="gantt-row" style={{ '--cols': day.cols, '--rows': rows }} key={lIdx}>
                    <div className="gantt-row-label">
                      <span className="legend-dot" style={{ background: lane.color }}></span> {lane.roleLabel}
                    </div>
                    <div className="gantt-track" style={{ '--cols': day.cols, '--rows': rows }}>
                      {lane.bars.map((bar, bIdx) => (
                        <div
                          className="bar-wrapper"
                          style={{
                            left: `${(bar.start / day.cols) * 100}%`,
                            width: `${(bar.duration / day.cols) * 100}%`,
                            opacity: bar.opacity ?? 1,
                            '--row': bar.row ?? 0
                          }}
                          key={bIdx}
                        >
                          <div className={`bar ${bar.barClass}`}>{bar.title}</div>
                          <div className="gantt-tooltip-css">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                              <span className="legend-dot" style={{ background: lane.color, width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                              <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{bar.category}</span>
                            </div>
                            <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>{bar.title}</div>
                            <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>{bar.timeLabel}</div>
                            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>{bar.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  );
                })}
                <div className="axis-row">
                  <div></div>
                  <div className="axis-ticks" style={{ '--cols': day.cols }}>
                    {day.axisTicks.map((tick, tIdx) => (
                      <div className="axis-tick" key={tIdx}>{tick}</div>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--s1)' }}></span> K.AI · Tech Lead &amp; Backend</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--s2)' }}></span> Quân · Frontend &amp; UI/UX</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--s5)' }}></span> Mai · QC &amp; Hiệu suất</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--s6)' }}></span> Quang · AI Core &amp; Security</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--s7)' }}></span> Lâm · AI Core &amp; Security</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--s8)' }}></span> Yến · Business &amp; Pitching</div>
        </div>
        <div className="note">Ô mờ (opacity thấp) là khung nghỉ ngơi luân phiên — điều chỉnh theo thể trạng thực tế, luôn đảm bảo ít nhất 1 người thức khi cần xử lý sự cố.</div>
      </div>

      {/* SCORING CRITERIA */}
      <div className="card">
        <h2>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.2941rem', height: '1.2941rem', color: 'var(--s1)' }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Tiêu chí chấm điểm &amp; Rào cản điểm số (Scoring Barriers)
        </h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem' }}>Định hướng phát triển sản phẩm bám sát 6 tiêu chí đánh giá cốt lõi của Ban giám khảo VAIC 2026 (tổng điểm 100). Bấm vào từng dòng để xem chi tiết:</p>

        <div className="cross-table-scroll" style={{ margin: 0 }}>
          <table className="cross-table" style={{ minWidth: 0 }}>
            <thead>
              <tr>
                <th style={{ width: '2.9412rem' }}>STT</th>
                <th>Tiêu chí đánh giá</th>
                <th style={{ textAlign: 'right', width: '5.8824rem' }}>Trọng số điểm</th>
              </tr>
            </thead>
            <tbody>
              {scoringCriteria.map((c) => {
                const isOpen = expandedCriterion === c.id;
                return (
                  <React.Fragment key={c.id}>
                    <tr
                      onClick={() => setExpandedCriterion(isOpen ? null : c.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ fontWeight: 800 }}>{c.id}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4706rem' }}>
                          <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, transition: 'transform 0.2s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                          <b>{c.name}</b>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 800, color: c.color }}>{c.points}</td>
                    </tr>
                    {isOpen && (
                      <tr>
                        <td></td>
                        <td colSpan={2} style={{ background: 'var(--surface-page)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          {c.detail}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              <tr style={{ background: 'rgba(42, 120, 214, 0.04)', fontWeight: 800 }}>
                <td></td>
                <td style={{ color: 'var(--text-primary)' }}>TỔNG ĐIỂM TỐI ĐA</td>
                <td style={{ textAlign: 'right', color: 'var(--s1)', fontSize: '1.05rem' }}>100 pts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CHECKLIST */}
      <div className="card">
        <h2><CheckSquare /> Checklist nộp bài &amp; lưu ý</h2>
        <ul className="checklist">
          <li><b>5 hạng mục bắt buộc:</b> Presentation slides · Demo video (≤5 phút) · GitHub repository (public) · Live deployed URL · AI collaboration log / Project description</li>
          <li><b>2 checkpoint:</b> 10:00–12:00 ngày 18/07 (tên dự án + mô tả) và 21:00–23:00 ngày 18/07 (URL + GitHub)</li>
          <li><b>Hạn chót cuối:</b> 11:00 ngày 19/07 — đóng cổng, không gia hạn</li>
          <li><b>AI-Native Oath:</b> Toàn bộ sản phẩm/code chính phải phát triển trong 48h; AI phải đóng vai trò rõ ràng trong giải pháp, không chỉ là yếu tố phụ trợ</li>
          <li>Đăng ký slot Mentor Wave 1 &amp; 2 (20 phút/slot) trước ngày 16/07</li>
          <li>Chuẩn bị vật dụng cá nhân: laptop riêng (BTC không cấp máy) + sạc laptop/điện thoại, túi ngủ, bình nước, đồ vệ sinh cá nhân</li>
          <li><b>Ngân sách API/LLM:</b> Guidebook không xác nhận cấp API key/credit miễn phí đại trà — Cloud Credit ($2.000, FPT AI Factory) chỉ dành cho Top 5 sau khi thi, không phát trước cho ~150 đội. Team nên tự chuẩn bị sẵn tài khoản/API key riêng (OpenAI, Anthropic, Google...) trước 17/07, không trông chờ BTC/sponsor tài trợ toàn bộ chi phí LLM trong 48h.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
