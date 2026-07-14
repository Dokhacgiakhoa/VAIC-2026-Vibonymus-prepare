import React, { useState, useEffect } from 'react';
import { Calendar, CheckSquare, ExternalLink, ChevronDown } from 'lucide-react';

const scoringCriteria = [
  {
    id: 1,
    name: 'Technical Implementation & Engineering Depth',
    points: '20 pts',
    color: 'var(--s1)',
    detail: (
      <>
        <p style={{ margin: '0 0 0.4706rem' }}>AI phải xử lý logic nghiệp vụ lõi (ví dụ: LangGraph routing, SQL auto-query) chứ không chỉ làm chatbot rỗng. Code sạch, có cấu trúc tốt, có <b>AI Collaboration Log</b> đầy đủ.</p>
        <p style={{ margin: 0 }}><i>Defensibility (Firechat 06/07):</i> khi AI coding khiến chi phí xây dựng thấp/dễ sao chép, cần trả lời được "cái gì khiến sản phẩm này khó copy?".</p>
      </>
    )
  },
  {
    id: 2,
    name: 'AI-Native Architecture & Innovation',
    points: '20 pts',
    color: 'var(--s1)',
    detail: (
      <>
        <p style={{ margin: '0 0 0.4706rem' }}><b>Xác nhận chính thức (slide Evaluation Framework):</b> phân biệt <b>AI-Native (Transformational)</b> — toàn bộ value proposition dựa trên AI reasoning, có vòng lặp dữ liệu phản hồi độc quyền — với <b>AI Feature (Incremental)</b> — chỉ nhúng AI như tính năng phụ trợ (VD: autocomplete).</p>
        <p style={{ margin: 0 }}>Câu hỏi kiểm tra: AI có giải quyết vấn đề <b>vượt trội hẳn (significantly better)</b>, không chỉ nhỉnh hơn chút? Nếu không → chỉ là AI feature, mất điểm tiêu chí này.</p>
      </>
    )
  },
  {
    id: 3,
    name: 'Business Viability & Pilot Pathway',
    points: '20 pts',
    color: 'var(--s1)',
    detail: (
      <>
        <p style={{ margin: '0 0 0.4706rem' }}><b>Framework "Enterprise Pilot Dynamics":</b> trả lời 3 câu hỏi cốt lõi — <i>What problem are you solving? Can you solve it? Will anyone pay for it?</i></p>
        <p style={{ margin: '0 0 0.4706rem' }}>Phân biệt <b>Users</b> (người dùng trực tiếp, gánh vận hành) vs <b>Customers</b> (người trả tiền — quan tâm price-sensitivity, risk mitigation, time-to-value, bottom-line). Xác định 3 ROI metrics: Efficiency, Accuracy/Quality, Scale.</p>
        <p style={{ margin: 0 }}>Nguyên tắc pilot: <b>"Pick the bottleneck, đừng Replace the whole workflow"</b> — chọn 1 điểm nghẽn cụ thể, rủi ro thấp/hiệu quả cao.</p>
      </>
    )
  },
  {
    id: 4,
    name: 'AI-Native UX & Design Thinking',
    points: '15 pts',
    color: 'var(--s3)',
    detail: (
      <>
        <p style={{ margin: '0 0 0.4706rem' }}>Giao diện tinh xảo (K.AI phụ trách), lấy người dùng làm trung tâm, loại bỏ bước nhập liệu dư thừa nhờ AI.</p>
        <p style={{ margin: '0 0 0.4706rem' }}><b>Nguồn: Workshop 1 — AI-native Design (20/06).</b> Team chuẩn hóa prompt thiết kế theo khung <b>CRAFT</b>: <b>C</b>ontext, <b>R</b>ole, <b>A</b>udience, <b>F</b>ormat, <b>T</b>ask — và <b>công thức 6 bước</b>: Act as a [ROLE] → Context → Audience → Task → Constraints → Output.</p>
        <p style={{ margin: 0 }}><i>Ví dụ CRAFT (Material_WS1):</i> Context — "Thay vì 'Create a dashboard' → Thử 'Create a dashboard for a small business owner managing TikTok ads...'"; Format — "Thay vì 'Give me ideas' → Thử 'Generate 5 concepts, mỗi concept gồm: User problem, Proposed solution, Key feature, Potential risk.'"</p>
      </>
    )
  },
  {
    id: 5,
    name: 'AI Safety, Grounding & Trust',
    points: '15 pts',
    color: 'var(--s2)',
    detail: (
      <>
        <p style={{ margin: '0 0 0.4706rem' }}>Giải pháp RAG phải có cơ chế chống hallucination (Grounding) — trả lời có nguồn tham chiếu thật.</p>
        <p style={{ margin: 0 }}><b>Ràng buộc cứng từ guidebook (mục 4.3):</b> dữ liệu y tế/tài chính/cá nhân phải xử lý đúng quy định bảo mật, quyền riêng tư; không dùng dữ liệu nhạy cảm hoặc thu thập trái phép — vi phạm có thể bị loại khỏi phần xét giải.</p>
      </>
    )
  },
  {
    id: 6,
    name: 'Presentation, Demo & Defensibility',
    points: '10 pts',
    color: 'var(--s2)',
    detail: (
      <>
        <p style={{ margin: '0 0 0.4706rem' }}>K.AI pitching tự tin, giải thích thuyết phục tính tự vệ công nghệ (Defensibility) trước ban giám khảo.</p>
        <p style={{ margin: 0 }}><i>Nguyên tắc (Workshop 5 — Pitching, 12/07):</i> storytelling, pitch deck, demo flow. Khi bị phản biện: <b>"Demand evidence, not claims"</b> — đưa bằng chứng/log cụ thể (AI Collaboration Log), không chỉ khẳng định suông.</p>
      </>
    )
  }
];

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
          <p className="sub" style={{ margin: '0.4706rem 0 0.9412rem' }}>Kế hoạch chuẩn bị &amp; thi đấu — K.AI · Quân · Mai · Quang · Lâm &nbsp;|&nbsp; Hackathon 48h, 17–19/07/2026, NIC Hòa Lạc</p>
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
        <h2><Calendar /> Gantt: Từ hôm nay đến Demo Day</h2>
        <div className="gantt-scroll">
          <div className="gantt">

            <div className="gantt-phase-label">Giai đoạn chuẩn bị · 08/07 – 16/07</div>
            <div className="gantt-row" style={{ '--cols': 9 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s4)' }}></span> Agenda</div>
              <div className="gantt-track" style={{ '--cols': 9 }}>
                <div className="bar-wrapper" style={{ left: '33.3%', width: '22.2%' }}>
                  <div className="bar bar-s4">Partner Sessions</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Partner Sessions</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11-12/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Các buổi hướng dẫn sử dụng API, công cụ và tài nguyên thi đấu từ nhà tài trợ chính của VAIC 2026.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '44.4%', width: '11.1%' }}>
                  <div className="bar bar-s4">W5 Pitching</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Workshop 5 — Pitching</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 12/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Buổi chia sẻ kỹ năng xây dựng slide thuyết trình và kỹ thuật pitch defensibility trước Hội đồng Giám khảo.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '66.7%', width: '11.1%' }}>
                  <div className="bar bar-s4">Prep Day</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Preparation Day</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 14/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ngày chuẩn bị hậu cần của ban tổ chức, mở cổng xác nhận đội thi chính thức.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 9 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s1)' }}></span> K.AI (PM)</div>
              <div className="gantt-track" style={{ '--cols': 9 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '33.3%' }}>
                  <div className="bar bar-s1">Research &amp; Setup</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Research &amp; Set up</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 08-10/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Nghiên cứu kỹ thuật các track đề, thiết lập môi trường lập trình local, chuẩn bị Docker và tài khoản cloud.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '33.3%', width: '22.2%' }}>
                  <div className="bar bar-s1">Khung kiến trúc mẫu</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Partner Sessions &amp; Kiến trúc mẫu</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11-12/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Tham dự partner session kỹ thuật, phác thảo các kiến trúc giải pháp mẫu dựa trên API tài trợ.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '55.6%', width: '22.2%' }}>
                  <div className="bar bar-s1">Boilerplate &amp; Test AI</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Boilerplate Code &amp; Test AI Tool</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 13-14/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Dựng sẵn mã nguồn boilerplate (React + Express), kiểm tra khả năng code nhanh của AI coding tools.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '77.8%', width: '11.1%' }}>
                  <div className="bar bar-s1">Rà soát đối thủ</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Quét &amp; đánh giá đối thủ (kỹ thuật)</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 15/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Rà soát các đội thi đối thủ tiềm năng ở 2 track ứng viên, đánh giá độ khó kỹ thuật và mức độ cạnh tranh.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '88.9%', width: '11.1%' }}>
                  <div className="bar bar-s1">Chốt track</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Chốt &amp; Xác nhận track chính thức</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: Tối 16/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Sau khi rà soát đối thủ, team thống nhất chốt 1 trong 8 track, xác nhận tên đội/thành viên/track trên Platform trước 10:00 sáng 17/07 (theo quy định BTC).</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 9 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s2)' }}></span> Quân</div>
              <div className="gantt-track" style={{ '--cols': 9 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '33.3%' }}>
                  <div className="bar bar-s2">Research &amp; 3 Câu hỏi</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Research &amp; Áp dụng 3 câu hỏi</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 08-10/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Nghiên cứu góc độ kinh doanh của các track đề, trả lời 3 câu hỏi cốt lõi để loại trừ track yếu.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '33.3%', width: '22.2%' }}>
                  <div className="bar bar-s2">Khung phân tích track</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Partner Session &amp; Khung phân tích</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11-12/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Tham dự các buổi chia sẻ product, xây dựng ma trận so sánh các track ứng viên tiềm năng.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '55.6%', width: '22.2%' }}>
                  <div className="bar bar-s2">Tổng hợp track ứng viên</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Tổng hợp phân tích track ứng viên</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 13-14/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Chốt danh sách 2 track ứng viên chính dựa trên thế mạnh của team và mức độ cạnh tranh từ các đối thủ.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '77.8%', width: '11.1%' }}>
                  <div className="bar bar-s2">Rà soát đối thủ</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Quét &amp; đánh giá đối thủ (business)</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 15/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Khảo sát các đội đối thủ tiềm năng theo dữ liệu công khai, đánh giá quy mô thị trường và mức độ trùng ý tưởng ở 2 track ứng viên.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '88.9%', width: '11.1%' }}>
                  <div className="bar bar-s2">Chốt track</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Chốt &amp; Xác nhận track chính thức</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: Tối 16/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Sau khi rà soát đối thủ, team thống nhất chốt 1 trong 8 track, xác nhận tên đội/thành viên/track trên Platform trước 10:00 sáng 17/07 (theo quy định BTC).</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 9 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s3)' }}></span> K.AI (FE)</div>
              <div className="gantt-track" style={{ '--cols': 9 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '44.4%' }}>
                  <div className="bar bar-s3">Template slide</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Tham khảo pitch deck &amp; Chuẩn bị template</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 08-11/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Thu thập các slide thuyết trình hackathon thành công trước đây, thiết kế bộ layout slide khung.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '44.4%', width: '11.1%' }}>
                  <div className="bar bar-s3">W5 Pitching</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Tham dự Workshop Pitching</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 12/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Học hỏi phương pháp kể chuyện (storytelling) và cấu trúc trình bày dự án hackathon từ mentor BTC.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '55.6%', width: '22.2%' }}>
                  <div className="bar bar-s3">Hậu cần team</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Checklist hậu cần cá nhân &amp; team</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 13-14/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Chuẩn bị các vật dụng thiết yếu: sạc dự phòng, ổ điện kéo dài, túi ngủ, đồ ăn nhẹ cho 48h thi đấu.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '77.8%', width: '11.1%' }}>
                  <div className="bar bar-s3">Rà soát đối thủ</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Quét &amp; đánh giá đối thủ (design/demo)</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 15/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Xem lại sản phẩm/pitch của các mùa thi trước ở 2 track ứng viên, đánh giá chất lượng UI và cách kể chuyện của đối thủ tiềm năng.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '88.9%', width: '11.1%' }}>
                  <div className="bar bar-s3">Chốt track</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Chốt &amp; Xác nhận track chính thức</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: Tối 16/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Sau khi rà soát đối thủ, team thống nhất chốt 1 trong 8 track, xác nhận tên đội/thành viên/track trên Platform trước 10:00 sáng 17/07 (theo quy định BTC).</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gantt-row" style={{ '--cols': 9 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s5)' }}></span> Mai</div>
              <div className="gantt-track" style={{ '--cols': 9 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '33.3%' }}>
                  <div className="bar bar-s5">Research dữ liệu AI</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Research nguồn dữ liệu &amp; mô hình AI</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 08-10/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Khảo sát nguồn dữ liệu mở, mô hình AI/ML khả dụng cho từng track ứng viên.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '33.3%', width: '44.5%' }}>
                  <div className="bar bar-s5">Thử nghiệm mô hình mẫu</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Partner Session &amp; Thử nghiệm mô hình</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11-14/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Tham dự partner session kỹ thuật, thử nghiệm nhanh các mô hình/API AI của nhà tài trợ.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '77.8%', width: '22.2%' }}>
                  <div className="bar bar-s5">Rà soát &amp; Chốt track</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Rà soát đối thủ (AI) &amp; Chốt track</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 15-16/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Đánh giá độ khó kỹ thuật AI của đối thủ tiềm năng, thống nhất chốt track cùng cả team.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 9 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s6)' }}></span> Quang</div>
              <div className="gantt-track" style={{ '--cols': 9 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '33.3%' }}>
                  <div className="bar bar-s6">Research AI Agent</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Research framework AI Agent</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 08-10/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Tìm hiểu LangGraph/CrewAI và các framework AI Agent phù hợp với các track ứng viên.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '33.3%', width: '44.5%' }}>
                  <div className="bar bar-s6">Test API nhà tài trợ</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Partner Session &amp; Test API AI</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11-14/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Tham dự partner session, kiểm thử API AI của nhà tài trợ, đánh giá rate limit và yêu cầu bảo mật.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '77.8%', width: '22.2%' }}>
                  <div className="bar bar-s6">Rà soát &amp; Chốt track</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Rà soát bảo mật đối thủ &amp; Chốt track</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 15-16/07</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Đánh giá rủi ro bảo mật/kỹ thuật của đối thủ tiềm năng, thống nhất chốt track cùng cả team.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="axis-row">
              <div></div>
              <div className="axis-ticks" style={{ '--cols': 9 }}>
                <div className="axis-tick">08/07</div><div className="axis-tick">09/07</div><div className="axis-tick">10/07</div>
                <div className="axis-tick">11/07</div><div className="axis-tick">12/07</div><div className="axis-tick">13/07</div>
                <div className="axis-tick">14/07</div><div className="axis-tick">15/07</div><div className="axis-tick">16/07</div>
              </div>
            </div>

            <div className="gantt-phase-label" style={{ marginTop: '1.5294rem' }}>Ngày 1 — Thứ Sáu 17/07 (08:00–24:00)</div>
            <div className="gantt-row" style={{ '--cols': 16 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s4)' }}></span> Agenda</div>
              <div className="gantt-track" style={{ '--cols': 16 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '9.38%' }}>
                  <div className="bar bar-s4">Check-in</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Check-in</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 08:00-09:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Check-in và kích hoạt không gian sự kiện. Đội trưởng nhận túi đội thi thông qua quét mã QR trên thẻ tham dự.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '9.38%', width: '3.13%' }}>
                  <div className="bar bar-s4">Khai mạc</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Khai mạc</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 09:00-10:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Lễ khai mạc chính thức của VAIC 2026. * Thời gian dự kiến, có thể được điều chỉnh.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '18.75%', width: '3.13%' }}>
                  <div className="bar bar-s4">Track</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Công bố Track</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Công bố 08 track trên màn hình chính — mỗi track chính là 1 nhóm đề bài. Bắt đầu đếm ngược 48h thi đấu.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '25%', width: '3.13%' }}>
                  <div className="bar bar-s4">Genius Station</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Genius Station chính thức mở cửa</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 12:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>15–20 chuyên gia hỗ trợ liên tục 48 giờ theo ca xoay 8 giờ, bao phủ NLP, thị giác máy tính, AI agents, hạ tầng kỹ thuật, sản phẩm và UX.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '50%', width: '9.38%' }}>
                  <div className="bar bar-s4">Workshop</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Workshop nhà tài trợ</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 16:00-17:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Các workshop hướng dẫn công nghệ nâng cao diễn ra song song.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '62.5%', width: '9.38%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn tối tự chọn</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 18:00-19:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ăn tối tự chọn, nạp năng lượng tại khu ẩm thực NIC.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '71.88%', width: '9.38%' }}>
                  <div className="bar bar-s4">Giao lưu</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Giao lưu AI &amp; DJ</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 19:30-21:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Giao lưu faction, DJ ngoài trời gắn kết cộng đồng và xả stress.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '81.25%', width: '18.75%' }}>
                  <div className="bar bar-s4">Dev xuyên đêm</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Dev xuyên đêm + Night Owl Stream</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 21:00-05:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Đêm code đầu tiên. Ban tổ chức phát sóng giao lưu trực tiếp tại bàn các đội. Có Ask-Me-Anything Session 1 lúc 22:00-23:00.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 16 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s1)' }}></span> K.AI (PM)</div>
              <div className="gantt-track" style={{ '--cols': 16 }}>
                <div className="bar-wrapper" style={{ left: '18.75%', width: '18.75%' }}>
                  <div className="bar bar-s1">Phân tích đề &amp; Stack</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Phân tích đề &amp; Chọn stack</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00-14:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Phân tích đề bài cụ thể, chốt các framework sử dụng, cấu hình Git repo và chia module code.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '37.5%', width: '25%' }}>
                  <div className="bar bar-s1">Kiến trúc &amp; Skeleton</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Dựng kiến trúc &amp; Skeleton repo</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 14:00-18:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Viết khung code backend, cấu hình Docker, thiết lập CI/CD và kết nối các database cơ bản.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '62.5%', width: '9.38%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn tối tự chọn</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 18:00-19:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ăn tối tự chọn, nạp năng lượng tại khu ẩm thực NIC.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '81.25%', width: '18.75%' }}>
                  <div className="bar bar-s1">Code core</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Code core feature</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 21:00-24:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Lập trình các chức năng API cốt lõi, bắt đầu kết nối mô hình LLM chính.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 16 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s2)' }}></span> Quân</div>
              <div className="gantt-track" style={{ '--cols': 16 }}>
                <div className="bar-wrapper" style={{ left: '18.75%', width: '18.75%' }}>
                  <div className="bar bar-s2">User &amp; Bài toán</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Xác định user &amp; Bài toán</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00-14:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Vẽ chân dung người dùng, định vị vấn đề lớn nhất cần giải quyết của track đã chọn.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '37.5%', width: '25%' }}>
                  <div className="bar bar-s2">User flow &amp; Schema</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Viết user flow &amp; Data schema</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 14:00-18:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Vẽ sơ đồ trải nghiệm người dùng chi tiết, định hình cấu trúc dữ liệu gửi nhận giữa Front-Back.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '62.5%', width: '9.38%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn tối tự chọn</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 18:00-19:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ăn tối tự chọn, nạp năng lượng tại khu ẩm thực NIC.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '81.25%', width: '18.75%' }}>
                  <div className="bar bar-s2">Hỗ trợ test &amp; AI log</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hỗ trợ test &amp; Bắt đầu AI log</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 21:00-24:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Kiểm nghiệm thủ công các API thô của K.AI, ghi nhật ký tương tác AI đầu tiên.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 16 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s3)' }}></span> K.AI (FE)</div>
              <div className="gantt-track" style={{ '--cols': 16 }}>
                <div className="bar-wrapper" style={{ left: '18.75%', width: '18.75%' }}>
                  <div className="bar bar-s3">Wireframe nhanh</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Sketch wireframe nhanh</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00-14:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Vẽ phác thảo các màn hình chính lên giấy để thống nhất luồng UI với Quân.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '37.5%', width: '25%' }}>
                  <div className="bar bar-s3">UI Prototype</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Dựng UI Prototype</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 14:00-18:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Thiết kế giao diện trên Figma và sử dụng v0.dev để sinh nhanh các React Component UI.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '62.5%', width: '9.38%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn tối tự chọn</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 18:00-19:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ăn tối tự chọn, nạp năng lượng tại khu ẩm thực NIC.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '71.88%', width: '9.38%' }}>
                  <div className="bar bar-s3">Giao lưu</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Giao lưu — lấy cảm hứng pitch</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 19:30-21:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Trò chuyện với các đội thi khác để hiểu góc nhìn của họ, lấy ý tưởng cho bài pitch.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '81.25%', width: '18.75%' }}>
                  <div className="bar bar-s3">Hoàn thiện UI</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Tiếp tục hoàn thiện UI</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 21:00-24:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Làm mịn các nút, phối màu chủ đạo, chuẩn hoá các đoạn mã CSS Module để tích hợp vào code chính.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gantt-row" style={{ '--cols': 16 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s5)' }}></span> Mai</div>
              <div className="gantt-track" style={{ '--cols': 16 }}>
                <div className="bar-wrapper" style={{ left: '18.75%', width: '18.75%' }}>
                  <div className="bar bar-s5">Thu thập dữ liệu mẫu</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Thu thập &amp; chuẩn bị dữ liệu mẫu</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00-14:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Tìm và chuẩn bị dataset mẫu phù hợp với đề bài track vừa công bố.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '37.5%', width: '25%' }}>
                  <div className="bar bar-s5">Xây pipeline dữ liệu</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Xây dựng pipeline dữ liệu &amp; Vector DB</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 14:00-18:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Viết pipeline tiền xử lý dữ liệu, thiết lập Vector Database ban đầu cho RAG.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '62.5%', width: '9.38%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn tối tự chọn</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 18:00-19:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ăn tối tự chọn, nạp năng lượng tại khu ẩm thực NIC.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '81.25%', width: '18.75%' }}>
                  <div className="bar bar-s5">Thử mô hình đầu tiên</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Thử nghiệm mô hình AI đầu tiên</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 21:00-24:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Chạy thử mô hình/API AI đầu tiên trên dữ liệu mẫu đã chuẩn bị.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 16 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s6)' }}></span> Quang</div>
              <div className="gantt-track" style={{ '--cols': 16 }}>
                <div className="bar-wrapper" style={{ left: '18.75%', width: '18.75%' }}>
                  <div className="bar bar-s6">Thiết kế AI Agent</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Thiết kế kiến trúc AI Agent</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00-14:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Phác thảo luồng AI Agent xử lý logic nghiệp vụ cốt lõi (Core Business Flow).</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '37.5%', width: '25%' }}>
                  <div className="bar bar-s6">Cấu hình LLM provider</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Kết nối API AI &amp; cấu hình prompt khung</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 14:00-18:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Kết nối API AI (Claude/Gemini), thiết lập system prompt khung cho Agent.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '62.5%', width: '9.38%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn tối tự chọn</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 18:00-19:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ăn tối tự chọn, nạp năng lượng tại khu ẩm thực NIC.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '81.25%', width: '18.75%' }}>
                  <div className="bar bar-s6">Rà soát bảo mật key</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Rà soát bảo mật API key</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 21:00-24:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Kiểm tra không lộ API key/secrets trong code, cấu hình biến môi trường an toàn.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="axis-row">
              <div></div>
              <div className="axis-ticks" style={{ '--cols': 16 }}>
                <div className="axis-tick">08h</div><div className="axis-tick">09h</div><div className="axis-tick">10h</div><div className="axis-tick">11h</div>
                <div className="axis-tick">12h</div><div className="axis-tick">13h</div><div className="axis-tick">14h</div><div className="axis-tick">15h</div>
                <div className="axis-tick">16h</div><div className="axis-tick">17h</div><div className="axis-tick">18h</div><div className="axis-tick">19h</div>
                <div className="axis-tick">20h</div><div className="axis-tick">21h</div><div className="axis-tick">22h</div><div className="axis-tick">23h</div>
              </div>
            </div>

            <div className="gantt-phase-label" style={{ marginTop: '1.5294rem' }}>Ngày 2 — Thứ Bảy 18/07 (00:00–24:00)</div>
            <div className="gantt-row" style={{ '--cols': 24 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s4)' }}></span> Agenda</div>
              <div className="gantt-track" style={{ '--cols': 24 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '29.17%' }}>
                  <div className="bar bar-s4">Dev xuyên đêm</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Dev xuyên đêm (tiếp)</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 00:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Các đội thi tiếp tục code. Đồ ăn nhẹ và nước tăng lực được cung cấp tại sảnh NIC.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '29.17%', width: '8.33%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn sáng</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 07:00-09:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Phục vụ ăn sáng linh hoạt cho các thí sinh tại căng tin chính.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '37.5%', width: '6.25%' }}>
                  <div className="bar bar-s4">Mentor 1</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Mentor Room 1 (kỹ thuật)</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 09:00-16:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Rà soát kiến trúc kỹ thuật, chạy song song cả ngày với Mentor Room 2. Các đội cần đăng ký slot 20 phút trước ngày 16/07.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '41.67%', width: '8.33%' }}>
                  <div className="bar bar-critical">Checkpoint 1</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Checkpoint 1</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Nộp tên dự án và mô tả ngắn: project name, track/problem đã chọn, mô tả giải pháp và hướng tiếp cận ban đầu.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '66.67%', width: '6.25%' }}>
                  <div className="bar bar-s4">Mentor 2</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Mentor Room 2 (UX/business)</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 09:00-16:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Tham khảo góp ý từ các mentor về giao diện trải nghiệm người dùng và mô hình kinh doanh, chạy song song cả ngày với Mentor Room 1.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '75%', width: '6.25%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn tối &amp; hoạt động faction</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 18:00-19:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Hoạt động ăn tối giao lưu và trò chơi vận động nhẹ nhàng ngoài trời.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '87.5%', width: '8.33%' }}>
                  <div className="bar bar-critical">Checkpoint 2</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Checkpoint 2</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 23:00 (hạn chót)</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Nộp link demo hoạt động (live deployed URL) và link kho lưu trữ mã nguồn GitHub public.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '95.83%', width: '4.17%' }}>
                  <div className="bar bar-s4">Dev đêm cuối</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Dev đêm cuối</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 23:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Đêm chạy nước rút cuối cùng trước khi đóng cổng nộp bài chung cuộc. Có Ask-Me-Anything Session 2 lúc 23:00-24:00.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 24 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s1)' }}></span> K.AI (PM)</div>
              <div className="gantt-track" style={{ '--cols': 24 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '16.67%' }}>
                  <div className="bar bar-s1">Code core</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Code core feature</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 00:00-04:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Hoàn thiện các tính năng cốt lõi của API và xử lý dữ liệu AI.</div>
                  </div>
                </div>

                <div className="bar-wrapper past" style={{ left: '16.67%', width: '12.5%' }}>
                  <div className="bar bar-rest">Nghỉ ngơi</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Nghỉ ngắn</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 04:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Khung giờ nghỉ ngơi tái tạo sức lao động sau đêm dài code liên tục.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '29.17%', width: '8.33%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn sáng &amp; Review kiến trúc</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 07:00-09:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Họp nhanh với team, kiểm tra độ ổn định của server trước giờ checkpoint.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '37.5%', width: '6.25%' }}>
                  <div className="bar bar-s1">Mentor 1</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Trình bày kiến trúc với Mentor 1</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 09:00-10:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Giải trình sơ đồ kết nối API và tối ưu hóa xử lý truy vấn AI với Mentor.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '41.67%', width: '8.33%' }}>
                  <div className="bar bar-s1">Checkpoint 1</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Checkpoint 1</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 10:00-12:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Đóng gói mô tả kỹ thuật giải pháp để gửi cho Quân nộp bài.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '50%', width: '16.67%' }}>
                  <div className="bar bar-s1">Build &amp; Tích hợp AI</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Build tính năng lõi + Tích hợp AI</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 12:00-16:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Tập trung code kết nối Front-Back, xử lý các phản hồi từ mô hình ngôn ngữ lớn.</div>
                  </div>
                </div>

                <div className="bar-wrapper past" style={{ left: '75%', width: '6.25%' }}>
                  <div className="bar bar-rest">Nghỉ ngơi</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn tối &amp; Nghỉ ngắn</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 18:00-19:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ăn tối tự chọn rồi tranh thủ nghỉ ngơi ngắn để chuẩn bị thể lực cho đêm code cuối.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '87.5%', width: '8.33%' }}>
                  <div className="bar bar-s1">Deploy &amp; Submit C2</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Chuẩn bị deploy Checkpoint 2</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 21:00-23:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Deploy phiên bản ổn định nhất lên hosting, dọn dẹp mã nguồn để public repo GitHub.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '95.83%', width: '4.17%' }}>
                  <div className="bar bar-s1">Dev đêm cuối</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Dev đêm cuối</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 23:00-24:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Bắt đầu lập trình các tính năng phụ trợ nâng cao điểm số.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 24 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s2)' }}></span> Quân</div>
              <div className="gantt-track" style={{ '--cols': 24 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '16.67%' }}>
                  <div className="bar bar-s2">Test &amp; Viết AI log</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Test luồng + Viết AI log</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 00:00-04:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Kiểm thử đầu cuối (End-to-End), ghi nhận các lịch sử prompt và phản hồi AI.</div>
                  </div>
                </div>

                <div className="bar-wrapper past" style={{ left: '16.67%', width: '12.5%' }}>
                  <div className="bar bar-rest">Nghỉ ngơi</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Nghỉ ngơi</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 04:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Nghỉ ngơi lấy lại sức cùng K.AI.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '29.17%', width: '8.33%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn sáng</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 07:00-09:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Nạp năng lượng và thảo luận kế hoạch làm việc trong ngày.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '37.5%', width: '6.25%' }}>
                  <div className="bar bar-s2">Ghi chú Mentor 1</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ghi chú góp ý Mentor 1</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 09:00-10:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ghi chép toàn bộ khuyến nghị của Mentor Wave 1 để định hướng chỉnh sửa sản phẩm.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '41.67%', width: '8.33%' }}>
                  <div className="bar bar-s2">Chốt Checkpoint 1</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Checkpoint 1 — Chủ trì nộp bài</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 10:00-12:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Đại diện nhóm tải dữ liệu lên cổng thông tin Checkpoint 1 của BTC.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '50%', width: '16.67%' }}>
                  <div className="bar bar-s2">Data flow &amp; Thuyết minh</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hoàn thiện data flow &amp; Project description</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 12:00-16:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Soạn thảo tài liệu thuyết minh kiến trúc dữ liệu và mô tả giá trị cốt lõi sản phẩm.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '66.67%', width: '6.25%' }}>
                  <div className="bar bar-s2">Mentor Wave 2</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Mentor Wave 2 — Trình bày</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 16:00-17:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Trình bày khía cạnh kinh doanh và mô hình thực tế của sản phẩm trước Mentor.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '75%', width: '6.25%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn tối tự chọn</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 18:00-19:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ăn tối tự chọn.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '87.5%', width: '8.33%' }}>
                  <div className="bar bar-s2">Chốt Checkpoint 2</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Checkpoint 2 — Tổng hợp link nộp</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 21:00-23:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Đại diện nhóm nộp URL chạy thử và link Github public trước 23:00.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '95.83%', width: '4.17%' }}>
                  <div className="bar bar-s2">Viết AI log</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Viết AI collaboration log</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 23:00-24:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Cập nhật nhật ký cộng tác AI của ngày thứ 2.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 24 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s3)' }}></span> K.AI (FE)</div>
              <div className="gantt-track" style={{ '--cols': 24 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '16.67%' }}>
                  <div className="bar bar-s3">Tiếp tục UI</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Tiếp tục UI (ca đầu)</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 00:00-04:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Thiết kế các màn hình phụ và bảng thông số quản trị (Admin dashboard).</div>
                  </div>
                </div>

                <div className="bar-wrapper past" style={{ left: '16.67%', width: '12.5%' }}>
                  <div className="bar bar-rest">Nghỉ ngơi</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Nghỉ ngơi (bù đêm trước)</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 04:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Khung giờ nghỉ ngơi sâu để đảm bảo sức khỏe thiết kế cả ngày.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '29.17%', width: '8.33%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn sáng</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 07:00-09:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Nạp năng lượng cùng team trước giờ checkpoint.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '41.67%', width: '8.33%' }}>
                  <div className="bar bar-s3">Checkpoint 1</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Checkpoint 1</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 10:00-12:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Rà soát thông số thiết kế mockup để ghi nhận vào tài liệu nộp.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '50%', width: '16.67%' }}>
                  <div className="bar bar-s3">Tinh chỉnh UI &amp; Demo</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hoàn thiện UI/UX &amp; Demo flow</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 12:00-16:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Tinh chỉnh CSS Frontend trên mã nguồn backend thật của Quân, chốt luồng tương tác demo.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '66.67%', width: '6.25%' }}>
                  <div className="bar bar-s3">Mentor 2 (UX)</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Mentor Wave 2 — Trình bày UX</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 16:00-17:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Nhận góp ý cải thiện khả năng tương tác của UI và cách sắp xếp bố cục slide.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '75%', width: '6.25%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn tối và hoạt động faction</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 18:00-19:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ăn tối và giao lưu ngoài trời.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '87.5%', width: '8.33%' }}>
                  <div className="bar bar-s3">Outline slide &amp; Kịch bản</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Outline slide &amp; Kịch bản pitch</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 21:00-23:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Lên dàn bài slide chi tiết và viết kịch bản dẫn chuyện cho video demo.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '95.83%', width: '4.17%' }}>
                  <div className="bar bar-s3">Slide &amp; Pitching</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hoàn thiện slide</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 23:00-24:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Thiết kế các hiệu ứng slide, tập dượt thuyết trình nháp.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gantt-row" style={{ '--cols': 24 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s5)' }}></span> Mai</div>
              <div className="gantt-track" style={{ '--cols': 24 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '29.17%' }}>
                  <div className="bar bar-s5">Tinh chỉnh mô hình</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Tinh chỉnh prompt/RAG xuyên đêm</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 00:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Tinh chỉnh prompt và RAG, nghỉ ngơi luân phiên qua đêm.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '29.17%', width: '20.83%' }}>
                  <div className="bar bar-s5">Mentor 1 &amp; Checkpoint 1</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Trình bày phần AI với Mentor &amp; Checkpoint 1</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 07:00-12:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Trình bày phần AI với Mentor Wave 1, hỗ trợ chốt Checkpoint 1.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '50%', width: '25%' }}>
                  <div className="bar bar-s5">Đánh giá độ chính xác AI</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Đo lường độ chính xác mô hình</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 12:00-18:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Đo lường độ chính xác AI, chuẩn bị số liệu minh chứng cho AI Collaboration Log.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '75%', width: '25%' }}>
                  <div className="bar bar-s5">Tài liệu AI &amp; Checkpoint 2</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hoàn thiện tài liệu AI &amp; Checkpoint 2</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 18:00-24:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Viết tài liệu mô tả mô hình/pipeline AI, hỗ trợ nộp Checkpoint 2.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 24 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s6)' }}></span> Quang</div>
              <div className="gantt-track" style={{ '--cols': 24 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '29.17%' }}>
                  <div className="bar bar-s6">Ghép Agent vào Backend</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Tích hợp AI Agent vào Backend xuyên đêm</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 00:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ghép nối AI Agent với API Backend của Quân, nghỉ ngơi luân phiên qua đêm.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '29.17%', width: '20.83%' }}>
                  <div className="bar bar-s6">Mentor 1 &amp; Checkpoint 1</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Trình bày kiến trúc AI Agent &amp; Checkpoint 1</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 07:00-12:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Trình bày kiến trúc AI Agent với Mentor Wave 1, hỗ trợ chốt Checkpoint 1.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '50%', width: '25%' }}>
                  <div className="bar bar-s6">Kiểm thử tải &amp; bảo mật</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Test độ ổn định Agent &amp; bảo mật API</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 12:00-18:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Test độ ổn định Agent dưới tải, rà soát lỗ hổng bảo mật API.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '75%', width: '25%' }}>
                  <div className="bar bar-s6">Rà soát cuối &amp; Checkpoint 2</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Rà soát bảo mật lần cuối &amp; Checkpoint 2</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 18:00-24:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Rà soát bảo mật lần cuối trước checkpoint, hỗ trợ nộp Checkpoint 2.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="axis-row">
              <div></div>
              <div className="axis-ticks" style={{ '--cols': 24 }}>
                <div className="axis-tick">00h</div><div className="axis-tick">01h</div><div className="axis-tick">02h</div><div className="axis-tick">03h</div>
                <div className="axis-tick">04h</div><div className="axis-tick">05h</div><div className="axis-tick">06h</div><div className="axis-tick">07h</div>
                <div className="axis-tick">08h</div><div className="axis-tick">09h</div><div className="axis-tick">10h</div><div className="axis-tick">11h</div>
                <div className="axis-tick">12h</div><div className="axis-tick">13h</div><div className="axis-tick">14h</div><div className="axis-tick">15h</div>
                <div className="axis-tick">16h</div><div className="axis-tick">17h</div><div className="axis-tick">18h</div><div className="axis-tick">19h</div>
                <div className="axis-tick">20h</div><div className="axis-tick">21h</div><div className="axis-tick">22h</div><div className="axis-tick">23h</div>
              </div>
            </div>

            <div className="gantt-phase-label" style={{ marginTop: '1.5294rem' }}>Ngày 3 — Chủ Nhật 19/07 (00:00–17:00)</div>
            <div className="gantt-row" style={{ '--cols': 18 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s4)' }}></span> Agenda</div>
              <div className="gantt-track" style={{ '--cols': 18 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '38.89%' }}>
                  <div className="bar bar-s4">Dev đêm cuối</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Dev đêm cuối</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 00:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Ca làm việc đêm cuối cùng. Toàn bộ hạ tầng NIC Hòa Lạc hỗ trợ hết công suất.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '38.89%', width: '11.11%' }}>
                  <div className="bar bar-meal">Ăn uống</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ăn sáng &amp; Hoàn thiện nộp bài</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 07:00-09:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Chuẩn bị nộp bài chính thức, rà soát lại các tệp cấu hình.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '61.11%', width: '5.56%' }}>
                  <div className="bar bar-critical">HẠN CHÓT NỘP</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--critical)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hạn chót nộp bài</div>
                    <div style={{ color: 'var(--critical)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Đóng cổng nộp bài. Hệ thống tự động đóng cổng, không gia hạn.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '72.22%', width: '5.56%' }}>
                  <div className="bar bar-s4">Mở khu cộng đồng</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Mở cửa khu vực cộng đồng</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 10:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Khu vực mở dành cho cộng đồng bắt đầu hoạt động, đón khách tham quan. Lúc 14:00 có Expert Sharing — chia sẻ từ chuyên gia về cơ hội nghề nghiệp.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '83.33%', width: '2.78%' }}>
                  <div className="bar bar-s4">Top 10</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Công bố Top 10</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 15:30</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Công bố 10 đội vào chung kết trên màn hình chính.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '86.11%', width: '8.33%' }}>
                  <div className="bar bar-s4">Pitching Top 10</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Pitch trực tiếp</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 15:30-17:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Các đội xuất sắc thuyết trình trực tiếp trên sân khấu chính, phát sóng trực tiếp toàn quốc.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '94.44%', width: '5.56%' }}>
                  <div className="bar bar-s4">Lễ trao giải</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s4)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>BTC · Sự kiện</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Lễ trao giải</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 17:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Lễ trao giải — Chung kết sân khấu chính.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 18 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s1)' }}></span> K.AI (PM)</div>
              <div className="gantt-track" style={{ '--cols': 18 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '38.89%' }}>
                  <div className="bar bar-s1">Fix bug &amp; Deploy</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Sửa lỗi &amp; Ổn định demo</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 00:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Tập trung sửa các bug frontend cuối, kiểm tra lại luồng hoạt động chính, deploy bản build cuối cùng lên Vercel.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '38.89%', width: '11.11%' }}>
                  <div className="bar bar-s1">Check Git &amp; URL</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hỗ trợ đóng gói nộp bài</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 07:00-09:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Kiểm tra tính bảo mật của Git repo, đảm bảo live deployed URL chạy trơn tru.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '50%', width: '11.11%' }}>
                  <div className="bar bar-s1">Final Test</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Kiểm thử lần cuối</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 09:00-11:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Duyệt lại toàn bộ ứng dụng trên môi trường production thực tế.</div>
                  </div>
                </div>

                <div className="bar-wrapper past" style={{ left: '61.11%', width: '16.67%' }}>
                  <div className="bar bar-s1">Chờ kết quả</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Nghỉ ngơi / Chờ kết quả</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00-14:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Khung giờ nghỉ ngơi lấy sức sau 48h thi đấu căng thẳng.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '77.78%', width: '16.67%' }}>
                  <div className="bar bar-s1">Ôn câu hỏi phản biện</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s1)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · PM &amp; Pitching</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Ôn tập câu hỏi phản biện</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 14:00-17:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Chuẩn bị sẵn câu trả lời cho các câu hỏi kiến trúc hệ thống và sử dụng AI mà BGK có thể hỏi, trước khi lên sân khấu chính (15:30-17:00).</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 18 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s2)' }}></span> Quân</div>
              <div className="gantt-track" style={{ '--cols': 18 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '38.89%' }}>
                  <div className="bar bar-s2">AI log &amp; Docs</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hoàn thiện AI log &amp; Mô tả dự án</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 00:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Hoàn chỉnh file markdown mô tả dự án và làm sạch lịch sử collab log với AI.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '38.89%', width: '11.11%' }}>
                  <div className="bar bar-s2">Tổng hợp tệp</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Tổng hợp 5 hạng mục nộp bài</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 07:00-09:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Gom đủ slides, video, URL, repo và mô tả dự án vào thư mục nộp bài.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '50%', width: '11.11%' }}>
                  <div className="bar bar-s2">Nộp bài</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Nộp bài chính thức</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 09:00-11:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Thực hiện upload dữ liệu lên cổng của ban tổ chức, xác nhận nộp thành công.</div>
                  </div>
                </div>

                <div className="bar-wrapper past" style={{ left: '61.11%', width: '16.67%' }}>
                  <div className="bar bar-s2">Chờ kết quả</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Theo dõi, chờ kết quả</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00-14:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Nghỉ ngơi và theo dõi bảng điểm xếp hạng.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '77.78%', width: '16.67%' }}>
                  <div className="bar bar-s2">Hỗ trợ Q&amp;A sản phẩm</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s2)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quân · Backend &amp; DB</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hỗ trợ Q&amp;A kỹ thuật &amp; sản phẩm</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 14:00-17:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Sẵn sàng giải trình các câu hỏi kiến trúc hệ thống, định hướng kinh doanh và tính khả thi giải pháp trước BGK khi K.AI thuyết trình (15:30-17:00).</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 18 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s3)' }}></span> K.AI (FE)</div>
              <div className="gantt-track" style={{ '--cols': 18 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '38.89%' }}>
                  <div className="bar bar-s3">Slide &amp; Pitching</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hoàn thiện slide &amp; Kịch bản pitch</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 00:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Chốt slides cuối, tập dượt bài nói pitching nhịp nhàng theo thời gian giới hạn.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '38.89%', width: '11.11%' }}>
                  <div className="bar bar-s3">Quay dựng demo</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Quay &amp; Dựng video demo (≤5 phút)</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 07:00-09:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Quay màn hình sản phẩm thật, thu âm lồng tiếng thuyết minh và xuất video đúng quy định.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '50%', width: '11.11%' }}>
                  <div className="bar bar-s3">Submit video &amp; Slide</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Upload video &amp; Nộp slides</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 09:00-11:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Đẩy video lên Drive/Youtube chế độ không công khai và nộp link kèm slide.</div>
                  </div>
                </div>

                <div className="bar-wrapper past" style={{ left: '61.11%', width: '16.67%' }}>
                  <div className="bar bar-s3">Chờ kết quả</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Nghỉ ngơi / Chờ kết quả</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00-14:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Khung giờ nghỉ ngơi lấy sức, ôn lại kịch bản pitch. Khu vực cộng đồng mở cửa lúc 13:00.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '77.78%', width: '5.56%' }}>
                  <div className="bar bar-s3">Rehearsal cuối</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Tập dượt pitching lần cuối</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 14:00-15:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Tập dượt slide trên sân khấu phụ NIC để chuẩn bị tinh thần.</div>
                  </div>
                </div>

                <div className="bar-wrapper past" style={{ left: '83.33%', width: '2.78%' }}>
                  <div className="bar bar-s3">Chờ kết quả</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Theo dõi công bố Top 10</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 15:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Đón xem công bố kết quả lọt vòng chung kết trên màn hình chính.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '86.11%', width: '8.33%' }}>
                  <div className="bar bar-s3">Pitching Chung kết</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s3)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>K.AI · Frontend &amp; MKT</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Thuyết trình trên sân khấu chính</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 15:30-17:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Thuyết trình chính thức trước Hội đồng Giám khảo, phát sóng trực tiếp toàn quốc.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gantt-row" style={{ '--cols': 18 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s5)' }}></span> Mai</div>
              <div className="gantt-track" style={{ '--cols': 18 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '38.89%' }}>
                  <div className="bar bar-s5">Tài liệu mô hình AI</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hoàn thiện tài liệu mô hình AI</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 00:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Viết tài liệu mô tả pipeline/mô hình AI cho hồ sơ nộp bài.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '38.89%', width: '22.22%' }}>
                  <div className="bar bar-s5">Kiểm tra số liệu AI log</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Kiểm tra số liệu minh chứng AI</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 07:00-11:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Rà soát số liệu AI Collaboration Log trước khi nộp bài.</div>
                  </div>
                </div>

                <div className="bar-wrapper past" style={{ left: '61.11%', width: '16.67%' }}>
                  <div className="bar bar-s5">Chờ kết quả</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Nghỉ ngơi, chờ kết quả</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00-14:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Nghỉ ngơi lấy sức, theo dõi bảng điểm xếp hạng.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '77.78%', width: '22.22%' }}>
                  <div className="bar bar-s5">Hỗ trợ Q&amp;A AI</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s5)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mai · AI/ML & Data</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hỗ trợ Q&amp;A kỹ thuật AI/dữ liệu</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 14:00-17:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Sẵn sàng giải trình các câu hỏi về mô hình/dữ liệu AI trước BGK khi K.AI thuyết trình (15:30-17:00).</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gantt-row" style={{ '--cols': 18 }}>
              <div className="gantt-row-label"><span className="legend-dot" style={{ background: 'var(--s6)' }}></span> Quang</div>
              <div className="gantt-track" style={{ '--cols': 18 }}>
                <div className="bar-wrapper" style={{ left: '0%', width: '38.89%' }}>
                  <div className="bar bar-s6">Rà soát bảo mật cuối</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Rà soát bảo mật lần cuối</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 00:00-07:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Kiểm tra toàn bộ API key/secrets, đảm bảo không lộ trước khi public repo.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '38.89%', width: '22.22%' }}>
                  <div className="bar bar-s6">Test ổn định trước nộp</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Test ổn định Agent lần cuối</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 07:00-11:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Chạy test tải lần cuối, xác nhận AI Agent chạy ổn định trước khi nộp bài.</div>
                  </div>
                </div>

                <div className="bar-wrapper past" style={{ left: '61.11%', width: '16.67%' }}>
                  <div className="bar bar-s6">Chờ kết quả</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Nghỉ ngơi, chờ kết quả</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 11:00-14:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Nghỉ ngơi lấy sức, theo dõi bảng điểm xếp hạng.</div>
                  </div>
                </div>

                <div className="bar-wrapper" style={{ left: '77.78%', width: '22.22%' }}>
                  <div className="bar bar-s6">Hỗ trợ Q&amp;A Agent</div>
                  <div className="gantt-tooltip-css">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem', marginBottom: '0.3529rem' }}>
                      <span className="legend-dot" style={{ background: 'var(--s6)', width: '0.4706rem', height: '0.4706rem', borderRadius: '50%' }}></span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quang · AI Agent & API</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2353rem', color: 'var(--text-primary)' }}>Hỗ trợ Q&amp;A kỹ thuật Agent/bảo mật</div>
                    <div style={{ color: 'var(--s1)', fontWeight: 700, marginBottom: '0.3529rem', fontSize: '0.75rem' }}>Khung giờ: 14:00-17:00</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>Sẵn sàng giải trình các câu hỏi về AI Agent/bảo mật trước BGK khi K.AI thuyết trình (15:30-17:00).</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="axis-row">
              <div></div>
              <div className="axis-ticks" style={{ '--cols': 18 }}>
                <div className="axis-tick">00h</div><div className="axis-tick">01h</div><div className="axis-tick">02h</div><div className="axis-tick">03h</div>
                <div className="axis-tick">04h</div><div className="axis-tick">05h</div><div className="axis-tick">06h</div><div className="axis-tick">07h</div>
                <div className="axis-tick">08h</div><div className="axis-tick">09h</div><div className="axis-tick">10h</div><div className="axis-tick">11h</div>
                <div className="axis-tick">12h</div><div className="axis-tick">13h</div><div className="axis-tick">14h</div><div className="axis-tick">15h</div>
                <div className="axis-tick">16h</div><div className="axis-tick">17h</div>
              </div>
            </div>

          </div>
        </div>
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--s4)' }}></span> Agenda · Sự kiện chính</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--s1)' }}></span> K.AI · PM &amp; Pitching</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--s2)' }}></span> Quân · Backend &amp; Database</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--s3)' }}></span> K.AI · Frontend &amp; Marketing</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--s5)' }}></span> Mai · AI/ML &amp; Data</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--s6)' }}></span> Quang · AI Agent &amp; API/Security</div>
        </div>
        <div className="note">Ô mờ (opacity thấp) là khung nghỉ ngơi luân phiên — điều chỉnh theo thể trạng thực tế, luôn đảm bảo ít nhất 1 người thức khi cần xử lý sự cố. (Lâm — QA &amp; Hậu cần — hỗ trợ xuyên suốt cả 5 giai đoạn, xem chi tiết ở trang Phân công vai trò.)</div>
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
          <li><b>Ngân sách API/LLM:</b> Guidebook không xác nhận cấp API key/credit miễn phí đại trà — Cloud Credit ($2.000, FPT AI Factory) chỉ dành cho Top 5 sau khi thi, không phát trước cho ~150 đội. Team nên tự chuẩn bị sẵn tài khoản/API key riêng (OpenAI, Anthropic, Google...) trước 17/07, không trông chờ BTC/sponsor tài trợ toàn bộ chi phí LLM trong 48h. Xác nhận lại với BTC qua Group kết nối nếu cần chắc chắn.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
