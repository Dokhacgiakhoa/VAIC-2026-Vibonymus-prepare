export const introNote = 'Danh sách những gì mỗi thành viên và cả team nên chuẩn bị xong TRƯỚC khi bước vào 48h thi đấu (17/07), để không mất thời gian setup/học công cụ giữa lúc chạy nước rút.';

export const memberChecklists = [
  {
    name: 'K.AI',
    colorVar: '--s1',
    role: 'Tech Lead & Backend/DB',
    items: [
      'Cài sẵn Node.js, PostgreSQL (hoặc Docker Postgres), Git, VS Code + extension cần thiết.',
      'Dựng sẵn boilerplate Backend (Express/Fastify) + cấu trúc migration mẫu để không mất thời gian setup từ 0.',
      'Đăng nhập sẵn Claude Pro, test thử prompt sinh migration SQL & API controller.',
      'Ôn lại cách deploy nhanh lên Render/Vercel/Railway (thử deploy 1 app mẫu trước).',
    ],
  },
  {
    name: 'Quân',
    colorVar: '--s2',
    role: 'Frontend & UI/UX',
    items: [
      'Cài sẵn Node.js, Vite, cài đặt sẵn 1 project React boilerplate + Tailwind/CSS Modules.',
      'Đăng nhập sẵn Claude Max 5x, làm quen trước với tính năng Claude Design để không bỡ ngỡ khi vào trận.',
      'Chuẩn bị sẵn bộ icon (Lucide/Heroicons), font chữ và bảng màu mặc định để dựng UI nhanh.',
      'Ôn lại Framer Motion / CSS animation cơ bản cho các hiệu ứng micro-interaction.',
    ],
  },
  {
    name: 'Mai',
    colorVar: '--s5',
    role: 'QC & Quản lý hiệu suất',
    items: [
      'Chuẩn bị sẵn template checklist QC (Google Sheet/Notion) và bảng theo dõi tiến độ từng người.',
      'Đăng nhập sẵn Gemini Pro, thử trước việc tóm tắt log lỗi GitHub Issues thành báo cáo ngắn.',
      'Thống nhất trước quy ước gắn nhãn mức độ ưu tiên lỗi (Critical/Major/Minor) với cả team.',
      'Cài GitHub Issues/Projects board sẵn để bắt đầu ghi nhận ngay từ giờ đầu tiên.',
    ],
  },
  {
    name: 'Quang',
    colorVar: '--s6',
    role: 'AI Core & Grounding',
    items: [
      'Cài sẵn Python, thư viện LangGraph/CrewAI, test thử kết nối tới 1 LLM API (OpenAI/Gemini/Claude).',
      'Đăng nhập sẵn Claude Pro, chuẩn bị trước bộ System Prompt mẫu và few-shot examples tái sử dụng được.',
      'Ôn lại kỹ thuật grounding (RAG) và cách đo độ tin cậy đầu ra AI để giảm ảo giác (hallucination).',
      'Chuẩn bị sẵn tài khoản/API key riêng (đừng trông chờ BTC cấp — xem lưu ý ngân sách API ở Dashboard).',
    ],
  },
  {
    name: 'Lâm',
    colorVar: '--s7',
    role: 'Computer Vision & Security',
    items: [
      'Cài sẵn PyTorch, OpenCV, thử chạy trước 1 model YOLO nhỏ để chắc chắn môi trường GPU/CPU hoạt động.',
      'Đăng nhập sẵn Claude Pro, ôn lại cách debug lỗi huấn luyện/inference thường gặp.',
      'Ôn lại OWASP Top 10, chuẩn bị sẵn script quét lỗ hổng cơ bản (SQLi, XSS) để pentest nhanh trước mỗi checkpoint.',
      'Ôn lại React cơ bản để backup Quân về Frontend khi cần gấp.',
    ],
  },
  {
    name: 'Yến',
    colorVar: '--s8',
    role: 'Business & Pitching',
    items: [
      'Đăng nhập sẵn Gemini Pro, chuẩn bị sẵn khung business case (3 câu hỏi cốt lõi) để điền nhanh khi có đề.',
      'Chuẩn bị sẵn template slide pitch deck (Gamma/Canva/Google Slides) theo phong cách team.',
      'Nghiên cứu trước bộ tiêu chí chấm điểm VAIC 2026 (xem mục Tiêu chí chấm điểm ở Gantt) để căn nội dung pitch đúng trọng số.',
      'Luyện tập trước 1-2 kịch bản trả lời phản biện (Q&A) thường gặp với giám khảo hackathon.',
    ],
  },
];

export const openSourceToLearn = [
  { title: 'Git & GitHub workflow', colorVar: '--s1', desc: 'Ôn lại branch/PR/merge conflict cơ bản — cả team code chung repo suốt 48h nên cần thao tác nhuần nhuyễn, tránh mất thời gian xử lý conflict giữa đêm.' },
  { title: 'Docker cơ bản', colorVar: '--s2', desc: 'Biết cách chạy Postgres/Redis qua Docker Compose để không phụ thuộc cấu hình máy cá nhân, dễ đồng bộ môi trường giữa các thành viên.' },
  { title: 'LangGraph / CrewAI', colorVar: '--s6', desc: 'Đọc trước quickstart để hiểu cách định nghĩa Agent, State và Routing — tránh học từ đầu khi đã vào giờ thi.' },
  { title: 'Ollama (Local LLM)', colorVar: '--s7', desc: 'Cài sẵn Ollama + tải trước 1 model nhỏ (Llama 3 8B/Qwen 2 7B) để có phương án dự phòng khi API cloud bị giới hạn rate limit.' },
  { title: 'ChromaDB / pgvector', colorVar: '--s5', desc: 'Làm quen trước cách nhúng & truy vấn vector để dựng RAG nhanh, không phải tra docs giữa lúc chạy nước rút.' },
  { title: 'Postman / Swagger', colorVar: '--s8', desc: 'Chuẩn bị sẵn collection test API mẫu để K.AI & Quân ghép nối Backend-Frontend nhanh mà không cần dựng UI test thủ công.' },
];

export const logisticsChecklist = [
  'Laptop riêng đã sạc đầy + sạc dự phòng, dây sạc dài (BTC không cấp máy).',
  'Túi ngủ, đồ vệ sinh cá nhân, bình nước, đồ ăn nhẹ cho ca đêm.',
  'Tải sẵn offline: tài liệu hướng dẫn hackathon, guidebook cuộc thi, slide template.',
  'Đăng ký slot Mentor Wave 1 & 2 (20 phút/slot) trước ngày 16/07.',
  'Test thử kết nối wifi/hotspot dự phòng — tránh phụ thuộc hoàn toàn vào wifi sự kiện.',
  'Thống nhất trước kênh chat chính (Zalo/Discord) và quy ước đặt tên nhánh Git.',
];
