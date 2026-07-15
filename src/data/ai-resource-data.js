export const ownedTools = [
  {
    stage: 'K.AI · TECH LEAD, BACKEND & DB',
    colorVar: '--s1',
    names: 'Claude Pro',
    items: [
      { label: 'Claude Pro ($20)', text: 'Brainstorm kiến trúc kỹ thuật tổng thể, thiết kế Database Schema, viết logic API Backend và lên kế hoạch tích hợp AI (AI Plan).' },
    ],
    tagBg: 'rgba(42, 120, 214, 0.08)',
  },
  {
    stage: 'QUÂN · FRONTEND & UI/UX',
    colorVar: '--s2',
    names: 'Claude Max 5x',
    items: [
      { label: 'Claude Max 5x ($100)', text: 'Dùng tính năng Claude Design để thiết kế giao diện (UI/UX), sinh mã React component chất lượng cao và viết CSS chuyển động.' },
    ],
    tagBg: 'rgba(27, 175, 122, 0.08)',
  },
  {
    stage: 'MAI · QC & QUẢN LÝ HIỆU SUẤT',
    colorVar: '--s5',
    names: 'Gemini Pro',
    items: [
      { label: 'Gemini Pro ($20)', text: 'Tổng hợp báo cáo tiến độ, phân tích dữ liệu hiệu suất team và soát lỗi tài liệu dài nhờ ngữ cảnh lớn của Gemini.' },
    ],
    tagBg: 'rgba(12, 166, 120, 0.08)',
  },
  {
    stage: 'QUANG · AI CORE & GROUNDING',
    colorVar: '--s6',
    names: 'Claude Pro',
    items: [
      { label: 'Claude Pro ($20)', text: 'Viết/tinh chỉnh prompt cho AI Agent, thiết kế grounding (RAG), debug logic Agent và đo độ tin cậy đầu ra để giảm ảo giác (hallucination).' },
    ],
    tagBg: 'rgba(224, 49, 49, 0.08)',
  },
  {
    stage: 'LÂM · COMPUTER VISION & SECURITY',
    colorVar: '--s7',
    names: 'Claude Pro',
    items: [
      { label: 'Claude Pro ($20)', text: 'Debug mô hình AI/Computer Vision, viết script kiểm thử bảo mật (pentest) và backup code Frontend khi cần gấp.' },
    ],
    tagBg: 'rgba(12, 133, 153, 0.08)',
  },
  {
    stage: 'YẾN · BUSINESS & PITCHING',
    colorVar: '--s8',
    names: 'Gemini Pro',
    items: [
      { label: 'Gemini Pro ($20)', text: 'Nghiên cứu thị trường, tổng hợp tài liệu business case dài và phân tích đối thủ cạnh tranh phục vụ pitching.' },
    ],
    tagBg: 'rgba(214, 51, 108, 0.08)',
  },
];

export const freeFirstItems = [
  { title: 'Google AI Studio (Gemini Free API)', colorVar: '--s1', desc: 'Cung cấp khóa API **Gemini 1.5 Flash/Pro hoàn toàn miễn phí** với hạn mức cực kỳ hào phóng (15 RPM). Thừa đủ dùng cho toàn bộ các tác vụ gọi API xử lý nghiệp vụ lõi (RAG, OCR) trong 48h thi đấu.' },
  { title: 'Edge TTS & Omni Voice (Free & Unlimited)', colorVar: '--s2', desc: 'Sử dụng thư viện **Edge TTS** của Python để sinh giọng đọc tự nhiên (tiếng Việt/tiếng Anh) hoàn toàn miễn phí, không giới hạn ký tự, hoặc tận dụng Omni Voice (Google/OpenAI TTS Free Credits) thay vì mua ElevenLabs.' },
  { title: 'v0.dev by Vercel & Lexica (Free Tier)', colorVar: '--s3', desc: 'Khai thác các gói miễn phí của v0.dev để sinh code giao diện React, và Lexica.art / Bing Image Creator để sinh ảnh đồ họa banner chất lượng cao cho landing page với chi phí bằng 0.' },
];

export const openSourceKits = [
  { title: '🦙 Chạy Mô hình LLM Cục bộ (Local LLM via Ollama)', colorVar: '--s1', tool: 'Ollama kết hợp mô hình **Llama 3 (8B)** hoặc **Qwen 2 (7B)**.', usage: 'Chạy offline hoàn toàn trên máy của K.AI để thực hiện các tác vụ phân loại ý định nhạy cảm, tóm tắt tài liệu y khoa bảo mật hoặc sinh mã SQL tự động mà không lo bị phụ thuộc vào mạng internet hay chi phí API key.' },
  { title: '👁️ Nhận diện & OCR chuyên dụng (YOLOv8 & EasyOCR)', colorVar: '--s2', tool: 'Ultralytics **YOLOv8 / YOLOv10** mã nguồn mở và thư viện **EasyOCR**.', usage: 'Huấn luyện cục bộ siêu nhanh trên tập dữ liệu ảnh lá cây sâu bệnh (track Nông nghiệp) hoặc nhận diện chướng ngại vật ngập lụt (track Thiên tai). Chạy OCR trích xuất CMND/CCCD trực tiếp bằng thư viện Python mã nguồn mở.' },
  { title: '📂 CSDL Vector & Embeddings Tự Host (ChromaDB / pgvector)', colorVar: '--s3', tool: 'CSDL **ChromaDB** (in-memory) hoặc extension **pgvector** tích hợp thẳng vào PostgreSQL.', usage: 'Dựng kho lưu trữ vector nhúng tri thức RAG cục bộ. Sử dụng mô hình nhúng mã nguồn mở **all-MiniLM-L6-v2** chạy offline qua Ollama để mã hóa dữ liệu với chi phí hoàn toàn bằng 0.' },
  { title: '⚙️ Agent & Workflow Orchestration (LangGraph / CrewAI)', colorVar: '--s4', tool: 'Framework Python mã nguồn mở **LangGraph** (từ LangChain) hoặc **CrewAI**.', usage: 'Lập trình các luồng suy luận của AI Agent rẽ nhánh phức tạp, thiết lập cơ chế kiểm soát chất lượng đầu ra (Output Guardrails) và tự sửa lỗi (Self-Correction) hoàn toàn miễn phí.' },
];

export const costTableRows = [
  { tool: 'Claude Pro', price: '$20', user: 'K.AI (Tech Lead & Backend/DB)', purpose: 'Kiến trúc kỹ thuật, Database Schema, API Backend, AI Plan.', freeOption: { text: 'Gói cá nhân bắt buộc', colorVar: null } },
  { tool: 'Claude Max 5x', price: '$100', user: 'Quân (Frontend & UI/UX)', purpose: 'Dùng tính năng Claude Design sinh code frontend React, layout & hiệu ứng chuyển động.', freeOption: { text: 'Gói cá nhân bắt buộc để dùng Claude Design', colorVar: null } },
  { tool: 'Gemini Pro', price: '$20', user: 'Mai (QC & Quản lý hiệu suất)', purpose: 'Tổng hợp báo cáo tiến độ, phân tích dữ liệu hiệu suất team.', freeOption: { text: 'Có thể thay thế bằng Google AI Studio (Free)', colorVar: '--s5' } },
  { tool: 'Claude Pro', price: '$20', user: 'Quang (AI Core & Grounding)', purpose: 'Prompt AI Agent, grounding (RAG), debug logic Agent, giảm ảo giác.', freeOption: { text: 'Gói cá nhân bắt buộc', colorVar: null } },
  { tool: 'Claude Pro', price: '$20', user: 'Lâm (Computer Vision & Security)', purpose: 'Debug mô hình AI/CV, viết script kiểm thử bảo mật (pentest).', freeOption: { text: 'Gói cá nhân bắt buộc', colorVar: null } },
  { tool: 'Gemini Pro', price: '$20', user: 'Yến (Business & Pitching)', purpose: 'Nghiên cứu thị trường, tổng hợp business case, phân tích đối thủ.', freeOption: { text: 'Có thể thay thế bằng Google AI Studio (Free)', colorVar: '--s8' } },
];

export const costTableTotal = { label: 'TỔNG CHI PHÍ THỰC TẾ', amount: '$200 (~ 5.000.000đ)', team: 'Cả team Vibonymus (6 người, mỗi người 1 tài khoản riêng)', note: 'Không dùng chung tài khoản — mỗi thành viên chủ động với AI tool của mình.', freeGoal: 'Mục tiêu tối ưu hóa thêm bằng Free API cho các tác vụ phụ' };

export const trackAIDetails = {
  'y-te': {
    owned: [
      { name: 'Claude Pro (K.AI)', desc: 'K.AI dùng thiết kế Database Schema bệnh án mã hóa bảo mật và kiến trúc Backend lưu trữ hồ sơ y tế.' },
      { name: 'Claude Max 5x (Quân)', desc: 'Quân dùng sinh UI Dashboard nhập liệu lâm sàng và các biểu đồ theo dõi bệnh án trực quan.' }
    ],
    free: [
      { name: 'Google AI Studio (Gemini 1.5 Pro API)', desc: 'Nhận diện chữ viết tay toa thuốc, đối chiếu triệu chứng với phác đồ điều trị Bộ Y Tế miễn phí (15 RPM).' },
      { name: 'Microsoft Edge TTS (Giọng Hoài My/Nam Minh)', desc: 'Sinh giọng đọc tiếng Việt thuyết minh video demo chẩn đoán y khoa tự nhiên, không giới hạn ký tự.' },
      { name: 'SlidesGPT / Canva AI (Bản Free)', desc: 'Sinh nhanh khung slide thuyết trình phác thảo ý tưởng y tế thông minh sơ bộ.' },
      { name: 'Bing Image Creator / Stable Diffusion (Local)', desc: 'Sinh ảnh minh họa bệnh án điện tử, mockup giao diện y khoa chất lượng cao.' },
      { name: 'Luma Dream Machine / Pika Labs (Free Tier)', desc: 'Sinh hoạt cảnh video mô phỏng luồng tương tác giữa bác sĩ, bệnh nhân và AI.' },
      { name: 'PostgreSQL + pgvector (Local Docker)', desc: 'Vector DB cục bộ lưu trữ sách giáo khoa y học phục vụ RAG y tế với chi phí bằng 0.' }
    ],
    paid: [
      { name: 'Gamma App Pro ($15/tháng)', desc: 'Tự động tạo slide thuyết trình y khoa chuyên nghiệp, thẩm mỹ cao từ nội dung kịch bản pitch của Yến.' },
      { name: 'Midjourney v6 ($10/tháng)', desc: 'Sinh ảnh chất lượng nghệ thuật cao cấp phục vụ thiết kế giao diện ứng dụng y tế chuyên nghiệp.' },
      { name: 'Runway Gen-3 Alpha ($15/tháng)', desc: 'Sinh video mô tả cơ chế hoạt động sinh học của thuốc hoặc luồng chẩn đoán chất lượng điện ảnh.' }
    ],
    githubRepos: [
      { name: 'Project-MONAI/MONAI', url: 'https://github.com/Project-MONAI/MONAI', desc: 'Framework PyTorch chuẩn mực cho deep learning y tế, hỗ trợ phân loại ảnh, phân vùng cơ quan và đăng ký ảnh CT/MRI.', difficulty: 'Khá cao (Cần GPU & PyTorch)' },
      { name: 'epfl-llm/meditron', url: 'https://github.com/epfl-llm/meditron', desc: 'Mô hình ngôn ngữ lớn nguồn mở chuyên sâu y khoa dựa trên Llama, tối ưu hóa để trả lời câu hỏi và chẩn đoán lâm sàng.', difficulty: 'Cao (Yêu cầu cấu hình chạy LLM cục bộ)' }
    ]
  },
  'doi-moi': {
    owned: [
      { name: 'Claude Max 5x (Quân)', desc: 'Quân dùng sinh nhanh Landing Page sản phẩm và các hiệu ứng chuyển động CSS mượt mà.' },
      { name: 'Gemini Pro (Yến)', desc: 'Yến dùng nghiên cứu, tóm tắt và phân tích đối thủ cạnh tranh quy mô lớn trên thị trường cho business case.' }
    ],
    free: [
      { name: 'v0.dev (Free Tier)', desc: 'Vercel cấp hạn mức miễn phí hàng tháng để sinh mã nguồn thô cho các React components giao diện.' },
      { name: 'Microsoft Edge TTS (Giọng Hoài My/Nam Minh)', desc: 'Thuyết minh thuyết trình giới thiệu sản phẩm khởi nghiệp mượt mà, không tốn phí.' },
      { name: 'SlidesGPT / Canva AI (Bản Free)', desc: 'Sinh nhanh toàn bộ slide dàn ý mô hình kinh doanh đổi mới sáng tạo chỉ bằng một prompt.' },
      { name: 'Bing Image Creator / PlaygroundAI', desc: 'Sinh hình ảnh banner, ảnh nền chất lượng cao độc bản làm art assets quảng bá cho Landing Page.' },
      { name: 'Luma Dream Machine (Free Tier)', desc: 'Sinh video mô phỏng trải nghiệm người dùng thực tế sử dụng sản phẩm đổi mới.' },
      { name: 'ChromaDB (Local In-memory)', desc: 'CSDL Vector chạy trực tiếp trong bộ nhớ local để lưu trữ nhanh các ý tưởng brainstorming.' }
    ],
    paid: [
      { name: 'Gamma App Pro ($15/tháng)', desc: 'Tạo slide pitch deck gọi vốn cực kỳ bắt mắt, thuyết phục nhà đầu tư chỉ trong 5 phút.' },
      { name: 'Midjourney v6 ($10/tháng)', desc: 'Sinh art assets chất lượng thiết kế chuyên nghiệp, độc bản làm giao diện cho Landing Page.' },
      { name: 'Runway Gen-3 Alpha / HeyGen ($24/tháng)', desc: 'HeyGen sinh avatar người ảo pitching giới thiệu ý tưởng tự động chuyên nghiệp cho video demo.' }
    ],
    githubRepos: [
      { name: 'langchain-ai/langgraph', url: 'https://github.com/langchain-ai/langgraph', desc: 'Framework lập trình multi-agent dạng đồ thị có trạng thái, hỗ trợ luồng suy luận tuần hoàn lý tưởng cho các ý tưởng đột phá.', difficulty: 'Trung bình (Cần tư duy logic đồ thị)' },
      { name: 'crewAIInc/crewAI', url: 'https://github.com/crewAIInc/crewAI', desc: 'Thư viện điều phối đa tác nhân AI tự động, thiết lập ban cố vấn ảo giúp brainstorming ý tưởng sản phẩm.', difficulty: 'Dễ (Thân thiện, dễ tích hợp)' }
    ]
  },
  'nang-suat-sme': {
    owned: [
      { name: 'Claude Pro (Quang/Lâm)', desc: 'Quang & Lâm lập trình prompt rẽ nhánh LangGraph/CrewAI cho AI Agent nhân sự ảo.' },
      { name: 'Claude Max 5x (Quân)', desc: 'Quân thiết kế Admin Dashboard theo dõi Agent và trạng thái tự động hóa quy trình.' }
    ],
    free: [
      { name: 'Google AI Studio (Gemini 1.5 Flash API)', desc: 'API tóm tắt email khách hàng và sinh thư nháp trả lời tự động siêu tốc miễn phí.' },
      { name: 'Microsoft Edge TTS (Giọng Hoài My/Nam Minh)', desc: 'Lồng tiếng video mô tả dòng chảy công việc tự động của "nhân sự ảo AI" miễn phí không giới hạn ký tự.' },
      { name: 'SlidesGPT / Canva AI (Bản Free)', desc: 'Dựng nhanh slide báo cáo tối ưu hóa vận hành và tự động hóa quy trình cho doanh nghiệp.' },
      { name: 'Bing Image Creator / PlaygroundAI', desc: 'Sinh ảnh minh họa các nhân sự ảo làm việc, mockup giao diện quản lý doanh nghiệp.' },
      { name: 'Luma Dream Machine / Kling AI (Free)', desc: 'Sinh hoạt cảnh video mô phỏng luồng đối soát hóa đơn tự động giữa các phòng ban.' },
      { name: 'PostgreSQL + pgvector (Local Docker)', desc: 'CSDL quan hệ Postgres đối soát hóa đơn tự động và đồng bộ tồn kho thời gian thực.' }
    ],
    paid: [
      { name: 'Gamma App Pro ($15/tháng)', desc: 'Sinh slide thuyết trình tối ưu hóa vận hành SME cực kỳ chuyên nghiệp và trực quan.' },
      { name: 'Cursor IDE Pro ($20/tháng)', desc: 'Nâng cấp khả năng lập trình tự động đa tệp tin (Multi-file) cho K.AI và Quân trong 48h.' },
      { name: 'HeyGen ($24/tháng)', desc: 'Sinh MC ảo thuyết minh video demo luồng tự động hóa doanh nghiệp cực kỳ sống động.' }
    ],
    githubRepos: [
      { name: 'langgenius/dify', url: 'https://github.com/langgenius/dify', desc: 'Nền tảng LLMOps mã nguồn mở tốt nhất để xây dựng, vận hành và quản lý chatbot, agent và workflow tự động hóa SME.', difficulty: 'Dễ (Có giao diện trực quan)' },
      { name: 'n8n-io/n8n', url: 'https://github.com/n8n-io/n8n', desc: 'Công cụ tự động hóa quy trình workflow tự host tích hợp AI, kết nối CRM, Slack, hóa đơn siêu nhanh.', difficulty: 'Dễ (Kéo thả trực quan)' }
    ]
  },
  'chinh-phu-so': {
    owned: [
      { name: 'Gemini Pro (Mai)', desc: 'Mai dùng tóm tắt, đối chiếu các văn bản pháp luật, nghị định dịch vụ công dày hàng trăm trang khi QC nội dung.' },
      { name: 'Claude Pro (K.AI) + Claude Max 5x (Quân)', desc: 'K.AI thiết kế CSDL quan hệ lưu lịch sử hồ sơ công dân; Quân thiết kế giao diện chatbot CitizenCopilot.' }
    ],
    free: [
      { name: 'EasyOCR / LayoutLM v3 (Mã nguồn mở)', desc: 'Thư viện trích xuất thông tin tự động từ ảnh chụp CCCD/hộ khẩu điền vào tờ khai mẫu hành chính công.' },
      { name: 'Microsoft Edge TTS (Giọng Hoài My/Nam Minh)', desc: 'Edge TTS tiếng Việt thuyết minh hướng dẫn người dân làm thủ tục hành chính công.' },
      { name: 'SlidesGPT / Canva AI (Bản Free)', desc: 'Dựng nhanh slide thuyết trình về thành phố thông minh và cổng dịch vụ công trực tuyến.' },
      { name: 'Bing Image Creator / PlaygroundAI', desc: 'Sinh ảnh đồ họa minh họa thành phố thông minh, các quầy thủ tục hành chính số.' },
      { name: 'Luma Dream Machine (Free Tier)', desc: 'Sinh video mô phỏng người dân tương tác dễ dàng với cổng dịch vụ công trên điện thoại.' },
      { name: 'Postgres + pgvector (Local)', desc: 'CSDL Vector lưu trữ luật hành chính công phục vụ CitizenCopilot tra cứu chính xác.' }
    ],
    paid: [
      { name: 'Gamma App Pro ($15/tháng)', desc: 'Tạo slide thuyết trình về giải pháp hành chính công số đạt quy chuẩn thiết kế chuyên nghiệp.' },
      { name: 'v0.dev ($20/tháng)', desc: 'Mua thêm nếu cần sinh nhiều biểu mẫu UI hành chính phức tạp đáp ứng đúng quy chuẩn.' },
      { name: 'Runway Gen-3 Alpha ($15/tháng)', desc: 'Sinh video mô phỏng phối cảnh 3D thành phố thông minh chất lượng cao phục vụ pitching.' }
    ],
    githubRepos: [
      { name: 'JaidedAI/EasyOCR', url: 'https://github.com/JaidedAI/EasyOCR', desc: 'Thư viện trích xuất văn bản từ ảnh chụp tài liệu, giấy tờ hành chính công, hỗ trợ tốt tiếng Việt với chỉ vài dòng code.', difficulty: 'Dễ (Chạy trực tiếp bằng Python)' },
      { name: 'infiniflow/ragflow', url: 'https://github.com/infiniflow/ragflow', desc: 'Hệ thống RAG mã nguồn mở tối ưu sâu cho tài liệu luật pháp phức tạp, hạn chế tối đa việc AI suy luận sai luật công.', difficulty: 'Trung bình (Yêu cầu Docker)' }
    ]
  },
  'nong-nghiep': {
    owned: [
      { name: 'Claude Pro (K.AI/Quang/Lâm)', desc: 'K.AI viết API nhận diện ảnh nông nghiệp; Quang/Lâm huấn luyện & tích hợp mô hình Computer Vision phát hiện sâu bệnh.' },
      { name: 'Claude Max 5x (Quân)', desc: 'Quân thiết kế giao diện bản đồ độ ẩm nông trại và trực quan hóa dữ liệu cảm biến.' }
    ],
    free: [
      { name: 'YOLOv8 / YOLOv10 (Local Open-Source)', desc: 'Huấn luyện và chạy cục bộ mô hình nhận diện bệnh hại lá cây, sâu bệnh hại cây trồng miễn phí.' },
      { name: 'Google AI Studio (Gemini 1.5 Flash API)', desc: 'API nhận diện bệnh cây qua ảnh chụp lá và xuất kết quả chẩn đoán nhanh chóng.' },
      { name: 'Microsoft Edge TTS (Giọng Hoài My/Nam Minh)', desc: 'Edge TTS lồng tiếng thuyết minh video demo hệ thống tưới tiêu và chẩn đoán sâu bệnh hại cây trồng.' },
      { name: 'SlidesGPT / Canva AI (Bản Free)', desc: 'Dựng nhanh slide thuyết trình về ứng dụng AI nông nghiệp công nghệ cao.' },
      { name: 'Bing Image Creator / PlaygroundAI', desc: 'Sinh ảnh minh họa các giống cây trồng, lá cây bị sâu bệnh làm dữ liệu so sánh trên UI.' },
      { name: 'Luma Dream Machine / Kling AI (Free)', desc: 'Sinh video hoạt cảnh camera quét lá cây và tự động mở van tưới nước thông minh.' }
    ],
    paid: [
      { name: 'Gamma App Pro ($15/tháng)', desc: 'Tạo slide thuyết trình nông nghiệp thông minh, trực quan hóa biểu đồ khí hậu cực đẹp.' },
      { name: 'Groq API / Replicate (Pay-as-you-go)', desc: 'Thuê dịch vụ đám mây suy luận YOLOv8 siêu tốc (dưới 100ms) phục vụ demo mượt mà.' },
      { name: 'Runway Gen-3 Alpha ($15/tháng)', desc: 'Sinh video hoạt cảnh camera quét cánh đồng bằng drone chất lượng điện ảnh phục vụ video demo.' }
    ],
    githubRepos: [
      { name: 'ultralytics/ultralytics', url: 'https://github.com/ultralytics/ultralytics', desc: 'Kho mã nguồn YOLOv8 / YOLOv10 chuyên dụng để nhận diện bệnh hại lá cây, đếm sản lượng nông sản qua drone/camera.', difficulty: 'Trung bình (Cần chuẩn bị tập dữ liệu ảnh)' },
      { name: 'facebookresearch/segment-anything', url: 'https://github.com/facebookresearch/segment-anything', desc: 'Mô hình SAM phân vùng ảnh vạn năng, hỗ trợ khoanh vùng chính xác vùng lá sâu bệnh hoặc diện tích đất canh tác.', difficulty: 'Khá cao (Cần tài nguyên chạy mô hình)' }
    ]
  },
  'giao-duc': {
    owned: [
      { name: 'Claude Pro (Quang/Lâm)', desc: 'Quang & Lâm lập trình thuật toán phân tích vết lỗi sai, định vị lỗ hổng kiến thức của học sinh.' },
      { name: 'Claude Max 5x (Quân)', desc: 'Quân làm giao diện trắc nghiệm và trải nghiệm luyện tập tương tác cho AI Tutor.' }
    ],
    free: [
      { name: 'Google AI Studio (Gemini 1.5 Pro API)', desc: 'API sinh câu hỏi ôn luyện cá nhân hóa tự động RAG theo độ khó thích ứng.' },
      { name: 'Microsoft Edge TTS (Giọng Hoài My/Nam Minh)', desc: 'Tạo giọng đọc AI Tutor đồng hành thân thiện giảng giải đáp án chi tiết cho học sinh bằng Edge TTS.' },
      { name: 'SlidesGPT / Canva AI (Bản Free)', desc: 'Sinh nhanh slide thuyết trình về nền tảng học tập cá nhân hóa EdTech.' },
      { name: 'Bing Image Creator / Lexica.art', desc: 'Sinh hình ảnh minh họa lớp học thông minh, học sinh tương tác với trợ lý ảo.' },
      { name: 'Luma Dream Machine / Kling AI (Free)', desc: 'Sinh video hoạt cảnh học sinh giải bài tập và nhận được sự chúc mừng từ trợ lý AI.' },
      { name: 'ChromaDB (Local)', desc: 'Vector DB lưu trữ cây đồ thị kiến thức môn học và lịch sử ôn tập cục bộ.' }
    ],
    paid: [
      { name: 'Gamma App Pro ($15/tháng)', desc: 'Sinh slide giáo trình và slide pitch deck EdTech với thiết kế hiện đại, nhiều màu sắc.' },
      { name: 'Cursor IDE Pro ($20/tháng)', desc: 'Hỗ trợ Quân code nhanh thư viện vẽ bản đồ đồ thị Concept Map tương tác.' },
      { name: 'HeyGen ($24/tháng)', desc: 'Sinh giáo viên ảo AI (AI Teacher avatar) giảng dạy trực tiếp trong video demo bài học.' }
    ],
    githubRepos: [
      { name: 'learnhouse/learnhouse', url: 'https://github.com/learnhouse/learnhouse', desc: 'Hệ thống LMS thông minh nguồn mở kết hợp AI, hỗ trợ soạn thảo bài giảng Notion-style và sinh tài liệu học tập.', difficulty: 'Trung bình (Cần kiến thức web fullstack)' },
      { name: 'studyield/studyield', url: 'https://github.com/studyield/studyield', desc: 'Hệ thống hỗ trợ sinh đề thi trắc nghiệm, tạo Concept Map môn học và kiểm tra kiến thức tự động bằng kỹ thuật Feynman.', difficulty: 'Trung bình (Dễ triển khai)' }
    ]
  },
  'thien-tai': {
    owned: [
      { name: 'Claude Pro (K.AI)', desc: 'K.AI lập trình thuật toán Dijkstra tìm đường tránh điểm ngập trên Backend.' },
      { name: 'Claude Max 5x (Quân)', desc: 'Quân sinh giao diện bản đồ Mapbox trực quan hiển thị lộ trình cứu trợ.' }
    ],
    free: [
      { name: 'Google AI Studio (Gemini 1.5 Pro Vision API)', desc: 'Phân tích ảnh vệ tinh địa hình để tính toán chỉ số rủi ro sạt lở hoặc ngập lụt.' },
      { name: 'Microsoft Edge TTS (Giọng Hoài My/Nam Minh)', desc: 'Edge TTS tiếng Anh/tiếng Việt lồng tiếng video demo kịch bản sơ tán cứu trợ thiên tai khẩn cấp.' },
      { name: 'SlidesGPT / Canva AI (Bản Free)', desc: 'Sinh nhanh slide thuyết trình về giải pháp cứu trợ khẩn cấp thiên tai bão lũ.' },
      { name: 'Bing Image Creator / PlaygroundAI', desc: 'Sinh hình ảnh bản đồ cứu hộ, xe cứu trợ vượt lũ, hoặc mô phỏng sạt lở địa chất.' },
      { name: 'Luma Dream Machine (Free Tier)', desc: 'Sinh video hoạt cảnh mô phỏng xe cứu nạn đi theo lộ trình tránh vùng ngập lụt động.' },
      { name: 'Qdrant / Postgres local (Docker)', desc: 'CSDL Vector lưu trữ tọa độ địa lý các điểm ngập động được cập nhật thời gian thực.' }
    ],
    paid: [
      { name: 'Gamma App Pro ($15/tháng)', desc: 'Tạo slide thuyết trình phòng chống thảm họa thiên tai có tính tác động trực quan mạnh mẽ.' },
      { name: 'Mapbox API Pro ($10)', desc: 'Thuê thêm nếu vượt hạn mức Mapbox miễn phí để vẽ bản đồ ngập lụt động thời gian thực.' },
      { name: 'Runway Gen-3 Alpha ($15/tháng)', desc: 'Sinh video mô phỏng lũ quét sạt lở chất lượng cao phục vụ pitching gây ấn tượng mạnh.' }
    ],
    githubRepos: [
      { name: 'Leaflet/Leaflet', url: 'https://github.com/Leaflet/Leaflet', desc: 'Thư viện JavaScript gọn nhẹ để vẽ bản đồ tương tác hiển thị vùng nguy hiểm, lập lộ trình cứu trợ lũ lụt.', difficulty: 'Dễ (Thân thiện với Frontend)' },
      { name: 'OSGeo/gdal', url: 'https://github.com/OSGeo/gdal', desc: 'Thư viện chuẩn xử lý dữ liệu raster/vector địa lý GIS và phân tích ảnh vệ tinh dự báo sạt lở hoặc ngập lụt.', difficulty: 'Cao (Phức tạp về cài đặt thư viện)' }
    ]
  },
  'tai-chinh': {
    owned: [
      { name: 'Claude Pro (Quang/Lâm)', desc: 'Quang & Lâm viết thuật toán phân tích chuỗi thời gian phát hiện giao dịch bất thường (AI Core).' },
      { name: 'Claude Max 5x (Quân)', desc: 'Quân vẽ biểu đồ dòng tiền và giao diện cảnh báo chi tiêu trực quan.' }
    ],
    free: [
      { name: 'Isolation Forest / PyOD (Local)', desc: 'Thư viện học máy mã nguồn mở chạy cục bộ phát hiện hành vi gian lận giao dịch.' },
      { name: 'Microsoft Edge TTS (Giọng Hoài My/Nam Minh)', desc: 'Thuyết minh giọng đọc video demo trợ lý ảo Robo-Advisor tư vấn kế hoạch đầu tư bằng Edge TTS.' },
      { name: 'SlidesGPT / Canva AI (Bản Free)', desc: 'Sinh nhanh slide thuyết trình về ứng dụng Fintech quản lý tài chính cá nhân.' },
      { name: 'Bing Image Creator / Lexica.art', desc: 'Sinh ảnh minh họa biểu đồ tài chính, thẻ tín dụng ảo, giao dịch thanh toán thông minh.' },
      { name: 'Luma Dream Machine (Free Tier)', desc: 'Sinh video mô phỏng người dùng nhận được cảnh báo chi tiêu vượt mức từ AI.' },
      { name: 'PostgreSQL + pgvector (Local)', desc: 'CSDL lưu trữ vector hóa các danh mục chi tiêu phục vụ RAG dòng tiền.' }
    ],
    paid: [
      { name: 'Gamma App Pro ($15/tháng)', desc: 'Tạo slide pitch deck ứng dụng Fintech tài chính sang trọng, chuyên nghiệp.' },
      { name: 'Cursor IDE Pro ($20/tháng)', desc: 'Hỗ trợ code nhanh các hàm mã hóa dữ liệu giao dịch nhạy cảm.' },
      { name: 'HeyGen ($24/tháng)', desc: 'Sinh chuyên gia tư vấn tài chính ảo AI thuyết minh luồng sử dụng ứng dụng.' }
    ],
    githubRepos: [
      { name: 'yzhao062/pyod', url: 'https://github.com/yzhao062/pyod', desc: 'Thư viện học máy chuyên sâu phát hiện phần tử bất thường (Anomaly Detection) cho các giao dịch gian lận tài chính.', difficulty: 'Trung bình (Dễ áp dụng với Scikit-Learn)' },
      { name: 'scikit-learn/scikit-learn', url: 'https://github.com/scikit-learn/scikit-learn', desc: 'Thư viện học máy vạn năng, cung cấp thuật toán Isolation Forest để nhanh chóng lọc giao dịch tài chính nghi vấn.', difficulty: 'Dễ (Quen thuộc với kỹ sư Python)' }
    ]
  }
};
