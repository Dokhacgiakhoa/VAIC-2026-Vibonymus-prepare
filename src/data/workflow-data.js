import { GitBranch, MessageCircle, Users } from 'lucide-react';

export const roles = [
  { key: 'kai', name: 'K.AI — Tech Lead / Backend & DB', aiTool: 'Claude Pro', color: 'var(--s1)' },
  { key: 'quan', name: 'Quân — Frontend & UI/UX', aiTool: 'Claude Max 5x', color: 'var(--s2)' },
  { key: 'mai', name: 'Mai — QC & Hiệu suất', aiTool: 'Gemini Pro', color: 'var(--s5)' },
  { key: 'quang', name: 'Quang — AI Core & Security', aiTool: 'Claude Pro', color: 'var(--s6)' },
  { key: 'lam', name: 'Lâm — AI Core & Security', aiTool: 'Claude Pro', color: 'var(--s7)' },
  { key: 'yen', name: 'Yến — Business & Pitching', aiTool: 'Gemini Pro', color: 'var(--s8)' },
];

export const syncCheckpoints = [
  'Sync nội bộ: xác nhận API contract, wireframe & business case trước khi tách nhánh làm việc.',
  'Checkpoint 1 (BTC, 10:00–12:00 18/07): nộp tên dự án & mô tả ngắn — bắt buộc, không gia hạn.',
  'Checkpoint 2 (BTC, 21:00–23:00 18/07): nộp GitHub Repo (public) & Live URL — bắt buộc.',
  'Code Freeze (BTC, 11:00 19/07): đóng cổng nộp bài, khoá GitHub & live link — không sửa được nữa.'
];

export const sharedChannels = [
  { icon: GitBranch, label: 'GitHub Repo', desc: 'Nhánh chung, Pull Request review chéo, commit log minh bạch xuyên suốt 48h.' },
  { icon: MessageCircle, label: 'Nhóm chat (Zalo/Discord)', desc: 'Kênh trao đổi tức thời, báo lỗi & xin hỗ trợ ngay khi bị nghẽn (bottleneck).' },
  { icon: Users, label: 'Đứng họp nhanh (Stand-up)', desc: 'Sync 15 phút đầu mỗi ca làm để rà tiến độ & phân bổ lại việc nếu cần.' }
];

export const timelineSteps = [
  {
    time: 'Giờ 1–4',
    phase: 'Khởi động & Thiết kế Kiến trúc',
    title: 'Định hình sản phẩm & Database Schema',
    desc: 'Ngay sau khi BTC công bố đề bài chi tiết (11:00 ngày 17/07), team nhanh chóng hội ý chốt phương án và thiết kế nền tảng.',
    tasks: {
      kai: 'Dẫn dắt team phân tích đề bài, thiết kế Database Schema (Postgres) và định nghĩa API contract.',
      quan: 'Phác thảo wireframe giao diện, lên bảng màu và font chữ thống nhất cho ứng dụng.',
      mai: 'Lên kế hoạch tiến độ chung, xác định tiêu chí QC cho từng mốc checkpoint.',
      quang: 'Đánh giá tính khả thi AI Agent & yêu cầu grounding (RAG) cho track đã chọn.',
      lam: 'Khảo sát mô hình AI/CV khả dụng, đánh giá rủi ro bảo mật ban đầu của kiến trúc.',
      yen: 'Đánh giá tính khả thi kinh doanh & thị trường, góp ý chọn track cùng team.',
    },
    checklist: [
      'Chốt xong tài liệu đặc tả API Contract (Swagger/Markdown) giữa K.AI & Quân.',
      'Khởi tạo thành công Database trống trên PostgreSQL Cloud, test kết nối port ok.',
      'K.AI duyệt wireframe giao diện chính cho Dashboard do Quân dựng.'
    ],
    plan: '11:00 BTC công bố đề -> 11:30 K.AI hoàn tất phân tích đề nháp -> 12:30 K.AI & Quân chốt API Contract -> 14:00 Hoàn tất khung thiết kế.'
  },
  {
    time: 'Giờ 5–24',
    phase: 'Tăng tốc Phát triển → Checkpoint 1',
    title: 'Xây dựng Core Logic & Giao diện cơ bản',
    desc: 'Cả team bắt tay vào phần việc lõi của mình dưới sự hỗ trợ của các trợ lý AI chuyên biệt.',
    tasks: {
      kai: 'Thiết lập server Backend, viết API endpoints kết nối DB, tạo dữ liệu mock để test chéo.',
      quan: 'Code khung giao diện React, cấu trúc các component dùng chung và kết nối state.',
      mai: 'Theo dõi tiến độ từng đầu việc, chuẩn bị checklist QC cho vòng kiểm thử đầu tiên.',
      quang: 'Xây dựng AI Agent, viết service kết nối LLM API, cấu hình Vector DB cho grounding.',
      lam: 'Hỗ trợ Quang huấn luyện/thử nghiệm mô hình AI đầu tiên, khảo sát kiến trúc bảo mật.',
      yen: 'Xây dựng business case sơ bộ, phác thảo luận điểm giá trị (value proposition).',
    },
    checklist: [
      'Backend chạy thử local thành công và phản hồi API đúng cấu trúc JSON.',
      'Frontend hiển thị được dữ liệu mock từ local API không bị lỗi UI.',
      'AI Agent trả về phản hồi đầu tiên qua Swagger UI với độ trễ thấp.',
      'Sẵn sàng tên dự án & mô tả ngắn để nộp Checkpoint 1 trước 12:00 ngày 18/07.'
    ],
    plan: 'Mỗi 4 tiếng commit code 1 lần -> 20:00 Demo chặng 1 (giữa giờ) -> Quang/Lâm kiểm tra AI service -> K.AI & Quân ghép thử API lần 1 -> 10:00-12:00 ngày 18/07 nộp Checkpoint 1 (tên dự án + mô tả ngắn).'
  },
  {
    time: 'Giờ 25–36',
    phase: 'Hoàn thiện & Tối ưu → Checkpoint 2',
    title: 'Tích hợp sâu AI & Đánh bóng UI/UX',
    desc: 'Giai đoạn then chốt để tạo ra tính đột phá (AI-Native) và giao diện bắt mắt nhất.',
    tasks: {
      kai: 'Tối ưu hóa các truy vấn SQL, nhúng API AI vào Backend, xử lý lỗi bảo mật đầu vào.',
      quan: 'Thêm hiệu ứng animation mượt mà, tối ưu CSS responsive, hoàn thiện các tương tác UX.',
      mai: 'QC vòng 1: kiểm thử end-to-end, báo lỗi ngay lập tức, tổng hợp báo cáo hiệu suất giữa chặng.',
      quang: 'Đánh giá độ chính xác AI, tinh chỉnh prompt (Prompt Tuning), viết AI Collaboration Log.',
      lam: 'Pentest sơ bộ hệ thống, rà soát lỗ hổng bảo mật API và luồng xác thực.',
      yen: 'Chuẩn bị nội dung thuyết minh mô hình kinh doanh, review cùng mentor Wave 2 (UX & kinh doanh).',
    },
    checklist: [
      'Hoàn tất tích hợp AI vào API chính của hệ thống, không bị nghẽn mạng.',
      'Độ trễ phản hồi API giảm xuống dưới 500ms (sau khi cache và tối ưu).',
      'Giao diện responsive 100% trên các thiết bị phổ thông (Mobile, Tablet, Desktop).',
      'GitHub Repo (public) & Live URL sẵn sàng để nộp Checkpoint 2 trước 23:00 ngày 18/07.'
    ],
    plan: '12:00 sau Checkpoint 1, ghép nối toàn diện -> 15:00-17:00 Mentor Wave 1 rà soát -> 20:00 Quang/Lâm chạy thử Prompt Tuning chặng cuối -> 21:00-23:00 nộp Checkpoint 2 (GitHub repo public + live URL).'
  },
  {
    time: 'Giờ 37–48',
    phase: 'Kiểm thử & Đóng gói → Code Freeze',
    title: 'Đóng gói sản phẩm & Tối ưu hóa Thuyết trình',
    desc: 'Đảm bảo sản phẩm chạy ổn định 100% và nộp bài hoàn chỉnh trước khi BTC đóng cổng (Code Freeze) lúc 11:00 ngày 19/07.',
    tasks: {
      kai: 'Deploy ứng dụng lên Vercel/Render, nén backup database, chạy kiểm tra tải giả lập.',
      quan: 'Đánh bóng giao diện lần cuối, đồng bộ thiết kế slide thuyết trình với thương hiệu sản phẩm.',
      mai: 'QC vòng 2, tổng hợp báo cáo hiệu suất cuối cùng, hỗ trợ chạy thử kịch bản demo.',
      quang: 'Kiểm thử tải & độ ổn định AI Agent, rà soát AI Core & grounding lần cuối trước khi nộp bài.',
      lam: 'Pentest lần cuối, rà soát toàn bộ lỗ hổng bảo mật trước khi demo và nộp bài.',
      yen: 'Cùng K.AI hoàn thiện kịch bản pitch, chuẩn bị trả lời phản biện của hội đồng giám khảo.',
    },
    checklist: [
      'Deploy production thành công, link demo chạy ổn định không có lỗi vặt.',
      'Video demo sản phẩm 2 phút chất lượng Full HD hoàn tất có lời thoại.',
      'Slide pitching (PDF/Google Slides) sẵn sàng và được đồng bộ thiết kế thương hiệu.',
      'Đã nộp bài đầy đủ trước 11:00 ngày 19/07 (Code Freeze) — GitHub, live URL, mô tả dự án.'
    ],
    plan: '23:00 (sau Checkpoint 2) tiếp tục xuyên đêm hoàn thiện -> 07:30 ăn sáng -> 08:00-11:00 rà soát lần cuối -> 11:00 ngày 19/07 Code Freeze: BTC đóng cổng nộp bài, khoá GitHub & live link -> 13:00-18:00 Demo prep -> 18:00 Pitch & Bế mạc.'
  }
];

export const aiCollaborationFlow = [
  {
    role: 'K.AI (Tech Lead / Backend & DB)',
    aiTool: 'Claude Pro',
    usage: 'Brainstorm kiến trúc hệ thống, thiết kế Database Schema, sinh code API Backend và lên kế hoạch tích hợp AI (AI Plan).',
    collaboration: 'Cung cấp API ổn định cho Quân dựng giao diện, và mở endpoint cho Quang/Lâm gắn AI Core vào.',
    tasks: [
      'Dùng Claude Pro sinh migration scripts SQL cho database.',
      'Viết API Controller & Service lớp cơ sở chỉ qua prompt cấu trúc dữ liệu.',
      'Tận dụng AI viết nhanh các Unit Test case cho các hàm phức tạp.'
    ],
    checklist: [
      'Đã review thủ công cấu trúc SQL tránh SQL Injection trước khi chạy migration.',
      'Dữ liệu mock sinh ra tuân thủ nghiêm ngặt định dạng của API Contract.',
      'Test coverage đạt trên 80% đối với các service tính điểm và xử lý AI.'
    ],
    feedbackLoop: 'Nếu API chạy lỗi -> K.AI chuyển stack trace lỗi cho Claude Pro để sinh bản vá (Bug-fixing Prompt), sau đó review lại sự tương thích logic trước khi commit.'
  },
  {
    role: 'Quân (Frontend & UI/UX)',
    aiTool: 'Claude Max 5x',
    usage: 'Dùng tính năng Claude Design để sinh nhanh mã nguồn CSS/React mượt mà, gợi ý hiệu ứng vi-mô (micro-animations), sửa lỗi tương tác giao diện thời gian thực.',
    collaboration: 'Biến dữ liệu từ API của K.AI thành những trang dashboard trực quan sinh động nhất.',
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
    feedbackLoop: 'Nếu giao diện vỡ trên Mobile -> Quân chụp màn hình / copy HTML gửi cho Claude Max phân tích nguyên nhân và lấy mã CSS thay thế nhanh chóng.'
  },
  {
    role: 'Mai (QC & Quản lý hiệu suất)',
    aiTool: 'Gemini Pro',
    usage: 'Dùng Gemini Pro để tổng hợp báo cáo tiến độ, phân tích dữ liệu hiệu suất team và soát lỗi tài liệu dài nhờ ngữ cảnh lớn.',
    collaboration: 'Cung cấp báo cáo QC & hiệu suất cho K.AI, đồng thời hỗ trợ Yến số liệu minh chứng khi pitching.',
    tasks: [
      'Dùng Gemini Pro tổng hợp log lỗi từ GitHub Issues thành báo cáo QC ngắn gọn.',
      'Phân tích tốc độ hoàn thành task của từng thành viên để cảnh báo sớm nếu chậm tiến độ.',
      'Soát chính tả/logic tài liệu thuyết minh dự án trước khi nộp bài.'
    ],
    checklist: [
      'Mỗi lỗi phát hiện đều được gắn mức độ ưu tiên (Critical/Major/Minor) rõ ràng.',
      'Báo cáo hiệu suất cập nhật ít nhất 2 lần/ngày trong 48h thi đấu.',
      'Không có checkpoint nào bị bỏ sót khỏi checklist tổng.'
    ],
    feedbackLoop: 'Khi phát hiện bug -> Mai ghi nhận qua GitHub Issues, gắn người phụ trách, dùng Gemini Pro soạn mô tả lỗi rõ ràng kèm bước tái hiện.'
  },
  {
    role: 'Quang (AI Core & Security)',
    aiTool: 'Claude Pro',
    usage: 'Dùng Claude Pro để viết/tinh chỉnh System Prompt cho AI Agent, thiết lập grounding (RAG) và rà soát lỗ hổng bảo mật.',
    collaboration: 'Đầu ra là AI Agent hoạt động ổn định để K.AI nhúng vào Backend chính.',
    tasks: [
      'Dùng Claude Pro tóm tắt đề bài và phát hiện các rủi ro kỹ thuật ẩn liên quan AI.',
      'Sinh code khởi tạo System Prompt & định hướng cho RAG agent.',
      'Quét nhanh các lỗ hổng bảo mật phổ biến (OWASP Top 10) trong code Backend.'
    ],
    checklist: [
      'Đã lọc bỏ hoàn toàn thông tin nhạy cảm (API Key, Mật khẩu) ra khỏi prompts.',
      'Đã viết test case mẫu để kiểm tra độ tin cậy của AI Agent trước khi tích hợp.',
      'Có phương án fallback (mô hình dự phòng) nếu API chính gặp sự cố quá tải.'
    ],
    feedbackLoop: 'Khi AI sinh output bị ảo giác (hallucination) -> Quang điều chỉnh nhiệt độ (Temperature) hoặc Few-shot Examples trong system prompt để định hình lại đầu ra.'
  },
  {
    role: 'Lâm (AI Core & Security)',
    aiTool: 'Claude Pro',
    usage: 'Dùng Claude Pro để debug mô hình AI/Computer Vision (PyTorch, YOLO) và viết script kiểm thử bảo mật (pentest).',
    collaboration: 'Hỗ trợ Quang chia việc AI Core & Security, backup Quân về Web Dev khi cần gấp.',
    tasks: [
      'Dùng Claude Pro debug lỗi huấn luyện/inference của mô hình Computer Vision.',
      'Viết script tự động quét lỗ hổng bảo mật cơ bản (SQLi, XSS) trước mỗi checkpoint.',
      'Hỗ trợ sinh nhanh component React khi Quân cần backup gấp trước deadline.'
    ],
    checklist: [
      'Đã kiểm tra input validation ở mọi endpoint nhận dữ liệu từ người dùng.',
      'Mô hình AI/CV chạy được với độ trễ chấp nhận được trên phần cứng demo.',
      'Đã pentest thử luồng đăng nhập/upload file trước khi hệ thống lên production.'
    ],
    feedbackLoop: 'Khi phát hiện lỗ hổng bảo mật -> Lâm báo ngay cho K.AI/Quang qua kênh chat, dùng Claude Pro sinh bản vá và test lại trước khi merge.'
  },
  {
    role: 'Yến (Business & Pitching)',
    aiTool: 'Gemini Pro',
    usage: 'Dùng Gemini Pro để nghiên cứu thị trường, tổng hợp tài liệu business case dài và phân tích đối thủ cạnh tranh.',
    collaboration: 'Đồng hành cùng K.AI xây dựng kịch bản pitch, cung cấp số liệu thị trường thuyết phục hội đồng giám khảo.',
    tasks: [
      'Dùng Gemini Pro tóm tắt báo cáo thị trường và đối thủ cạnh tranh liên quan track đã chọn.',
      'Soạn business case & value proposition dựa trên dữ liệu do Mai tổng hợp.',
      'Luyện tập trả lời phản biện (Q&A) cùng AI đóng vai giám khảo khó tính.'
    ],
    checklist: [
      'Business case có đủ 3 câu hỏi cốt lõi: What problem? Can you solve it? Will anyone pay for it?',
      'Số liệu thị trường trích dẫn có nguồn rõ ràng, không suy diễn cảm tính.',
      'Kịch bản pitch đã được rehearsal ít nhất 2 lần trước Demo Day.'
    ],
    feedbackLoop: 'Khi mentor phản biện business case yếu -> Yến dùng Gemini Pro nghiên cứu lại số liệu, điều chỉnh luận điểm value proposition trước lần rehearsal tiếp theo.'
  }
];
