import React from 'react';

const AI_ACTIVE_SEGMENTS = [
  // Day 1 (17/07)
  [
    { start: 0, end: 11, type: 'inactive' },
    { start: 11, end: 14.5, type: 'active' },
    { start: 14.5, end: 16, type: 'limit' },
    { start: 16, end: 19.5, type: 'active' },
    { start: 19.5, end: 21, type: 'limit' },
    { start: 21, end: 24, type: 'active' }
  ],
  // Day 2 (18/07)
  [
    { start: 0, end: 0.5, type: 'active' },
    { start: 0.5, end: 2, type: 'limit' },
    { start: 2, end: 5.5, type: 'active' },
    { start: 5.5, end: 7, type: 'limit' },
    { start: 7, end: 10.5, type: 'active' },
    { start: 10.5, end: 12, type: 'limit' },
    { start: 12, end: 15.5, type: 'active' },
    { start: 15.5, end: 17, type: 'limit' },
    { start: 17, end: 20.5, type: 'active' },
    { start: 20.5, end: 22, type: 'limit' },
    { start: 22, end: 24, type: 'active' }
  ],
  // Day 3 (19/07)
  [
    { start: 0, end: 1.5, type: 'active' },
    { start: 1.5, end: 3, type: 'limit' },
    { start: 3, end: 6.5, type: 'active' },
    { start: 6.5, end: 8, type: 'limit' },
    { start: 8, end: 11.5, type: 'active' },
    { start: 11.5, end: 13, type: 'limit' },
    { start: 13, end: 16.5, type: 'active' },
    { start: 16.5, end: 18, type: 'limit' },
    { start: 18, end: 21.5, type: 'active' },
    { start: 21.5, end: 23, type: 'limit' },
    { start: 23, end: 24, type: 'active' }
  ]
];

const formatHour = (val) => {
  const hours = Math.floor(val);
  const minutes = val % 1 === 0 ? '00' : '30';
  return `${String(hours).padStart(2, '0')}:${minutes}`;
};

function aiResetBars(dayIdx, ownerLabel, toolLabel) {
  return AI_ACTIVE_SEGMENTS[dayIdx].map((seg) => {
    let title = '';
    let barClass = '';
    let desc = '';
    
    if (seg.type === 'inactive') {
      title = 'Chờ Đề';
      barClass = 'bar-ai-inactive';
      desc = `Chưa công bố đề thi. Quota chưa được kích hoạt cho cuộc thi.`;
    } else if (seg.type === 'active') {
      title = 'AI Active';
      barClass = 'bar-good';
      desc = `Tài khoản trả phí ${toolLabel} hoạt động bình thường. Tập trung tận dụng tối đa để code core architecture, database schema, và prompt grounding.`;
    } else {
      title = '⏳ Limit';
      barClass = 'bar-ai-limit';
      desc = `Dự kiến chạm giới hạn sử dụng ${toolLabel}. Kế hoạch Backup: chuyển sang dùng tài khoản phụ Free, chia sẻ phiên làm việc (pair programming) với đồng đội chưa hết hạn, hoặc tập trung phân tích mã nguồn, kiểm thử, viết tài liệu thủ công để giữ tiến độ.`;
    }

    return {
      start: seg.start,
      duration: seg.end - seg.start,
      title: title,
      category: `${ownerLabel} · Trạng thái AI`,
      timeLabel: `Khung giờ: ${formatHour(seg.start)} - ${formatHour(seg.end)}`,
      desc: desc,
      barClass: barClass
    };
  });
}

function sharedAiResetBars(dayIdx) {
  return AI_ACTIVE_SEGMENTS[dayIdx].map((seg) => {
    let title = '';
    let barClass = '';
    let desc = '';
    
    if (seg.type === 'inactive') {
      title = 'Chờ Đề';
      barClass = 'bar-ai-inactive';
      desc = `Chưa công bố đề thi. Quota chưa được kích hoạt cho cuộc thi.`;
    } else if (seg.type === 'active') {
      title = 'AI Active';
      barClass = 'bar-good';
      desc = `Tài khoản trả phí hoạt động bình thường. Tập trung tận dụng tối đa để code core architecture, database schema, và prompt grounding.`;
    } else {
      title = '⏳ Limit';
      barClass = 'bar-ai-limit';
      desc = `Khoảng thời gian dự kiến các thành viên cạn quota tài khoản trả phí. Thực thi phương án chuyển đổi tài khoản (Free tier), chia sẻ token, hoặc thực hiện review chéo, chuẩn bị slide, thiết kế demo offline.`;
    }

    return {
      start: seg.start,
      duration: seg.end - seg.start,
      title: title,
      category: `Cả team · Trạng thái AI`,
      timeLabel: `Khung giờ: ${formatHour(seg.start)} - ${formatHour(seg.end)}`,
      desc: desc,
      barClass: barClass
    };
  });
}

export const scoringCriteria = [
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

export const ganttDays = [
  {
    date: '17/07',
    label: 'Ngày 1 — Thứ Sáu 17/07 (00:00–24:00)',
    cols: 24,
    axisTicks: [
      '00h', '02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'
    ],
    lanes: [
      {
        roleKey: 'agenda',
        roleLabel: 'Agenda',
        color: 'var(--s4)',
        bars: [
          { start: 8, duration: 1.5, title: 'Check-in', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 08:00-09:30', desc: 'Check-in và kích hoạt không gian sự kiện. Nhận túi quà thông qua thẻ QR code. BTC không hỗ trợ check-in sau 09:00.', barClass: 'bar-critical' },
          { start: 9.5, duration: 1, title: 'Khai mạc', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 09:30-10:30', desc: 'Lễ khai mạc chính thức của VAIC 2026 tại 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội.', barClass: 'bar-s4' },
          { start: 11, duration: 0.5, title: 'Đề bài', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 11:00', desc: 'Công bộ 8 track thi đấu chính thức trên hệ thống. Đếm ngược 48h bắt đầu.', barClass: 'bar-critical' },
          { start: 12, duration: 1, row: 0, title: 'Genius St.', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 12:00', desc: 'Genius Station mở cửa hỗ trợ kỹ thuật xoay ca liên tục 48 giờ.', barClass: 'bar-s4' },
          { start: 12, duration: 1, row: 1, title: 'Ăn trưa', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 12:00-13:00', desc: 'Thực đơn: Cơm sườn, dưa chuột, trái cây theo mùa.', barClass: 'bar-meal' },
          { start: 16, duration: 1.5, title: 'Workshop', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 16:00-17:30', desc: 'Các workshop kỹ thuật nâng cao từ nhà tài trợ công nghệ.', barClass: 'bar-s4' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Thực đơn: Cơm chiên Dương Châu, trứng ốp la, salad dưa chuột - cà chua, trái cây theo mùa.', barClass: 'bar-meal' },
          { start: 19.5, duration: 1.5, title: 'DJ Show', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 19:30-21:00', desc: 'Giao lưu DJ xả stress giữa các faction.', barClass: 'bar-s4' },
          { start: 21, duration: 3, title: 'Xuyên đêm', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 21:00-24:00', desc: 'Đêm code đầu tiên + Night Owl Stream từ Ban tổ chức.', barClass: 'bar-s4' }
        ]
      },
      {
        roleKey: 'ai-reset-all',
        roleLabel: 'Cửa sổ reset AI chung',
        color: 'var(--warning)',
        bars: sharedAiResetBars(0)
      },
      {
        roleKey: 'kai',
        roleLabel: 'K.AI',
        color: 'var(--s1)',
        bars: [
          { start: 0, duration: 8, title: 'Nghỉ ngơi', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 00:00-08:00', desc: 'Ngủ đủ giấc trước khi bước vào ca thi 72 giờ.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 8, duration: 3, title: 'Setup & Prep', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 08:00-11:00', desc: 'Chuẩn bị môi trường code, boilerplate React/Express, test Git repo.', barClass: 'bar-s1' },
          { start: 11, duration: 3, title: 'Phân tích đề & Stack', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 11:00-14:00', desc: 'Phân tích đề bài, chọn track tối ưu, thống nhất database schema.', barClass: 'bar-s1' },
          { start: 14, duration: 4, title: 'Backend Skeleton', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 14:00-18:00', desc: 'Dựng khung Express app, kết nối database, thiết lập Docker.', barClass: 'bar-s1' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Ăn tối nạp năng lượng.', barClass: 'bar-meal' },
          { start: 19.5, duration: 4.5, title: 'API Endpoints', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 19:30-24:00', desc: 'Viết core controllers, dựng API mock data để test chéo.', barClass: 'bar-s1' }
        ]
      },
      {
        roleKey: 'kai-reset',
        roleLabel: 'K.AI · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(0, 'K.AI', 'Claude Pro')
      },
      {
        roleKey: 'quan',
        roleLabel: 'Quân',
        color: 'var(--s2)',
        bars: [
          { start: 0, duration: 8, title: 'Nghỉ ngơi', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 00:00-08:00', desc: 'Nghỉ ngơi chuẩn bị cho 72h thi đấu.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 8, duration: 3, title: 'Setup UI kit', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 08:00-11:00', desc: 'Thiết lập UI Component kit, chuẩn bị theme & layouts.', barClass: 'bar-s2' },
          { start: 11, duration: 3, title: 'Wireframes', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 11:00-14:00', desc: 'Vẽ user flow, thiết kế giao diện wireframe thô của app.', barClass: 'bar-s2' },
          { start: 14, duration: 4, title: 'UI Router & Layouts', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 14:00-18:00', desc: 'Code cấu trúc router React, dàn layouts và header/footer.', barClass: 'bar-s2' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Nạp năng lượng.', barClass: 'bar-meal' },
          { start: 19.5, duration: 4.5, title: 'Core Pages', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 19:30-24:00', desc: 'Dựng khung các trang chính, gắn mock state.', barClass: 'bar-s2' }
        ]
      },
      {
        roleKey: 'quan-reset',
        roleLabel: 'Quân · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(0, 'Quân', 'Claude Max 5x')
      },
      {
        roleKey: 'mai',
        roleLabel: 'Mai',
        color: 'var(--s5)',
        bars: [
          { start: 0, duration: 8, title: 'Nghỉ ngơi', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 00:00-08:00', desc: 'Nghỉ ngơi trước ca thi.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 8, duration: 3, title: 'QC Checklist', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 08:00-11:00', desc: 'Cập nhật checklist, thiết lập Kanban board quản lý công việc.', barClass: 'bar-s5' },
          { start: 11, duration: 3, title: 'Tiêu chí QC', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 11:00-14:00', desc: 'Lập checklist tiêu chuẩn đầu ra cho API & UI tương thích.', barClass: 'bar-s5' },
          { start: 14, duration: 4, title: 'Test Data Setup', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 14:00-18:00', desc: 'Chuẩn bị tập test data đầu vào cho AI model và API endpoint.', barClass: 'bar-s5' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Ăn tối.', barClass: 'bar-meal' },
          { start: 19.5, duration: 4.5, title: 'Test Scripts', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 19:30-24:00', desc: 'Viết các test script tự động để kiểm tra API JSON contract.', barClass: 'bar-s5' }
        ]
      },
      {
        roleKey: 'mai-reset',
        roleLabel: 'Mai · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(0, 'Mai', 'Gemini Pro')
      },
      {
        roleKey: 'quang',
        roleLabel: 'Quang',
        color: 'var(--s6)',
        bars: [
          { start: 0, duration: 8, title: 'Nghỉ ngơi', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 00:00-08:00', desc: 'Nghỉ ngơi hồi phục.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 8, duration: 3, title: 'LLM API Tests', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 08:00-11:00', desc: 'Kiểm tra API keys, test quota và đo latency các provider.', barClass: 'bar-s6' },
          { start: 11, duration: 3, title: 'AI Feasibility', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 11:00-14:00', desc: 'Đánh giá các giải pháp AI khả thi, đề xuất grounding schema.', barClass: 'bar-s6' },
          { start: 14, duration: 4, title: 'AI Agent Service', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 14:00-18:00', desc: 'Viết core logic kết nối LLM, cài đặt Vector DB cho RAG.', barClass: 'bar-s6' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Ăn tối.', barClass: 'bar-meal' },
          { start: 19.5, duration: 4.5, title: 'Prompt Config', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 19:30-24:00', desc: 'Dựng System Prompt chính, cấu hình input validation.', barClass: 'bar-s6' }
        ]
      },
      {
        roleKey: 'quang-reset',
        roleLabel: 'Quang · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(0, 'Quang', 'Claude Pro')
      },
      {
        roleKey: 'lam',
        roleLabel: 'Lâm',
        color: 'var(--s7)',
        bars: [
          { start: 0, duration: 8, title: 'Nghỉ ngơi', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 00:00-08:00', desc: 'Chuẩn bị năng lượng cho 72h.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 8, duration: 3, title: 'HW & Net check', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 08:00-11:00', desc: 'Setup máy chủ demo, kiểm tra độ ổn định đường truyền mạng.', barClass: 'bar-s7' },
          { start: 11, duration: 3, title: 'Arch Security', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 11:00-14:00', desc: 'Đánh giá rủi ro kiến trúc, chốt mô hình CV/máy học bổ trợ.', barClass: 'bar-s7' },
          { start: 14, duration: 4, title: 'Model Inference', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 14:00-18:00', desc: 'Chạy thử mô hình Computer Vision cục bộ trên máy demo.', barClass: 'bar-s7' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Ăn tối.', barClass: 'bar-meal' },
          { start: 19.5, duration: 4.5, title: 'API Pentest', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 19:30-24:00', desc: 'Chạy quét bảo mật cơ bản trên các API backend thô đầu tiên.', barClass: 'bar-s7' }
        ]
      },
      {
        roleKey: 'lam-reset',
        roleLabel: 'Lâm · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(0, 'Lâm', 'Claude Pro')
      },
      {
        roleKey: 'yen',
        roleLabel: 'Yến',
        color: 'var(--s8)',
        bars: [
          { start: 0, duration: 8, title: 'Nghỉ ngơi', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 00:00-08:00', desc: 'Nghỉ ngơi.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 8, duration: 3, title: 'Guidebook prep', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 08:00-11:00', desc: 'Đọc lại tiêu chí chấm điểm, rà soát đề thi năm ngoái.', barClass: 'bar-s8' },
          { start: 11, duration: 3, title: 'Biz Matrix', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 11:00-14:00', desc: 'Định hình business case tiềm năng cho từng track thi.', barClass: 'bar-s8' },
          { start: 14, duration: 4, title: 'Deck Skeleton', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 14:00-18:00', desc: 'Lên cấu trúc các slide thuyết trình, thiết kế concept slide.', barClass: 'bar-s8' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Ăn tối.', barClass: 'bar-meal' },
          { start: 19.5, duration: 4.5, title: 'Market Research', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 19:30-24:00', desc: 'Nghiên cứu thị trường và đối thủ để đưa số liệu vào slide.', barClass: 'bar-s8' }
        ]
      },
      {
        roleKey: 'yen-reset',
        roleLabel: 'Yến · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(0, 'Yến', 'Gemini Pro')
      }
    ]
  },
  {
    date: '18/07',
    label: 'Ngày 2 — Thứ Bảy 18/07 (00:00–24:00)',
    cols: 24,
    axisTicks: [
      '00h', '02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'
    ],
    lanes: [
      {
        roleKey: 'agenda',
        roleLabel: 'Agenda',
        color: 'var(--s4)',
        bars: [
          { start: 0, duration: 5, title: 'Xuyên đêm', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 00:00-05:00', desc: 'Đêm code đầu tiên tiếp tục.', barClass: 'bar-s4' },
          { start: 7.5, duration: 1, title: 'Ăn sáng', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 07:30-08:30', desc: 'Thực đơn: Bánh mì thập cẩm thịt.', barClass: 'bar-meal' },
          { start: 10, duration: 2, title: 'Checkpoint 1', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 10:00-12:00', desc: 'Nộp tên dự án và mô tả ngắn (bắt buộc).', barClass: 'bar-critical' },
          { start: 12, duration: 1.5, title: 'Ăn trưa', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 12:00-13:30', desc: 'Thực đơn: Cơm gà kho, dưa chua, trái cây theo mùa.', barClass: 'bar-meal' },
          { start: 15, duration: 2, title: 'Mentor W1', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 15:00-17:00', desc: 'Mentor Wave 1 rà soát tại bàn các đội thi.', barClass: 'bar-s4' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Thực đơn: Cơm bò xào hoặc bò hầm tiêu.', barClass: 'bar-meal' },
          { start: 21, duration: 2, title: 'Checkpoint 2', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 21:00-23:00', desc: 'Nộp link GitHub Repo và live link (bắt buộc).', barClass: 'bar-critical' },
          { start: 23, duration: 1, title: 'Chăm sóc YT', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 23:00-24:00', desc: 'Đội ngũ y tế túc trực chăm sóc sức khoẻ.', barClass: 'bar-s4' }
        ]
      },
      {
        roleKey: 'ai-reset-all',
        roleLabel: 'Cửa sổ reset AI chung',
        color: 'var(--warning)',
        bars: sharedAiResetBars(1)
      },
      {
        roleKey: 'kai',
        roleLabel: 'K.AI',
        color: 'var(--s1)',
        bars: [
          { start: 0, duration: 5, title: 'Night Coding', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 00:00-05:00', desc: 'Hiện thực hóa các API Core, củng cố database schema.', barClass: 'bar-s1' },
          { start: 5, duration: 4.5, title: 'Nghỉ ngơi', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 05:00-09:30', desc: 'Ngủ hồi phục sức khoẻ.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 9.5, duration: 2.5, title: 'Submit CP1 & DB', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 09:30-12:00', desc: 'Cùng Yến submit mô tả, tối ưu hoá các trigger/index DB.', barClass: 'bar-s1' },
          { start: 12, duration: 1, title: 'Ăn trưa', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 12:00-13:00', desc: 'Nghỉ trưa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'FE Integration', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Hỗ trợ Quân kết nối UI của frontend với backend API.', barClass: 'bar-s1' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Ăn tối.', barClass: 'bar-meal' },
          { start: 19.5, duration: 4.5, title: 'API Integration', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 19:30-24:00', desc: 'Tích hợp AI service endpoints, rà soát bảo mật SQL.', barClass: 'bar-s1' }
        ]
      },
      {
        roleKey: 'kai-reset',
        roleLabel: 'K.AI · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(1, 'K.AI', 'Claude Pro')
      },
      {
        roleKey: 'quan',
        roleLabel: 'Quân',
        color: 'var(--s2)',
        bars: [
          { start: 0, duration: 5, title: 'Night Coding', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 00:00-05:00', desc: 'Code toàn bộ component giao diện động, CSS styling.', barClass: 'bar-s2' },
          { start: 5, duration: 4.5, title: 'Nghỉ ngơi', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 05:00-09:30', desc: 'Ngủ hồi phục.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 9.5, duration: 2.5, title: 'Mock Integrations', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 09:30-12:00', desc: 'Đổ mock data vào các trang, test giao diện responsive.', barClass: 'bar-s2' },
          { start: 12, duration: 1, title: 'Ăn trưa', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 12:00-13:00', desc: 'Ăn trưa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'API Wireup', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Kết nối Fetch API thực tế từ backend của K.AI.', barClass: 'bar-s2' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Ăn tối.', barClass: 'bar-meal' },
          { start: 19.5, duration: 4.5, title: 'Animations & UX', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 19:30-24:00', desc: 'Cải tiến UX, thêm hiệu ứng, kiểm tra mobile layout.', barClass: 'bar-s2' }
        ]
      },
      {
        roleKey: 'quan-reset',
        roleLabel: 'Quân · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(1, 'Quân', 'Claude Max 5x')
      },
      {
        roleKey: 'mai',
        roleLabel: 'Mai',
        color: 'var(--s5)',
        bars: [
          { start: 0, duration: 5, title: 'QC & Progress', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 00:00-05:00', desc: 'Báo lỗi code nhanh qua GitHub, cập nhật Kanban board.', barClass: 'bar-s5' },
          { start: 5, duration: 4.5, title: 'Nghỉ ngơi', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 05:00-09:30', desc: 'Ngủ nghỉ.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 9.5, duration: 2.5, title: 'QC Round 1', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 09:30-12:00', desc: 'Tiến hành test các API độc lập và logic giao diện.', barClass: 'bar-s5' },
          { start: 12, duration: 1, title: 'Ăn trưa', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 12:00-13:00', desc: 'Ăn trưa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'E2E Testing', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Chạy test kịch bản đầu cuối (E2E), ghi nhận phản hồi lỗi.', barClass: 'bar-s5' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Ăn tối.', barClass: 'bar-meal' },
          { start: 19.5, duration: 4.5, title: 'Trace logs', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 19:30-24:00', desc: 'Soát log lỗi, tổng hợp hiệu năng API gửi K.AI tối ưu.', barClass: 'bar-s5' }
        ]
      },
      {
        roleKey: 'mai-reset',
        roleLabel: 'Mai · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(1, 'Mai', 'Gemini Pro')
      },
      {
        roleKey: 'quang',
        roleLabel: 'Quang',
        color: 'var(--s6)',
        bars: [
          { start: 0, duration: 5, title: 'Prompt Tuning', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 00:00-05:00', desc: 'Thử nghiệm prompt trong các trường hợp phức tạp, tinh chỉnh RAG.', barClass: 'bar-s6' },
          { start: 5, duration: 4.5, title: 'Nghỉ ngơi', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 05:00-09:30', desc: 'Ngủ nghỉ.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 9.5, duration: 2.5, title: 'AI Integration', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 09:30-12:00', desc: 'Kết nối AI service trực tiếp vào cổng Backend.', barClass: 'bar-s6' },
          { start: 12, duration: 1, title: 'Ăn trưa', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 12:00-13:00', desc: 'Ăn trưa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'Model testing', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Đo lường độ tin cậy kết quả của Agent, giảm ảo giác.', barClass: 'bar-s6' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Ăn tối.', barClass: 'bar-meal' },
          { start: 19.5, duration: 4.5, title: 'System prompts', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 19:30-24:00', desc: 'Cố định prompts, tối ưu hoá chi phí token.', barClass: 'bar-s6' }
        ]
      },
      {
        roleKey: 'quang-reset',
        roleLabel: 'Quang · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(1, 'Quang', 'Claude Pro')
      },
      {
        roleKey: 'lam',
        roleLabel: 'Lâm',
        color: 'var(--s7)',
        bars: [
          { start: 0, duration: 5, title: 'CV Inference', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 00:00-05:00', desc: 'Optimize mô hình CV chạy mượt trên thiết bị phần cứng.', barClass: 'bar-s7' },
          { start: 5, duration: 4.5, title: 'Nghỉ ngơi', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 05:00-09:30', desc: 'Ngủ nghỉ.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 9.5, duration: 2.5, title: 'Security audit', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 09:30-12:00', desc: 'Rà quét mã độc, quét lỗi API endpoints mới viết.', barClass: 'bar-s7' },
          { start: 12, duration: 1, title: 'Ăn trưa', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 12:00-13:00', desc: 'Ăn trưa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'System pentest', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Thử nghiệm tấn công xâm nhập (pentest), rà bảo mật JWT.', barClass: 'bar-s7' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Ăn tối.', barClass: 'bar-meal' },
          { start: 19.5, duration: 4.5, title: 'Vuln patching', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 19:30-24:00', desc: 'Vá các lỗ hổng bảo mật phát hiện được, phân quyền DB.', barClass: 'bar-s7' }
        ]
      },
      {
        roleKey: 'lam-reset',
        roleLabel: 'Lâm · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(1, 'Lâm', 'Claude Pro')
      },
      {
        roleKey: 'yen',
        roleLabel: 'Yến',
        color: 'var(--s8)',
        bars: [
          { start: 0, duration: 5, title: 'Nghỉ ngơi', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 00:00-05:00', desc: 'Giữ sức khoẻ phục vụ pitching.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 5, duration: 4.5, title: 'Nghỉ ngơi', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 05:00-09:30', desc: 'Ngủ nghỉ.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 9.5, duration: 2.5, title: 'Submit CP1 & Case', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 09:30-12:00', desc: 'Nộp thông tin Checkpoint 1, hoàn thiện value proposition.', barClass: 'bar-s8' },
          { start: 12, duration: 1, title: 'Ăn trưa', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 12:00-13:00', desc: 'Ăn trưa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'Mentor feedback', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Gặp mentor Wave 1 xin góp ý về mô hình kinh doanh & slide.', barClass: 'bar-s8' },
          { start: 18, duration: 1.5, title: 'Ăn tối', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 18:00-19:30', desc: 'Ăn tối.', barClass: 'bar-meal' },
          { start: 19.5, duration: 4.5, title: 'Slide design sync', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 19:30-24:00', desc: 'Đồng bộ hóa giao diện slide với CSS palette của Quân.', barClass: 'bar-s8' }
        ]
      },
      {
        roleKey: 'yen-reset',
        roleLabel: 'Yến · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(1, 'Yến', 'Gemini Pro')
      }
    ]
  },
  {
    date: '19/07',
    label: 'Ngày 3 — Chủ Nhật 19/07 (00:00–24:00)',
    cols: 24,
    axisTicks: [
      '00h', '02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'
    ],
    lanes: [
      {
        roleKey: 'agenda',
        roleLabel: 'Agenda',
        color: 'var(--s4)',
        bars: [
          { start: 0, duration: 4, title: 'Xuyên đêm', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 00:00-04:00', desc: 'Đêm code thứ hai chạy nước rút.', barClass: 'bar-s4' },
          { start: 7.5, duration: 1, row: 1, title: 'Ăn sáng', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 07:30-08:30', desc: 'Thực đơn: Xôi pate chả ruốc, dưa hành.', barClass: 'bar-meal' },
          { start: 8, duration: 3, row: 0, title: 'Code Freeze', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 08:00-11:00', desc: '11:00 Đóng cổng nộp bài, khoá toàn bộ GitHub và live link.', barClass: 'bar-critical' },
          { start: 12, duration: 1, title: 'Ăn trưa', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 12:00-13:00', desc: 'Thực đơn: Hamburger, trái cây theo mùa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'Demo prep', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Chuẩn bị không gian demo tại bàn thi.', barClass: 'bar-s4' },
          { start: 18, duration: 6, title: 'Pitch & Bế mạc', category: 'BTC · Sự kiện', timeLabel: 'Khung giờ: 18:00-24:00', desc: 'Pitching chính thức trước Hội đồng Giám khảo, công bố kết quả và Bế mạc.', barClass: 'bar-critical' }
        ]
      },
      {
        roleKey: 'ai-reset-all',
        roleLabel: 'Cửa sổ reset AI chung',
        color: 'var(--warning)',
        bars: sharedAiResetBars(2)
      },
      {
        roleKey: 'kai',
        roleLabel: 'K.AI',
        color: 'var(--s1)',
        bars: [
          { start: 0, duration: 4, title: 'Deploy production', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 00:00-04:00', desc: 'Deploy app lên Vercel/Render, chạy giả lập tải cao.', barClass: 'bar-s1' },
          { start: 4, duration: 4.5, title: 'Nghỉ ngơi', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 04:00-08:30', desc: 'Nghỉ ngơi dưỡng sức.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 8.5, duration: 2.5, title: 'Final submit', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 08:30-11:00', desc: 'Nén DB backup, kiểm tra commit cuối và submit bài thi.', barClass: 'bar-s1' },
          { start: 11, duration: 2, title: 'Ăn trưa', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 11:00-13:00', desc: 'Ăn trưa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'Q&A Practice', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Tập trả lời phản biện cùng Yến, rà soát lại log AI.', barClass: 'bar-s1' },
          { start: 18, duration: 6, title: 'Pitch Support', category: 'K.AI · PM & Backend', timeLabel: 'Khung giờ: 18:00-24:00', desc: 'Hỗ trợ Yến trả lời các câu hỏi sâu về kỹ thuật của BGK.', barClass: 'bar-s1' }
        ]
      },
      {
        roleKey: 'kai-reset',
        roleLabel: 'K.AI · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(2, 'K.AI', 'Claude Pro')
      },
      {
        roleKey: 'quan',
        roleLabel: 'Quân',
        color: 'var(--s2)',
        bars: [
          { start: 0, duration: 4, title: 'UX polish', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 00:00-04:00', desc: 'Đánh bóng UI, check responsive lần cuối, fix CSS vặt.', barClass: 'bar-s2' },
          { start: 4, duration: 4.5, title: 'Nghỉ ngơi', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 04:00-08:30', desc: 'Nghỉ ngơi.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 8.5, duration: 2.5, title: 'Asset packages', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 08:30-11:00', desc: 'Xuất bản vẽ, kiểm tra logo, check slide hiển thị ok.', barClass: 'bar-s2' },
          { start: 11, duration: 2, title: 'Ăn trưa', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 11:00-13:00', desc: 'Ăn trưa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'Demo visuals', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Chuẩn bị demo video dự phòng, setup máy chiếu tại bàn.', barClass: 'bar-s2' },
          { start: 18, duration: 6, title: 'UI Demo', category: 'Quân · Frontend & UI/UX', timeLabel: 'Khung giờ: 18:00-24:00', desc: 'Trực tiếp thao tác trên app khi Yến pitching trước BGK.', barClass: 'bar-s2' }
        ]
      },
      {
        roleKey: 'quan-reset',
        roleLabel: 'Quân · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(2, 'Quân', 'Claude Max 5x')
      },
      {
        roleKey: 'mai',
        roleLabel: 'Mai',
        color: 'var(--s5)',
        bars: [
          { start: 0, duration: 4, title: 'QC Round 2', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 00:00-04:00', desc: 'Chạy kiểm thử tải giả lập, check chéo chính tả tài liệu.', barClass: 'bar-s5' },
          { start: 4, duration: 4.5, title: 'Nghỉ ngơi', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 04:00-08:30', desc: 'Nghỉ ngơi.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 8.5, duration: 2.5, title: 'QC Checklist', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 08:30-11:00', desc: 'Duyệt checklist nộp bài, xác nhận đủ 5 hạng mục bắt buộc.', barClass: 'bar-s5' },
          { start: 11, duration: 2, title: 'Ăn trưa', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 11:00-13:00', desc: 'Ăn trưa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'Metric logs', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Trích xuất logs thời gian phản hồi, tỉ lệ chính xác để chèn slide.', barClass: 'bar-s5' },
          { start: 18, duration: 6, title: 'Pitch support', category: 'Mai · QC & Hiệu suất', timeLabel: 'Khung giờ: 18:00-24:00', desc: 'Cung cấp số liệu kiểm thử thực tế nếu BGK hỏi sâu.', barClass: 'bar-s5' }
        ]
      },
      {
        roleKey: 'mai-reset',
        roleLabel: 'Mai · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(2, 'Mai', 'Gemini Pro')
      },
      {
        roleKey: 'quang',
        roleLabel: 'Quang',
        color: 'var(--s6)',
        bars: [
          { start: 0, duration: 4, title: 'AI Benchmarks', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 00:00-04:00', desc: 'Kiểm tra độ trễ API AI Agent chặng cuối, tối ưu caching.', barClass: 'bar-s6' },
          { start: 4, duration: 4.5, title: 'Nghỉ ngơi', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 04:00-08:30', desc: 'Nghỉ ngơi.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 8.5, duration: 2.5, title: 'Freeze AI service', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 08:30-11:00', desc: 'Cố định prompt, đóng gói API AI cho K.AI submit.', barClass: 'bar-s6' },
          { start: 11, duration: 2, title: 'Ăn trưa', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 11:00-13:00', desc: 'Ăn trưa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'Demo prep', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Backup sẵn các prompt và dữ liệu RAG chạy local đề phòng mất mạng.', barClass: 'bar-s6' },
          { start: 18, duration: 6, title: 'Tech support', category: 'Quang · AI Core & Security', timeLabel: 'Khung giờ: 18:00-24:00', desc: 'Túc trực xử lý lỗi kết nối AI khi BGK chạy thử app.', barClass: 'bar-s6' }
        ]
      },
      {
        roleKey: 'quang-reset',
        roleLabel: 'Quang · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(2, 'Quang', 'Claude Pro')
      },
      {
        roleKey: 'lam',
        roleLabel: 'Lâm',
        color: 'var(--s7)',
        bars: [
          { start: 0, duration: 4, title: 'Clean secrets', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 00:00-04:00', desc: 'Xoá các API key thử nghiệm, cấu hình khóa môi trường production.', barClass: 'bar-s7' },
          { start: 4, duration: 4.5, title: 'Nghỉ ngơi', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 04:00-08:30', desc: 'Nghỉ ngơi.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 8.5, duration: 2.5, title: 'SSL & Sec check', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 08:30-11:00', desc: 'Check chứng chỉ SSL, phân quyền DB, đóng cổng truy cập test.', barClass: 'bar-s7' },
          { start: 11, duration: 2, title: 'Ăn trưa', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 11:00-13:00', desc: 'Ăn trưa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'Local DB backup', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Sao lưu DB dự phòng chạy offline trên máy demo.', barClass: 'bar-s7' },
          { start: 18, duration: 6, title: 'Tech support', category: 'Lâm · AI Core & Security', timeLabel: 'Khung giờ: 18:00-24:00', desc: 'Hỗ trợ kỹ thuật phần cứng và mạng demo.', barClass: 'bar-s7' }
        ]
      },
      {
        roleKey: 'lam-reset',
        roleLabel: 'Lâm · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(2, 'Lâm', 'Claude Pro')
      },
      {
        roleKey: 'yen',
        roleLabel: 'Yến',
        color: 'var(--s8)',
        bars: [
          { start: 0, duration: 6, title: 'Nghỉ ngơi', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 00:00-06:00', desc: 'Ngủ đủ giấc để giữ giọng và sự tập trung.', barClass: 'bar-rest', opacity: 0.6 },
          { start: 6, duration: 2.5, title: 'Rehearsal 1', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 06:00-08:30', desc: 'Chạy thử kịch bản nói chặng đầu, căn giờ slide.', barClass: 'bar-s8' },
          { start: 8.5, duration: 2.5, title: 'Submit slides', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 08:30-11:00', desc: 'Xuất PDF slides và nộp bài lên hệ thống VAIC.', barClass: 'bar-s8' },
          { start: 11, duration: 2, title: 'Ăn trưa', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 11:00-13:00', desc: 'Ăn trưa.', barClass: 'bar-meal' },
          { start: 13, duration: 5, title: 'Rehearsal Q&A', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 13:00-18:00', desc: 'Tổng duyệt pitching, chạy thử Q&A cùng cả team.', barClass: 'bar-s8' },
          { start: 18, duration: 6, title: 'Pitching Day', category: 'Yến · Business & Pitching', timeLabel: 'Khung giờ: 18:00-24:00', desc: 'Pitching chính thức trước BGK và bế mạc.', barClass: 'bar-s8' }
        ]
      },
      {
        roleKey: 'yen-reset',
        roleLabel: 'Yến · Reset AI',
        color: 'var(--warning)',
        bars: aiResetBars(2, 'Yến', 'Gemini Pro')
      }
    ]
  }
];
