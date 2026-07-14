import React, { useState } from 'react';
import { Cpu, ShieldAlert, DollarSign, PlusCircle, CheckCircle2, FolderGit2, Compass, Sparkles, ExternalLink } from 'lucide-react';

const AIResource = () => {
  const [selectedTrack, setSelectedTrack] = useState('nang-suat-sme');

  const trackNames = {
    'y-te': 'Y Tế & Sức Khỏe',
    'doi-moi': 'Đổi Mới Sáng Tạo',
    'nang-suat-sme': 'Năng Suất Doanh Nghiệp (SME)',
    'chinh-phu-so': 'Chính Phủ Thông Minh',
    'nong-nghiep': 'Nông Nghiệp Công Nghệ Cao',
    'giao-duc': 'Giáo Dục & Đào Tạo',
    'thien-tai': 'Phòng Chống Thiên Tai',
    'tai-chinh': 'Ngân Hàng & Tài Chính'
  };

  const trackAIDetails = {
    'y-te': {
      owned: [
        { name: 'Claude Max 5x (Gói dùng chung)', desc: 'Quân dùng thiết kế Database Schema bệnh án mã hóa bảo mật, K.AI dùng sinh UI Dashboard nhập liệu lâm sàng.' },
        { name: 'Claude Pro (K.AI)', desc: 'K.AI soạn slide, viết kịch bản pitch đối phó hội đồng giám khảo y khoa khó tính và giải thích tính an toàn.' }
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
        { name: 'Gamma App Pro ($15/tháng)', desc: 'Tự động tạo slide thuyết trình y khoa chuyên nghiệp, thẩm mỹ cao từ nội dung kịch bản của K.AI.' },
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
        { name: 'Claude Max 5x (Gói dùng chung)', desc: 'K.AI dùng sinh nhanh Landing Page sản phẩm và các hiệu ứng chuyển động CSS mượt mà.' },
        { name: 'Gemini Advanced (K.AI)', desc: 'K.AI dùng nghiên cứu, tóm tắt và phân tích đối thủ cạnh tranh quy mô lớn trên thị trường.' }
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
        { name: 'Claude Max 5x (Gói dùng chung)', desc: 'Quân lập trình prompt rẽ nhánh LangGraph/CrewAI; K.AI thiết kế Admin Dashboard theo dõi Agent.' },
        { name: 'Claude Pro (K.AI)', desc: 'K.AI viết kịch bản Live Demo luồng nhân sự ảo tự động gửi email/Slack nháp để pitching.' }
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
        { name: 'Cursor IDE Pro ($20/tháng)', desc: 'Nâng cấp khả năng lập trình tự động đa tệp tin (Multi-file) cho Quân và K.AI trong 48h.' },
        { name: 'HeyGen ($24/tháng)', desc: 'Sinh MC ảo thuyết minh video demo luồng tự động hóa doanh nghiệp cực kỳ sống động.' }
      ],
      githubRepos: [
        { name: 'langgenius/dify', url: 'https://github.com/langgenius/dify', desc: 'Nền tảng LLMOps mã nguồn mở tốt nhất để xây dựng, vận hành và quản lý chatbot, agent và workflow tự động hóa SME.', difficulty: 'Dễ (Có giao diện trực quan)' },
        { name: 'n8n-io/n8n', url: 'https://github.com/n8n-io/n8n', desc: 'Công cụ tự động hóa quy trình workflow tự host tích hợp AI, kết nối CRM, Slack, hóa đơn siêu nhanh.', difficulty: 'Dễ (Kéo thả trực quan)' }
      ]
    },
    'chinh-phu-so': {
      owned: [
        { name: 'Gemini Advanced (K.AI)', desc: 'K.AI dùng tóm tắt, đối chiếu các văn bản pháp luật, nghị định dịch vụ công dày hàng trăm trang.' },
        { name: 'Claude Max 5x (Gói dùng chung)', desc: 'Quân thiết kế CSDL quan hệ lưu lịch sử hồ sơ công dân; K.AI thiết kế giao diện chatbot CitizenCopilot.' }
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
        { name: 'Claude Max 5x (Gói dùng chung)', desc: 'Quân viết API nhận diện ảnh nông nghiệp; K.AI thiết kế giao diện bản đồ độ ẩm nông trại.' },
        { name: 'Gemini Advanced (K.AI)', desc: 'K.AI dịch thuật và nghiên cứu các tài liệu kỹ thuật canh tác thích ứng biến đổi khí hậu của nước ngoài.' }
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
        { name: 'Claude Max 5x (Gói dùng chung)', desc: 'Quân lập trình thuật toán phân tích vết lỗi sai định vị lỗ hổng kiến thức; K.AI làm giao diện trắc nghiệm.' },
        { name: 'Claude Pro (K.AI)', desc: 'K.AI viết kịch bản pitch làm nổi bật tính nhân văn và cá nhân hóa của trợ lý AI Tutor.' }
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
        { name: 'Cursor IDE Pro ($20/tháng)', desc: 'Hỗ trợ K.AI code nhanh thư viện vẽ bản đồ đồ thị Concept Map tương tác.' },
        { name: 'HeyGen ($24/tháng)', desc: 'Sinh giáo viên ảo AI (AI Teacher avatar) giảng dạy trực tiếp trong video demo bài học.' }
      ],
      githubRepos: [
        { name: 'learnhouse/learnhouse', url: 'https://github.com/learnhouse/learnhouse', desc: 'Hệ thống LMS thông minh nguồn mở kết hợp AI, hỗ trợ soạn thảo bài giảng Notion-style và sinh tài liệu học tập.', difficulty: 'Trung bình (Cần kiến thức web fullstack)' },
        { name: 'studyield/studyield', url: 'https://github.com/studyield/studyield', desc: 'Hệ thống hỗ trợ sinh đề thi trắc nghiệm, tạo Concept Map môn học và kiểm tra kiến thức tự động bằng kỹ thuật Feynman.', difficulty: 'Trung bình (Dễ triển khai)' }
      ]
    },
    'thien-tai': {
      owned: [
        { name: 'Claude Max 5x (Gói dùng chung)', desc: 'Quân lập trình thuật toán Dijkstra tìm đường tránh điểm ngập; K.AI sinh giao diện bản đồ Mapbox.' },
        { name: 'Gemini Advanced (K.AI)', desc: 'K.AI nghiên cứu dữ liệu địa hình sạt lở sườn dốc và mô hình khí tượng thủy văn.' }
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
        { name: 'Claude Max 5x (Gói dùng chung)', desc: 'Quân viết thuật toán phân tích chuỗi thời gian phát hiện giao dịch bất thường; K.AI vẽ biểu đồ dòng tiền.' },
        { name: 'Claude Pro (K.AI)', desc: 'K.AI viết tài liệu thuyết minh cơ chế bảo mật tài chính và quản trị rủi ro dữ liệu.' }
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

  const currentAIDetails = trackAIDetails[selectedTrack];

  return (
    <div className="page-content">
      {/* Tiêu đề trang */}
      <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-45px', right: '-45px', opacity: 0.05, pointerEvents: 'none' }}>
          <Cpu size={200} />
        </div>
        <h2><Cpu /> AI Resource &amp; Stack Công Nghệ — VAIC 2026</h2>
        <p className="sub" style={{ margin: '0 0 16px', maxWidth: '80%' }}>
          Thống kê chi tiết các mô hình AI, API tài nguyên, hạ tầng cơ sở dữ liệu, các thư viện mã nguồn mở và chi phí đầu tư bản quyền phục vụ riêng cho team Vibonymus tại cuộc thi Hackathon 48h.
        </p>
      </div>

      {/* PHẦN 1: CÁC CÔNG CỤ AI ĐANG CÓ CỦA TEAM */}
      <div className="card">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles style={{ color: 'var(--s1)' }} /> 1. Công cụ AI hiện có của Team (Current AI Assets)
        </h2>
        <p className="sub" style={{ margin: '0 0 20px' }}>
          Danh sách các tài khoản AI bản quyền đã được team đăng ký thanh toán thành công, sẵn sàng khai thác lập trình:
        </p>

        <div className="tool-grid">
          <div className="tool-card">
            <div>
              <div className="tool-stage" style={{ color: 'var(--s1)' }}>K.AI · PM &amp; PITCHING</div>
              <div className="tool-names">Claude Pro, Gemini Advanced &amp; Antigravity Pro</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '10px' }}>
                <ul style={{ paddingLeft: '18px', margin: 0 }}>
                  <li><b>Claude Pro ($20)</b>: Brainstorm kiến trúc, soạn slide và viết kịch bản pitching thuyết phục.</li>
                  <li><b>Gemini Advanced ($20)</b>: Đọc tài liệu hackathon cực dài, phân tích điều lệ thi và API của BTC.</li>
                  <li><b>Antigravity Pro ($0)</b>: Trợ lý AI tích hợp sẵn trong IDE để viết code nhanh và debug trực tiếp.</li>
                </ul>
              </div>
            </div>
            <div className="tool-tag" style={{ background: 'rgba(42, 120, 214, 0.08)', color: 'var(--s1)' }}>Trạng thái: Sẵn sàng</div>
          </div>

          <div className="tool-card">
            <div>
              <div className="tool-stage" style={{ color: 'var(--s3)' }}>HIẾU · FRONTEND &amp; MKT</div>
              <div className="tool-names">Claude Max 5x (Gói Premium)</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '10px' }}>
                <ul style={{ paddingLeft: '18px', margin: 0 }}>
                  <li><b>Claude Max 5x ($100)</b>: Thiết kế giao diện (UI/UX), sinh mã React component chất lượng cao, viết CSS chuyển động và tối ưu hóa ngôn từ tiếp thị sản phẩm.</li>
                </ul>
              </div>
            </div>
            <div className="tool-tag" style={{ background: 'rgba(237, 161, 0, 0.08)', color: 'var(--s3)' }}>Trạng thái: Sẵn sàng</div>
          </div>

          <div className="tool-card">
            <div>
              <div className="tool-stage" style={{ color: 'var(--s2)' }}>QUÂN · BACKEND &amp; DB</div>
              <div className="tool-names">Claude Max 5x (Dùng chung)</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '10px' }}>
                <ul style={{ paddingLeft: '18px', margin: 0 }}>
                  <li><b>Claude Max 5x ($0)</b>: Chia sẻ tài khoản với K.AI để tối ưu hóa chi phí. Dùng để thiết kế Database Schema, viết API và xử lý logic kết nối DB Backend.</li>
                </ul>
              </div>
            </div>
            <div className="tool-tag" style={{ background: 'rgba(27, 175, 122, 0.08)', color: 'var(--s2)' }}>Trạng thái: Sẵn sàng</div>
          </div>
        </div>
      </div>

      {/* CHIẾN LƯỢC TỐI ƯU HÓA: ƯU TIÊN AI MIỄN PHÍ */}
      <div className="card" style={{ background: 'rgba(32, 201, 151, 0.03)', borderColor: 'rgba(32, 201, 151, 0.2)' }}>
        <h2 style={{ color: 'var(--s2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 style={{ color: 'var(--s2)' }} /> Chiến lược tối ưu chi phí: Ưu tiên AI Miễn Phí hàng đầu
        </h2>
        <p className="sub" style={{ margin: '0 0 16px' }}>
          Vibonymus triệt để áp dụng triết lý <b>"Free-First"</b>, tận dụng tối đa các cổng API miễn phí và công cụ AI hỗ trợ lập trình không mất tiền trước khi quyết định chi trả cho các gói trả phí:
        </p>
        <div className="grid-3" style={{ gap: '14px' }}>
          <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--surface-page)', border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--s1)', marginBottom: '6px' }}>Google AI Studio (Gemini Free API)</div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Cung cấp khóa API <b>Gemini 1.5 Flash/Pro hoàn toàn miễn phí</b> với hạn mức cực kỳ hào phóng (15 RPM). Thừa đủ dùng cho toàn bộ các tác vụ gọi API xử lý nghiệp vụ lõi (RAG, OCR) trong 48h thi đấu.
            </p>
          </div>
          
          <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--surface-page)', border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--s2)', marginBottom: '6px' }}>Edge TTS &amp; Omni Voice (Free &amp; Unlimited)</div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Sử dụng thư viện <b>Edge TTS</b> của Python để sinh giọng đọc tự nhiên (tiếng Việt/tiếng Anh) hoàn toàn miễn phí, không giới hạn ký tự, hoặc tận dụng Omni Voice (Google/OpenAI TTS Free Credits) thay vì mua ElevenLabs.
            </p>
          </div>

          <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--surface-page)', border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--s3)', marginBottom: '6px' }}>v0.dev by Vercel &amp; Lexica (Free Tier)</div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Khai thác các gói miễn phí của v0.dev để sinh code giao diện React, và Lexica.art / Bing Image Creator để sinh ảnh đồ họa banner chất lượng cao cho landing page với chi phí bằng 0.
            </p>
          </div>
        </div>
      </div>

      {/* KHO MÃ NGUỒN MỞ TỰ HOST */}
      <div className="card">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FolderGit2 style={{ color: 'var(--s1)' }} /> Kho giải pháp Mã nguồn mở tự host (Zero-Cost &amp; High Defensibility)
        </h2>
        <p className="sub" style={{ margin: '0 0 20px' }}>
          Tận dụng sức mạnh của cộng đồng mã nguồn mở chạy trực tiếp cục bộ (Local) hoặc tự host. Điều này giúp nâng điểm <i>Engineering Depth</i> và <i>AI Safety</i> cực kỳ thuyết phục trước Ban giám khảo:
        </p>

        <div className="grid-2">
          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', background: 'var(--surface-page)' }}>
            <h3 style={{ margin: '0 0 8px', color: 'var(--s1)', fontSize: '0.92rem', fontWeight: 800 }}>🦙 Chạy Mô hình LLM Cục bộ (Local LLM via Ollama)</h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <b>Công cụ:</b> Ollama kết hợp mô hình <b>Llama 3 (8B)</b> hoặc <b>Qwen 2 (7B)</b>.
              <br />
              <b>Ứng dụng:</b> Chạy offline hoàn toàn trên máy của Quân để thực hiện các tác vụ phân loại ý định nhạy cảm, tóm tắt tài liệu y khoa bảo mật hoặc sinh mã SQL tự động mà không lo bị phụ thuộc vào mạng internet hay chi phí API key.
            </p>
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', background: 'var(--surface-page)' }}>
            <h3 style={{ margin: '0 0 8px', color: 'var(--s2)', fontSize: '0.92rem', fontWeight: 800 }}>👁️ Nhận diện &amp; OCR chuyên dụng (YOLOv8 &amp; EasyOCR)</h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <b>Công cụ:</b> Ultralytics <b>YOLOv8 / YOLOv10</b> mã nguồn mở và thư viện <b>EasyOCR</b>.
              <br />
              <b>Ứng dụng:</b> Huấn luyện cục bộ siêu nhanh trên tập dữ liệu ảnh lá cây sâu bệnh (track Nông nghiệp) hoặc nhận diện chướng ngại vật ngập lụt (track Thiên tai). Chạy OCR trích xuất CMND/CCCD trực tiếp bằng thư viện Python mã nguồn mở.
            </p>
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', background: 'var(--surface-page)' }}>
            <h3 style={{ margin: '0 0 8px', color: 'var(--s3)', fontSize: '0.92rem', fontWeight: 800 }}>📂 CSDL Vector &amp; Embeddings Tự Host (ChromaDB / pgvector)</h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <b>Công cụ:</b> CSDL <b>ChromaDB</b> (in-memory) hoặc extension <b>pgvector</b> tích hợp thẳng vào PostgreSQL.
              <br />
              <b>Ứng dụng:</b> Dựng kho lưu trữ vector nhúng tri thức RAG cục bộ. Sử dụng mô hình nhúng mã nguồn mở <b>all-MiniLM-L6-v2</b> chạy offline qua Ollama để mã hóa dữ liệu với chi phí hoàn toàn bằng 0.
            </p>
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', background: 'var(--surface-page)' }}>
            <h3 style={{ margin: '0 0 8px', color: 'var(--s4)', fontSize: '0.92rem', fontWeight: 800 }}>⚙️ Agent &amp; Workflow Orchestration (LangGraph / CrewAI)</h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <b>Công cụ:</b> Framework Python mã nguồn mở <b>LangGraph</b> (từ LangChain) hoặc <b>CrewAI</b>.
              <br />
              <b>Ứng dụng:</b> Lập trình các luồng suy luận của AI Agent rẽ nhánh phức tạp, thiết lập cơ chế kiểm soát chất lượng đầu ra (Output Guardrails) và tự sửa lỗi (Self-Correction) hoàn toàn miễn phí.
            </p>
          </div>
        </div>
      </div>

      {/* PHẦN 2: ĐỀ XUẤT AI ĐỘNG THEO TỪNG ĐỀ TÀI */}
      <div className="card">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Compass /> 2. Đề xuất Phân bổ AI theo từng Đề tài (AI Recommendations by Track)
        </h2>
        <p className="sub" style={{ margin: '0 0 20px' }}>
          Chọn một đề tài để xem các đề xuất mô hình AI, công cụ bổ sung được lọc tự động theo các nhóm tài nguyên:
        </p>

        {/* Thanh chọn Track */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '8px', 
          marginBottom: '24px',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '16px'
        }}>
          {Object.keys(trackNames).map((key) => {
            const isSelected = selectedTrack === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedTrack(key)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: isSelected ? '1px solid var(--theme-color)' : '1px solid var(--border)',
                  background: isSelected ? 'rgba(90, 73, 204, 0.08)' : 'var(--surface-1)',
                  color: isSelected ? 'var(--theme-color)' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {trackNames[key]}
              </button>
            );
          })}
        </div>

        {/* Dữ liệu AI phân bổ theo các nhóm */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Nhóm 1: AI hiện có */}
          <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface-page)' }}>
            <h3 style={{ margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 800, color: 'var(--s1)' }}>
              <Sparkles size={18} /> Nhóm 1: AI hiện có (Đang sở hữu sử dụng cho track này)
            </h3>
            <div className="grid-2" style={{ gap: '14px' }}>
              {currentAIDetails.owned.map((item, index) => (
                <div key={index} style={{ padding: '14px', borderRadius: '10px', border: '1px solid rgba(42, 120, 214, 0.12)', background: 'rgba(42, 120, 214, 0.02)' }}>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nhóm 2: AI Miễn phí */}
          <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface-page)' }}>
            <h3 style={{ margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 800, color: 'var(--s2)' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--s2)' }} /> Nhóm 2: AI miễn phí (Free Tier / Open Source / Slide / Đồ họa / Video / Voice)
            </h3>
            <div className="grid-2" style={{ gap: '14px' }}>
              {currentAIDetails.free.map((item, index) => (
                <div key={index} style={{ padding: '14px', borderRadius: '10px', border: '1px solid rgba(32, 201, 151, 0.12)', background: 'rgba(32, 201, 151, 0.02)' }}>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nhóm 3: Thư viện & Mã nguồn mở khuyên dùng (GitHub Repos) */}
          <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface-page)' }}>
            <h3 style={{ margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              <FolderGit2 size={18} style={{ color: 'var(--s1)' }} /> Nhóm 3: Thư viện &amp; Mã nguồn mở khuyên dùng (GitHub Open-Source)
            </h3>
            <div className="grid-2" style={{ gap: '14px' }}>
              {currentAIDetails.githubRepos.map((item, index) => (
                <div key={index} style={{ padding: '14px', borderRadius: '10px', border: '1px solid rgba(90, 73, 204, 0.15)', background: 'rgba(90, 73, 204, 0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800 }}>
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: 'var(--theme-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        {item.name} <ExternalLink size={14} />
                      </a>
                    </h4>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      background: 'rgba(90, 73, 204, 0.08)', 
                      color: 'var(--theme-color)',
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}>
                      {item.difficulty}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nhóm 4: AI Trả phí bổ sung */}
          <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface-page)' }}>
            <h3 style={{ margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 800, color: 'var(--s3)' }}>
              <PlusCircle size={18} style={{ color: 'var(--s3)' }} /> Nhóm 4: AI trả phí bổ sung (Paid Add-ons đề xuất thuê thêm)
            </h3>
            <div className="grid-2" style={{ gap: '14px' }}>
              {currentAIDetails.paid.map((item, index) => (
                <div key={index} style={{ padding: '14px', borderRadius: '10px', border: '1px solid rgba(237, 161, 0, 0.12)', background: 'rgba(237, 161, 0, 0.02)' }}>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bảng tổng hợp chi phí */}
      <div className="card">
        <h2><DollarSign /> Bảng tổng hợp chi phí bản quyền AI của nhóm</h2>
        <p className="sub" style={{ margin: '0 0 16px' }}>Thống kê các khoản chi phí thực tế mà team đã chi trả để trang bị bản quyền AI hỗ trợ lập trình (luôn tối ưu hóa ưu tiên tài khoản dùng chung và gói miễn phí).</p>
        <div className="cross-table-scroll">
          <table className="cross-table">
            <thead>
              <tr>
                <th>Công cụ AI</th>
                <th>Đơn giá / Tháng</th>
                <th>Người sử dụng chính</th>
                <th>Mục tiêu sử dụng chính</th>
                <th>Ưu thế tối ưu chi phí (Free Option)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Claude Pro</b></td>
                <td>$20</td>
                <td>K.AI (PM &amp; Pitching)</td>
                <td>Lên cấu trúc dự án, viết slide thuyết trình, review mã nguồn.</td>
                <td><span style={{ color: 'var(--text-muted)' }}>Gói cá nhân bắt buộc</span></td>
              </tr>
              <tr>
                <td><b>Gemini Advanced</b></td>
                <td>$20</td>
                <td>K.AI (PM &amp; Pitching)</td>
                <td>Phân tích luật thi đấu dài, hướng dẫn API, khai thác ngữ cảnh lớn.</td>
                <td><span style={{ color: 'var(--s1)', fontWeight: 700 }}>Có thể thay thế bằng Google AI Studio (Free)</span></td>
              </tr>
              <tr>
                <td><b>Antigravity Pro</b></td>
                <td>$0 (Sẵn có)</td>
                <td>K.AI (PM &amp; Pitching)</td>
                <td>Hỗ trợ code trực tiếp trong IDE, sửa lỗi cú pháp thời gian thực.</td>
                <td><span style={{ color: 'var(--good)', fontWeight: 700 }}>Hoàn toàn miễn phí</span></td>
              </tr>
              <tr>
                <td><b>Claude Max 5x</b></td>
                <td>$100</td>
                <td>K.AI (Frontend) &amp; Quân (Backend)</td>
                <td>Sinh code frontend React, dựng Database Schema, viết API logic.</td>
                <td><span style={{ color: 'var(--s2)', fontWeight: 700 }}>Dùng chung 2 người (Tiết kiệm $100)</span></td>
              </tr>
              <tr style={{ background: 'rgba(0,0,0,0.01)', fontWeight: 800 }}>
                <td>TỔNG CHI PHÍ THỰC TẾ</td>
                <td style={{ color: 'var(--critical)' }}>$140 (~ 3.500.000đ)</td>
                <td>Cả team Vibonymus</td>
                <td>Đã tối ưu hóa chia sẻ tài khoản chéo.</td>
                <td><span style={{ color: 'var(--s1)', fontWeight: 800 }}>Mục tiêu tối ưu hóa thêm 40% bằng Free API</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rulebook warning */}
      <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(245, 159, 0, 0.06)', borderColor: 'rgba(245, 159, 0, 0.2)' }}>
        <ShieldAlert style={{ color: 'var(--warning)', flexShrink: 0, marginTop: '2px' }} size={24} />
        <div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '0.98rem', fontWeight: 700, color: 'var(--warning)' }}>Lưu ý bản quyền &amp; Quy chế thi đấu</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Mọi đoạn code được sinh bởi AI cần được khai báo minh bạch trong **AI Collaboration Log** nộp kèm dự án. Ban giám khảo có quyền loại các đội thi sao chép mã nguồn bất hợp pháp hoặc không thể giải thích cách hoạt động của giải pháp AI của mình.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIResource;
