export const philosophyNote = 'Team gồm 6 thành viên (5 người theo hồ sơ đăng ký chính thức trên hub.aiforvietnam.org, bổ sung Yến — chuyên Business/Kinh doanh). Vai trò đã chốt cứng dựa trên năng lực thật của từng người, mỗi người có riêng 1 tài khoản AI trả phí để tăng tốc công việc, và luôn hỗ trợ chéo nhau để không ai bị cô lập.';

export const roleCards = [
  {
    name: 'K.AI',
    colorVar: '--s1',
    title: 'Đội trưởng · Tech Lead · Backend & Database · AI Plan',
    aiTool: 'Claude Pro',
    summary: 'Đứng đầu team, chịu trách nhiệm cuối cùng về kiến trúc kỹ thuật và tiến độ chung.',
    responsibilities: [
      'Dẫn dắt team (đội trưởng), quyết định hướng kiến trúc kỹ thuật tổng thể và lên kế hoạch tích hợp AI cho sản phẩm (AI Plan).',
      'Thiết kế cơ sở dữ liệu (Database Schema) và lập trình logic API Backend chính — dựa trên kỹ năng DevOps, Vibe Coding, Python sẵn có.',
      'Dùng Claude Pro để brainstorm kiến trúc, review code và soạn tài liệu kỹ thuật.',
      'Làm việc sát với Quân để cung cấp API cho Frontend, và với Quang/Lâm để mở endpoint cho AI Core.',
    ],
  },
  {
    name: 'Quân',
    colorVar: '--s2',
    title: 'Frontend & UI/UX Design',
    aiTool: 'Claude Max 5x',
    summary: 'Phụ trách toàn bộ giao diện, biến ý tưởng sản phẩm thành trải nghiệm người dùng thật.',
    responsibilities: [
      'Thiết kế giao diện (UI/UX) và chuyển đổi thiết kế thành code React — dựa trên kỹ năng UI/UX & Web Development sẵn có.',
      'Dùng Claude Max 5x (tính năng Claude Design) để sinh nhanh component, layout và hiệu ứng chuyển động chất lượng cao.',
      'Đảm bảo giao diện responsive, mượt mà trên cả desktop lẫn mobile trước mỗi lần demo.',
      'Làm việc trực tiếp với K.AI để lấy dữ liệu từ Backend, không cần qua trung gian.',
    ],
  },
  {
    name: 'Mai',
    colorVar: '--s5',
    title: 'QC & Quản lý hiệu suất',
    aiTool: 'Gemini Pro',
    summary: 'Giữ nhịp cho cả team: kiểm soát chất lượng sản phẩm và theo dõi hiệu suất từng người.',
    responsibilities: [
      'Kiểm soát chất lượng (QC) toàn bộ sản phẩm & quy trình trước mỗi checkpoint.',
      'Theo dõi tiến độ, đo lường và tối ưu hiệu suất làm việc của team — dựa trên nền tảng Chiến lược/Tài chính sẵn có.',
      'Dùng Gemini Pro để tổng hợp báo cáo tiến độ, phân tích dữ liệu hiệu suất và soát lỗi tài liệu dài.',
      'Phối hợp K.AI báo cáo tình hình chung, hỗ trợ Yến chuẩn bị số liệu minh chứng cho phần thuyết trình kinh doanh.',
    ],
  },
  {
    name: 'Quang',
    colorVar: '--s6',
    title: 'AI Core, Grounding & Security/Pentest',
    aiTool: 'Claude Pro',
    summary: 'Cùng Lâm xây dựng phần lõi AI của sản phẩm và đảm bảo hệ thống an toàn.',
    responsibilities: [
      'Xây dựng AI Agent, logic lõi (AI Core) và cơ chế grounding (RAG) để AI trả lời đúng ngữ cảnh — dựa trên kỹ năng AI/ML, API/Tích hợp hệ thống.',
      'Rà soát bảo mật và kiểm thử xâm nhập (Pentest) hệ thống trước mỗi lần nộp bài — dựa trên kỹ năng Bảo mật.',
      'Dùng Claude Pro để viết/tinh chỉnh prompt, debug logic Agent và tra cứu lỗ hổng bảo mật.',
      'Cùng lớp, cùng trường với Lâm nên dễ đồng bộ tiến độ, trao đổi trực tiếp ngoài giờ code.',
    ],
  },
  {
    name: 'Lâm',
    colorVar: '--s7',
    title: 'AI Core, Grounding & Security/Pentest (cùng Quang)',
    aiTool: 'Claude Pro',
    summary: 'Hỗ trợ Quang ở mảng AI Core/bảo mật, đồng thời backup Web Dev khi cần.',
    responsibilities: [
      'Hỗ trợ xây dựng AI Core (đặc biệt phần Computer Vision/ML) và grounding dữ liệu — dựa trên kinh nghiệm thực tế PyTorch, OpenCV, YOLOv11 (dự án U-Mamba trình bày tại ICISN 2026).',
      'Pentest và kiểm thử bảo mật hệ thống — dựa trên nền tảng Network Security thực tế (DNS, Zero Trust, DoH/DoT/DoQ từ dự án Zero Trust DNS Server).',
      'Dùng Claude Pro để debug mô hình AI và viết script kiểm thử bảo mật.',
      'Backup Quân về Web Development (React/Vite) khi cần gấp trước checkpoint; cùng lớp, cùng trường với Quang nên phối hợp nhanh.',
    ],
  },
  {
    name: 'Yến',
    colorVar: '--s8',
    title: 'Business, Pilot & Kinh doanh',
    aiTool: 'Gemini Pro',
    summary: 'Đưa góc nhìn thị trường và khách hàng thật vào sản phẩm, đồng hành pitching cùng K.AI.',
    responsibilities: [
      'Xây dựng business case, market validation và đánh giá tính khả thi kinh doanh của giải pháp — dựa trên kinh nghiệm Consulting Intern tại MCG Management Consulting (dự án digital transformation cho PVOIL, Canavi).',
      'Cùng K.AI xây dựng luận điểm pitch, chuẩn bị trả lời phản biện từ hội đồng giám khảo — dựa trên kinh nghiệm CMO tại CHITOFLOW (Quán quân Business Venture Challenge 2026, Á quân I Impact 2026).',
      'Dùng Gemini Pro để nghiên cứu thị trường, tổng hợp tài liệu dài và phân tích đối thủ cạnh tranh.',
      'Phối hợp Mai theo dõi tiến độ chung, pilot thử sản phẩm với góc nhìn người dùng/khách hàng thật.',
    ],
  },
];

export const crossTableHeaders = ['Mốc thời gian phối hợp', 'K.AI (Tech Lead & Backend/DB)', 'Quân (Frontend & UI/UX)', 'Mai (QC & Hiệu suất)', 'Quang (AI Core & Security)', 'Lâm (AI Core & Security)', 'Yến (Business & Pitching)'];

export const crossTableRows = [
  { milestone: 'Nhận đề & Brainstorm (D1, 11:00-14:00)', cells: [
    'Định hướng chọn track, phác thảo kiến trúc kỹ thuật tổng thể (AI Plan, Backend/DB)',
    'Phác thảo wireframe UI, góp ý trải nghiệm người dùng cho từng hướng giải pháp',
    'Lên kế hoạch tiến độ, xác định tiêu chí QC cho sản phẩm',
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
