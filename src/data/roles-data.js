export const philosophyNote = 'Team gồm 5 thành viên (theo hồ sơ đăng ký chính thức trên hub.aiforvietnam.org), mỗi người chủ trì mảng thế mạnh dựa trên kỹ năng thật và dùng AI tăng tốc, các thành viên còn lại hỗ trợ chéo để đảm bảo không ai bị cô lập.';

export const roleCards = [
  {
    name: 'K.AI',
    colorVar: '--s1',
    title: 'PM, Pitching & Frontend/UI-UX (Đội trưởng)',
    items: [
      { label: 'Chủ trì (60%)', text: 'Quản trị tiến độ chung (PM), soạn thảo slide thuyết trình, xây dựng kịch bản pitch và trực tiếp thuyết trình trước hội đồng giám khảo.' },
      { label: 'Chủ trì (25% FE & UI/UX)', text: 'Thiết kế giao diện, chuyển đổi thiết kế sang code React (Frontend) — tận dụng kỹ năng UI/UX & Web Development sẵn có.' },
      { label: 'Hỗ trợ (15%)', text: 'Điều phối chung giữa mảng AI (Mai, Quang) và Backend (Quân), tổng hợp AI Collaboration Log.' },
    ],
  },
  {
    name: 'Quân',
    colorVar: '--s2',
    title: 'Backend & Database',
    items: [
      { label: 'Chủ trì (80%)', text: 'Thiết kế cấu trúc cơ sở dữ liệu (Database Schema), lập trình logic API Backend, tích hợp API nhà tài trợ.' },
      { label: 'Hỗ trợ (20%)', text: 'Phối hợp với Mai/Quang để kết nối endpoint AI vào hệ thống, hỗ trợ K.AI viết tài liệu thuyết minh sản phẩm.' },
    ],
  },
  {
    name: 'Mai',
    colorVar: '--s5',
    title: 'AI/ML & Data Science',
    items: [
      { label: 'Chủ trì (80%)', text: 'Xây dựng pipeline dữ liệu, huấn luyện/tinh chỉnh mô hình AI/ML, thiết kế RAG & vector database — dựa trên kỹ năng AI/ML, Khoa học dữ liệu, Nghiên cứu.' },
      { label: 'Hỗ trợ (20%)', text: 'Phối hợp với Quang kiểm thử độ chính xác Agent, hỗ trợ Quân định dạng dữ liệu trả về từ API AI.' },
    ],
  },
  {
    name: 'Quang',
    colorVar: '--s6',
    title: 'AI Agent, API Integration & Security',
    items: [
      { label: 'Chủ trì (80%)', text: 'Thiết kế logic AI Agent, tích hợp API AI (LLM providers), rà soát bảo mật hệ thống — dựa trên kỹ năng AI/ML, API/Tích hợp hệ thống, Bảo mật.' },
      { label: 'Hỗ trợ (20%)', text: 'Phối hợp với Mai kiểm thử pipeline AI, hỗ trợ Quân bảo mật API Backend.' },
    ],
  },
  {
    name: 'Lâm',
    colorVar: '--s7',
    title: 'QA, Kiểm thử & Hậu cần',
    items: [
      { label: 'Chủ trì (70%)', text: 'Kiểm thử toàn hệ thống (QA), rà soát lỗi trước mỗi lần demo/checkpoint, chuẩn bị hậu cần đội trong 48h.' },
      { label: 'Hỗ trợ (30%)', text: 'Ghi chép AI Collaboration Log cùng K.AI, hỗ trợ chạy thử kịch bản demo trước giờ pitching.' },
    ],
  },
];

export const crossTableHeaders = ['Mốc thời gian phối hợp', 'K.AI (PM & Frontend)', 'Quân (Backend & DB)', 'Mai (AI/ML & Data)', 'Quang (AI Agent & API)', 'Lâm (QA & Hậu cần)'];

export const crossTableRows = [
  { milestone: 'Nhận đề & Brainstorm (D1, 11:00-14:00)', cells: [
    'Chủ trì định hướng chọn track, khung giải pháp và phác thảo nhanh wireframe UI',
    'Góp ý kiến trúc DB và API khả thi',
    'Đánh giá nguồn dữ liệu/mô hình AI khả dụng cho track',
    'Phác thảo kiến trúc AI Agent & các API AI cần tích hợp',
    'Chuẩn bị checklist hậu cần, ghi chú brainstorm',
  ] },
  { milestone: 'Dựng Prototype sơ bộ (D1, 14:00-19:00)', cells: [
    'Soạn thảo kịch bản demo, outline slide pitch và dựng thiết kế giao diện',
    'Thiết kế DB schema, dựng api mockup',
    'Xây dựng pipeline dữ liệu & thử nghiệm mô hình AI đầu tiên',
    'Dựng khung AI Agent, cấu hình kết nối LLM provider',
    'Kiểm thử sơ bộ luồng, ghi nhận lỗi ban đầu',
  ] },
  { milestone: 'Tích hợp Frontend & AI (D2, 09:00-15:00)', cells: [
    'Code giao diện React, kết nối API hiển thị, review bài thuyết trình với mentor',
    'Nhúng API AI, kết nối server Backend',
    'Tinh chỉnh mô hình/RAG theo phản hồi mentor',
    'Tích hợp Agent vào Backend, rà soát bảo mật API',
    'QA vòng 1: kiểm thử end-to-end, báo lỗi',
  ] },
  { milestone: 'Chuẩn bị Demo & Slide (D2, 16:00-21:00)', cells: [
    'Hoàn thiện giao diện FE mượt mà, tập dượt thuyết trình, hoàn thiện slide',
    'Deploy URL Backend, viết thuyết minh và log AI',
    'Chốt độ chính xác AI, chuẩn bị số liệu minh chứng',
    'Kiểm thử tải & độ ổn định Agent trước demo',
    'QA vòng 2, hỗ trợ chạy thử kịch bản demo',
  ] },
  { milestone: 'Đóng gói & Submit (D3, 07:00-11:00)', cells: [
    'Kiểm duyệt slides, quay demo video (≤5 phút), rehearsal bài pitching lần cuối',
    'Nộp mô tả dự án & link repo GitHub công khai',
    'Hoàn thiện tài liệu mô tả mô hình/pipeline AI',
    'Rà soát bảo mật lần cuối trước khi nộp bài',
    'Kiểm tra checklist nộp bài đầy đủ, hậu cần rehearsal',
  ] },
];

export const flowSteps = [
  { num: 1, title: 'Nhận đề bài', desc: '11:00 17/07 — Nghe giới thiệu 8 track, bối cảnh, tiêu chí chấm của BTC.' },
  { num: 2, title: 'Chọn track', desc: 'Cả team chốt track phù hợp năng lực & mối quan tâm nhanh chóng trước 12:00.' },
  { num: 3, title: 'Phát triển giải pháp', desc: 'Phân tích vấn đề → Build prototype → Tích hợp AI. Chia ca ngủ luân phiên qua 2 đêm.' },
  { num: 4, title: 'Mentoring & Tinh chỉnh', desc: 'Nhận phản hồi từ Mentor Wave 1 (kiến trúc) & Wave 2 (UX) để tinh chỉnh sản phẩm.' },
  { num: 5, title: 'Nộp bài & Pitch', desc: 'Nộp đủ 5 hạng mục trước 11:00 19/07. Sẵn sàng Pitch trực tiếp nếu lọt Top 10.' },
];
