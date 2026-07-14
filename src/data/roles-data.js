export const philosophyNote = 'Team gồm 6 thành viên (5 người theo hồ sơ đăng ký chính thức trên hub.aiforvietnam.org, bổ sung Yến — chuyên Business/Kinh doanh), mỗi người chủ trì mảng thế mạnh dựa trên kỹ năng thật và dùng AI tăng tốc, các thành viên còn lại hỗ trợ chéo để đảm bảo không ai bị cô lập.';

export const roleCards = [
  {
    name: 'K.AI',
    colorVar: '--s1',
    title: 'Đội trưởng, Tech Lead, Backend & Database, AI Plan',
    items: [
      { label: 'Chủ trì (40%)', text: 'Điều phối chung toàn team (đội trưởng), định hướng kiến trúc kỹ thuật tổng thể (Tech Lead), lên kế hoạch tích hợp AI (AI Plan).' },
      { label: 'Chủ trì (40%)', text: 'Thiết kế cấu trúc cơ sở dữ liệu (Database Schema), lập trình logic API Backend — dựa trên kỹ năng DevOps, Vibe Coding, Python sẵn có.' },
      { label: 'Hỗ trợ (20%)', text: 'Phối hợp Quân cung cấp API cho Frontend, phối hợp Quang/Lâm về endpoint AI Core & grounding.' },
    ],
  },
  {
    name: 'Quân',
    colorVar: '--s2',
    title: 'Frontend & UI/UX Design',
    items: [
      { label: 'Chủ trì (80%)', text: 'Thiết kế giao diện (UI/UX), chuyển đổi thiết kế sang code React (Frontend), đảm bảo trải nghiệm người dùng mượt mà — dựa trên kỹ năng UI/UX & Web Development sẵn có.' },
      { label: 'Hỗ trợ (20%)', text: 'Phối hợp K.AI kết nối API Backend vào giao diện, góp ý UX cho các luồng tương tác AI Agent.' },
    ],
  },
  {
    name: 'Mai',
    colorVar: '--s5',
    title: 'QC & Quản lý hiệu suất (PM)',
    items: [
      { label: 'Chủ trì (80%)', text: 'Kiểm soát chất lượng (QC) toàn bộ sản phẩm & quy trình, theo dõi tiến độ và quản lý hiệu suất làm việc của team — dựa trên nền tảng Chiến lược/Tài chính, phù hợp tư duy đo lường & tối ưu hiệu suất.' },
      { label: 'Hỗ trợ (20%)', text: 'Phối hợp K.AI báo cáo tiến độ chung, hỗ trợ Yến chuẩn bị số liệu minh chứng hiệu quả cho phần thuyết trình kinh doanh.' },
    ],
  },
  {
    name: 'Quang',
    colorVar: '--s6',
    title: 'AI Core, Grounding & Security/Pentest',
    items: [
      { label: 'Chủ trì (60%)', text: 'Xây dựng AI Agent/AI Core logic, thiết kế grounding (RAG) đảm bảo AI trả lời đúng ngữ cảnh — dựa trên kỹ năng AI/ML, API/Tích hợp hệ thống.' },
      { label: 'Chủ trì (30%)', text: 'Rà soát bảo mật, kiểm thử xâm nhập (Pentest) hệ thống trước mỗi lần nộp bài — dựa trên kỹ năng Bảo mật.' },
      { label: 'Hỗ trợ (10%)', text: 'Phối hợp Lâm chia việc AI Core & Security để không ai bị quá tải — cùng lớp, cùng trường với Lâm nên dễ đồng bộ tiến độ và trao đổi trực tiếp ngoài giờ code.' },
    ],
  },
  {
    name: 'Lâm',
    colorVar: '--s7',
    title: 'AI Core, Grounding & Security/Pentest (cùng Quang)',
    items: [
      { label: 'Chủ trì (60%)', text: 'Hỗ trợ xây dựng AI Core (Computer Vision/ML khi cần) và grounding dữ liệu — dựa trên kinh nghiệm thực tế PyTorch, OpenCV, YOLOv11 (dự án U-Mamba trình bày tại ICISN 2026).' },
      { label: 'Chủ trì (30%)', text: 'Pentest & kiểm thử bảo mật hệ thống — dựa trên nền tảng Network Security thực tế (DNS, Zero Trust, DoH/DoT/DoQ từ dự án Zero Trust DNS Server).' },
      { label: 'Hỗ trợ (10%)', text: 'Backup Quân về Web Development (React/Vite) khi cần gấp rút trước checkpoint — cùng lớp, cùng trường với Quang nên dễ đồng bộ tiến độ và trao đổi trực tiếp ngoài giờ code.' },
    ],
  },
  {
    name: 'Yến',
    colorVar: '--s8',
    title: 'Business, Pilot & Kinh doanh',
    items: [
      { label: 'Chủ trì (60%)', text: 'Xây dựng business case & market validation, phân tích tính khả thi kinh tế và mô hình kinh doanh của giải pháp — dựa trên kinh nghiệm Consulting Intern tại MCG Management Consulting (dự án digital transformation cho PVOIL, Canavi).' },
      { label: 'Chủ trì (25%)', text: 'Đồng hành cùng K.AI xây dựng luận điểm pitch, chuẩn bị phần trả lời phản biện hội đồng giám khảo — dựa trên kinh nghiệm CMO tại CHITOFLOW (Quán quân Business Venture Challenge 2026, Á quân I Impact 2026) và nhiều cuộc thi business case khác.' },
      { label: 'Hỗ trợ (15%)', text: 'Phối hợp Mai theo dõi tiến độ chung (PM), pilot thử nghiệm sản phẩm với góc nhìn người dùng/khách hàng thật.' },
    ],
  },
];

export const crossTableHeaders = ['Mốc thời gian phối hợp', 'K.AI (Tech Lead & Backend/DB)', 'Quân (Frontend & UI/UX)', 'Mai (QC & PM)', 'Quang (AI Core & Security)', 'Lâm (AI Core & Security)', 'Yến (Business & Pitching)'];

export const crossTableRows = [
  { milestone: 'Nhận đề & Brainstorm (D1, 11:00-14:00)', cells: [
    'Chủ trì định hướng chọn track, phác thảo kiến trúc kỹ thuật tổng thể (AI Plan, Backend/DB)',
    'Phác thảo wireframe UI, góp ý trải nghiệm người dùng cho từng hướng giải pháp',
    'Lên kế hoạch tiến độ (PM), xác định tiêu chí QC cho sản phẩm',
    'Đánh giá tính khả thi AI Agent & yêu cầu grounding cho từng track',
    'Đánh giá rủi ro bảo mật ban đầu, khảo sát mô hình AI/CV khả dụng',
    'Đánh giá tính khả thi kinh doanh & thị trường của từng hướng giải pháp, góp ý chọn track',
  ] },
  { milestone: 'Dựng Prototype sơ bộ (D1, 14:00-19:00)', cells: [
    'Thiết kế DB schema, dựng khung Backend & kế hoạch tích hợp AI',
    'Dựng giao diện React sơ bộ theo wireframe, thiết lập design system',
    'Theo dõi tiến độ từng đầu việc, chuẩn bị checklist QC',
    'Xây dựng khung AI Agent, cấu hình kết nối LLM provider',
    'Thử nghiệm mô hình AI/CV đầu tiên, khảo sát kiến trúc bảo mật',
    'Xây dựng business case sơ bộ, phác thảo luận điểm giá trị (value proposition)',
  ] },
  { milestone: 'Tích hợp Frontend & AI (D2, 09:00-15:00)', cells: [
    'Nhúng API AI vào Backend, kết nối Database, review kiến trúc tổng thể',
    'Code giao diện React hoàn chỉnh, kết nối API hiển thị dữ liệu',
    'QC vòng 1: kiểm thử end-to-end, báo lỗi, theo dõi tiến độ chung',
    'Tích hợp AI Agent vào Backend, xây dựng grounding (RAG) cho dữ liệu domain',
    'Pentest sơ bộ hệ thống, hỗ trợ Quang tinh chỉnh grounding',
    'Chuẩn bị nội dung thuyết minh mô hình kinh doanh, review cùng mentor Wave 2 (UX & kinh doanh)',
  ] },
  { milestone: 'Chuẩn bị Demo & Slide (D2, 16:00-21:00)', cells: [
    'Deploy Backend/DB, rà soát kiến trúc AI Plan lần cuối',
    'Hoàn thiện giao diện FE mượt mà, polish UI/UX trước demo',
    'QC vòng 2, tổng hợp báo cáo hiệu suất team, hỗ trợ chạy thử kịch bản demo',
    'Kiểm thử tải & độ ổn định AI Agent trước demo',
    'Pentest lần cuối, rà soát lỗ hổng bảo mật trước khi demo',
    'Cùng K.AI hoàn thiện kịch bản pitch, chuẩn bị trả lời phản biện giám khảo',
  ] },
  { milestone: 'Đóng gói & Submit (D3, 07:00-11:00)', cells: [
    'Nộp mô tả dự án & link repo GitHub công khai, kiểm tra kiến trúc tổng thể',
    'Kiểm duyệt giao diện lần cuối, hỗ trợ quay demo video (≤5 phút)',
    'Kiểm tra checklist nộp bài đầy đủ, tổng hợp báo cáo hiệu suất cuối cùng',
    'Rà soát AI Core & grounding lần cuối trước khi nộp bài',
    'Rà soát bảo mật lần cuối trước khi nộp bài',
    'Rà soát nội dung thuyết minh dự án, hỗ trợ rehearsal pitching lần cuối',
  ] },
];

export const flowSteps = [
  { num: 1, title: 'Nhận đề bài', desc: '11:00 17/07 — Nghe giới thiệu 8 track, bối cảnh, tiêu chí chấm của BTC.' },
  { num: 2, title: 'Chọn track', desc: 'Cả team chốt track phù hợp năng lực & mối quan tâm nhanh chóng trước 12:00.' },
  { num: 3, title: 'Phát triển giải pháp', desc: 'Phân tích vấn đề → Build prototype → Tích hợp AI. Chia ca ngủ luân phiên qua 2 đêm.' },
  { num: 4, title: 'Mentoring & Tinh chỉnh', desc: 'Nhận phản hồi từ Mentor Wave 1 (kiến trúc) & Wave 2 (UX) để tinh chỉnh sản phẩm.' },
  { num: 5, title: 'Nộp bài & Pitch', desc: 'Nộp đủ 5 hạng mục trước 11:00 19/07. Sẵn sàng Pitch trực tiếp nếu lọt Top 10.' },
];
