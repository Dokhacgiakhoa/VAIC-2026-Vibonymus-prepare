import { GitBranch, MessageCircle, Users } from 'lucide-react';

export const roles = [
  { key: 'kai', name: 'K.AI — PM / AI Engineer', aiTool: 'Claude Pro + 2x Gemini Pro', color: 'var(--s1)' },
  { key: 'quan', name: 'Quân — Backend / DB', aiTool: 'Claude Max 5x', color: 'var(--s2)' },
  { key: 'hieu', name: 'K.AI — Frontend / UX', aiTool: 'Claude Max 5x', color: 'var(--s3)' }
];

export const syncCheckpoints = [
  'Cả team xác nhận API contract & wireframe trước khi tách nhánh code song song.',
  'Demo nội bộ giữa chặng — Backend & Frontend ghép thử, báo lỗi tức thời để chỉnh.',
  'Đánh giá chéo UI/UX và độ chính xác AI, phản hồi 2 chiều trước khi khoá tính năng.',
  'Kiểm thử toàn hệ thống, phản hồi bug ngay lập tức, chốt bản build cuối để pitching.'
];

export const sharedChannels = [
  { icon: GitBranch, label: 'GitHub Repo', desc: 'Nhánh chung, Pull Request review chéo, commit log minh bạch xuyên suốt 48h.' },
  { icon: MessageCircle, label: 'Nhóm chat (Zalo/Discord)', desc: 'Kênh trao đổi tức thời, báo lỗi & xin hỗ trợ ngay khi bị nghẽn (bottleneck).' },
  { icon: Users, label: 'Đứng họp nhanh (Stand-up)', desc: 'Sync 15 phút đầu mỗi ca làm để rà tiến độ & phân bổ lại việc nếu cần.' }
];

export const timelineSteps = [
  {
    time: 'Giờ 1 - Giờ 4',
    phase: 'Khởi động & Thiết kế Kiến trúc',
    title: 'Định hình sản phẩm & Database Schema',
    desc: 'Ngay sau khi BTC công bố đề bài chi tiết (11:00 ngày 17/07), team nhanh chóng hội ý chốt phương án và thiết kế nền tảng.',
    kai: 'Brainstorm ý tưởng, viết đặc tả PRD sơ bộ bằng AI, vẽ sơ đồ luồng dữ liệu.',
    quan: 'Thiết kế Database Schema (Postgres), định nghĩa các bảng và API contract.',
    hieu: 'Phác thảo wireframe giao diện, lên bảng màu và font chữ thống nhất cho ứng dụng.',
    tasks: [
      'K.AI: Phân tích kỹ lưỡng đề bài Hackathon, phác thảo User Personas và Core User Journey.',
      'Quân: Cấu hình repo GitHub của team, phân quyền bảo mật, thiết lập CI/CD framework cơ sở.',
      'K.AI: Thiết lập thư mục dự án React, cài đặt font chữ và cấu hình hệ thống style tokens.'
    ],
    checklist: [
      'Chốt xong tài liệu đặc tả API Contract (Swagger/Markdown) giữa Quân & K.AI.',
      'Khởi tạo thành công Database trống trên PostgreSQL Cloud, test kết nối port ok.',
      'K.AI duyệt Figma Wireframe / Sketch giao diện chính cho Dashboard.'
    ],
    plan: '11:00 BTC công bố đề -> 11:30 K.AI hoàn tất PRD nháp -> 12:30 Quân & K.AI chốt API Contract -> 14:00 Hoàn tất khung thiết kế.'
  },
  {
    time: 'Giờ 5 - Giờ 24',
    phase: 'Tăng tốc Phát triển (Giai đoạn 1)',
    title: 'Xây dựng Core Logic & Giao diện cơ bản',
    desc: 'Quân và K.AI bắt tay vào code các phần cốt lõi của hệ thống dưới sự hỗ trợ của các trợ lý AI chuyên biệt.',
    kai: 'Xây dựng core AI engine (tích hợp API, thiết lập prompt cho Agent, cấu hình Vector DB/RAG).',
    quan: 'Thiết lập server Backend, viết API endpoints kết nối DB, tạo dữ liệu mock để test chéo.',
    hieu: 'Code khung giao diện React, cấu trúc các component dùng chung và kết nối state.',
    tasks: [
      'K.AI: Viết service kết nối GPT/Gemini API, cấu hình Vector Database (Pinecone/Milvus).',
      'Quân: Hoàn thiện Authentication API, viết các CRUD endpoints cho các nghiệp vụ chính (Tracks, Competitors).',
      'K.AI: Code giao diện Dashboard chính, trang chi tiết Tracks và so sánh đối thủ.'
    ],
    checklist: [
      'Backend chạy thử local thành công và phản hồi API đúng cấu trúc JSON.',
      'Frontend hiển thị được dữ liệu mock từ local API không bị lỗi UI.',
      'AI Engine trả về phản hồi đầu tiên qua Swagger UI với độ trễ thấp.'
    ],
    plan: 'Mỗi 4 tiếng commit code 1 lần -> 20:00 Demo chặng 1 (giữa giờ) -> K.AI kiểm tra AI service -> Quân & K.AI ghép thử API lần 1.'
  },
  {
    time: 'Giờ 25 - Giờ 36',
    phase: 'Hoàn thiện & Tối ưu (Giai đoạn 2)',
    title: 'Tích hợp sâu AI & Đánh bóng UI/UX',
    desc: 'Giai đoạn then chốt để tạo ra tính đột phá (AI-Native) và giao diện bắt mắt nhất.',
    kai: 'Đánh giá độ chính xác AI, tinh chỉnh prompt (Prompt Tuning), viết tài liệu AI Collaboration Log.',
    quan: 'Tối ưu hóa các truy vấn SQL, kết nối API thực tế với Frontend, xử lý lỗi bảo mật đầu vào.',
    hieu: 'Thêm hiệu ứng animation mượt mà, tối ưu CSS responsive, hoàn thiện các tương tác UX.',
    tasks: [
      'K.AI: Thiết lập bộ test prompt tự động, đánh giá chất lượng đầu ra của Agent, tinh chỉnh hệ số Temperature.',
      'Quân: Tích hợp Redis cache cho các API tải nặng, cấu hình HTTPS và bảo mật API đầu vào.',
      'K.AI: Thiết kế các biểu đồ tương tác, thêm các hiệu ứng chuyển trang động và micro-animations.'
    ],
    checklist: [
      'Hoàn tất tích hợp AI vào API chính của hệ thống, không bị nghẽn mạng.',
      'Độ trễ phản hồi API giảm xuống dưới 500ms (sau khi cache và tối ưu).',
      'Giao diện responsive 100% trên các thiết bị phổ thông (Mobile, Tablet, Desktop).'
    ],
    plan: '10:00 sáng ngày 18/07 ghép nối toàn diện -> 12:00 chốt kiểm thử UI/UX -> 14:00 K.AI chạy thử Prompt Tuning chặng cuối.'
  },
  {
    time: 'Giờ 37 - Giờ 48',
    phase: 'Kiểm thử & Chuẩn bị Pitching',
    title: 'Đóng gói sản phẩm & Tối ưu hóa Thuyết trình',
    desc: 'Đảm bảo sản phẩm chạy ổn định 100% và chuẩn bị kịch bản thuyết trình ấn tượng nhất.',
    kai: 'Quay video demo sản phẩm (2-3 phút), hoàn thiện slide thuyết trình và luyện tập pitching.',
    quan: 'Kiểm thử hộp đen (Black-box testing) toàn bộ hệ thống, chuẩn bị file backup database.',
    hieu: 'Đánh bóng giao diện lần cuối, đồng bộ thiết kế slide thuyết trình với thương hiệu sản phẩm.',
    tasks: [
      'K.AI: Biên soạn kịch bản pitching 5 phút, chuẩn bị bộ câu hỏi Q&A phản biện của giám khảo.',
      'Quân: Deploy ứng dụng lên Vercel/Render, nén backup database, chạy kiểm tra tải giả lập.',
      'K.AI: Kiểm tra tất cả link gãy, tối ưu asset hình ảnh/video demo, kiểm tra font chữ.'
    ],
    checklist: [
      'Deploy production thành công, link demo chạy ổn định không có lỗi vặt.',
      'Video demo sản phẩm 2 phút chất lượng Full HD hoàn tất có lời thoại.',
      'Slide pitching (PDF/Google Slides) sẵn sàng và được đồng bộ thiết kế thương hiệu.'
    ],
    plan: '18:00 Đóng băng mã nguồn (Code Freeze) -> 19:00 Chạy thử pitching demo lần 1 -> 20:30 Tổng duyệt lần cuối toàn team.'
  }
];

export const aiCollaborationFlow = [
  {
    role: 'K.AI (PM / AI Engineer)',
    aiTool: 'Claude Pro + 2x Gemini Pro',
    usage: 'Brainstorm kiến trúc hệ thống, phân tích tài liệu kỹ thuật phức tạp, thiết lập logic cho AI Agents và tinh chỉnh prompt (System Prompt Engineering).',
    collaboration: 'Đầu ra là PRD chuẩn và file đặc tả API để thống nhất với Quân trước khi bắt tay code.',
    tasks: [
      'Dùng Gemini Pro tóm tắt đề bài và phát hiện các rủi ro kỹ thuật ẩn.',
      'Dùng Claude Pro sinh code khởi tạo System Prompt & định hướng cho RAG agent.',
      'Quản lý cấu hình prompt chung trong file prompts.config.js.'
    ],
    checklist: [
      'Đã lọc bỏ hoàn toàn thông tin nhạy cảm (API Key, Mật khẩu) ra khỏi prompts.',
      'Đã viết test case mẫu để kiểm tra độ tin cậy của AI Agent trước khi tích hợp.',
      'Có phương án fallback (mô hình dự phòng) nếu API chính gặp sự cố quá tải.'
    ],
    feedbackLoop: 'Khi AI sinh output bị ảo giác (hallucination) -> K.AI điều chỉnh nhiệt độ (Temperature) hoặc cấu hình Few-shot Examples trong system prompt để định hình lại đầu ra.'
  },
  {
    role: 'Quân (Backend / DB)',
    aiTool: 'Claude Max 5x (Dùng chung)',
    usage: 'Thiết kế cấu trúc bảng cơ sở dữ liệu tối ưu, sinh các truy vấn SQL phức tạp, tạo dữ liệu mockup tự động phục vụ kiểm thử nhanh hệ thống.',
    collaboration: 'Cung cấp API endpoints ổn định và mock data chuẩn xác cho K.AI kết nối giao diện.',
    tasks: [
      'Dùng Claude Max sinh các migration scripts SQL cho database.',
      'Tạo API Controller & Service lớp cơ sở chỉ qua prompt cấu trúc dữ liệu.',
      'Tận dụng AI viết nhanh các Unit Test case cho các hàm phức tạp.'
    ],
    checklist: [
      'Đã review thủ công cấu trúc SQL tránh SQL Injection trước khi chạy migration.',
      'Dữ liệu mock sinh ra tuân thủ nghiêm ngặt định dạng của API Contract.',
      'Test coverage đạt trên 80% đối với các service tính điểm và xử lý AI.'
    ],
    feedbackLoop: 'Nếu API chạy lỗi -> Quân chuyển stack trace lỗi cho AI để sinh bản vá (Bug-fixing Prompt), sau đó review lại sự tương thích logic trước khi commit.'
  },
  {
    role: 'K.AI (Frontend / UX)',
    aiTool: 'Claude Max 5x',
    usage: 'Sinh nhanh mã nguồn CSS/React mượt mà, gợi ý các hiệu ứng vi-mô (micro-animations), hỗ trợ sửa lỗi tương tác giao diện thời gian thực.',
    collaboration: 'Biến các mock data của Quân thành những trang dashboard trực quan sinh động nhất.',
    tasks: [
      'Dùng Claude Max chuyển wireframe hình ảnh thành khung code React component.',
      'Tận dụng AI để viết các hàm xử lý animation phức tạp với Framer Motion.',
      'Hỏi AI các giải pháp tối ưu SEO, hiệu năng load trang và Accessibility (ARIA labels).'
    ],
    checklist: [
      'Đã kiểm tra giao diện hiển thị chính xác trên cả Safari, Chrome, Edge và Mobile.',
      'Code React không bị re-render vô hạn do sử dụng useEffect sai cách.',
      'Layout linh hoạt (flex/grid) không bị tràn hoặc vỡ khung hình ở màn hình nhỏ.'
    ],
    feedbackLoop: 'Nếu giao diện vỡ trên Mobile -> K.AI chụp màn hình / copy HTML gửi cho AI phân tích nguyên nhân và lấy mã CSS thay thế nhanh chóng.'
  }
];
