import React, { useState } from 'react';
import { Heart, Compass, Briefcase, Landmark, Leaf, GraduationCap, CloudRain, ShieldAlert, ChevronRight, Zap, Target, Layers, PlayCircle, ShieldCheck, User, Layout, Server } from 'lucide-react';

const Tracks = () => {
  const [selectedTrack, setSelectedTrack] = useState('nang-suat-sme');
  const [activeSubTab, setActiveSubTab] = useState('overview');

  const trackData = [
    {
      id: 'y-te',
      name: 'Y Tế & Sức Khỏe',
      icon: <Heart className="track-icon" style={{ color: '#ff6b6b' }} />,
      desc: 'Ứng dụng AI trong chăm sóc sức khỏe: hỗ trợ chẩn đoán, tối ưu vận hành và nâng cao chất lượng dịch vụ y tế.',
      difficulty: '8/10 (Cao)',
      market: 'Rất Lớn',
      fit: '4/10 (Thấp)',
      mvp: 'Hệ thống AI Copilot hỗ trợ bác sĩ tóm tắt hồ sơ bệnh án, tra cứu phác đồ điều trị từ nguồn uy tín và gợi ý chẩn đoán sơ bộ.',
      workflow: [
        'Bác sĩ upload hồ sơ/ghi chú bệnh án (dạng text hoặc ghi âm giọng nói).',
        'AI OCR & Structured Engine chuyển hóa dữ liệu thô thành tài liệu JSON chuẩn hóa.',
        'RAG Engine đối chiếu triệu chứng với cơ sở dữ liệu phác đồ điều trị chính thống của Bộ Y Tế.',
        'LLM gợi ý chẩn đoán sơ bộ và đề xuất đơn thuốc tham khảo (có đính kèm nguồn trích dẫn tài liệu).'
      ],
      aiPoints: [
        {
          point: 'OCR & Cấu trúc hóa',
          desc: 'Sử dụng Gemini Pro Vision để nhận diện chữ viết tay của bác sĩ và cấu trúc hóa dữ liệu.'
        },
        {
          point: 'Medical RAG (Truy xuất y khoa)',
          desc: 'Tích hợp cơ sở dữ liệu Vector DB chứa sách giáo khoa y học và phác đồ điều trị để chống hallucination (ảo tưởng).'
        }
      ],
      aiProposal: 'Tích hợp LLM y khoa chuyên sâu (như Meditron hoặc Gemini Pro 1.5 với System Instruction y học) phân loại mã ICD-10 tự động từ ghi âm chẩn đoán. Sử dụng GraphRAG trên phác đồ điều trị của Bộ Y Tế để đối chiếu triệu chứng, giảm thiểu hallucination tối đa.',
      pm: [
        'Soạn slide bảo vệ dự án tập trung vào tính an toàn y khoa và giải pháp kiểm soát lỗi ảo tưởng (hallucination).',
        'Viết kịch bản pitching giải thích cơ chế đối chiếu triệu chứng với phác đồ điều trị chính thống của Bộ Y Tế.'
      ],
      fe: [
        'Sinh nhanh React component cho giao diện Dashboard nhập liệu bệnh án và upload ảnh toa thuốc/phiếu xét nghiệm.',
        'Thiết kế biểu đồ theo dõi các chỉ số sinh tồn của bệnh nhân bằng Canvas/Recharts.'
      ],
      be: [
        'Thiết kế Database Schema Postgres lưu trữ hồ sơ bệnh án mã hóa an toàn bảo mật (HIPAA-compliant).',
        'Viết prompt RAG tối ưu hóa để truy vấn Vector DB y khoa và trả về kết quả kèm nguồn trích dẫn luật y tế.'
      ],
      swot: {
        s: 'AI OCR dễ triển khai bằng Gemini API hỗ trợ xử lý tài liệu bệnh án thô rất hiệu quả.',
        w: 'Team thiếu chuyên môn sâu về y sinh học để kiểm chứng tính an toàn của các khuyến nghị đơn thuốc.',
        o: 'Nhu cầu số hóa tài liệu y khoa và tư vấn y tế từ xa trong cộng đồng hiện tại cực kỳ lớn.',
        t: 'Rủi ro pháp lý và tính nhân đạo cực cao nếu AI gợi ý chẩn đoán sai lệch, khó xây dựng dữ liệu thực chứng trong 48h.'
      },
      tech: 'LLMs chuyên y khoa (Med-PALM), RAG trên hồ sơ bệnh án, thị giác máy tính chẩn đoán ảnh.',
      challenge: 'Đòi hỏi độ chính xác tuyệt đối, dữ liệu y tế nhạy cảm khó tiếp cận trong 48h, rào cản pháp lý cao.',
      recommendation: 'Lĩnh vực đòi hỏi chuyên môn cực cao. Không ưu tiên cho Vibonymus do thiếu dữ liệu y khoa thực tế và thời gian kiểm chứng quá ngắn.'
    },
    {
      id: 'doi-moi',
      name: 'Đổi Mới Sáng Tạo',
      icon: <Compass className="track-icon" style={{ color: '#4dabf7' }} />,
      desc: 'Phát triển sản phẩm mới, cải tiến quy trình và ứng dụng phương pháp đổi mới sáng tạo thúc đẩy kinh doanh.',
      difficulty: '6/10 (Trung bình)',
      market: 'Lớn',
      fit: '6/10 (Trung bình)',
      mvp: 'Nền tảng tự động hóa brainstorming ý tưởng sản phẩm, phân tích đối thủ cạnh tranh và sinh landing page demo bằng AI.',
      workflow: [
        'Người dùng nhập ý tưởng ban đầu sơ sài.',
        'AI Agent phân tích thị trường, đề xuất 3 mô hình kinh doanh tiềm năng.',
        'AI sinh bản phân tích SWOT và dự thảo tài liệu đặc tả sản phẩm (PRD).',
        'Frontend Generator xuất mã nguồn HTML/CSS mẫu cho landing page giới thiệu ý tưởng.'
      ],
      aiPoints: [
        {
          point: 'Market Analysis Agent',
          desc: 'Sử dụng LLM phân tích xu hướng tìm kiếm và gợi ý ngách sản phẩm ít cạnh tranh.'
        },
        {
          point: 'PRD & Code Generator',
          desc: 'Tự động soạn tài liệu đặc tả và sinh boilerplate code giao diện landing page.'
        }
      ],
      aiProposal: 'Thiết kế hệ thống Multi-Agent Debate giả lập phản biện ý tưởng (một Agent đóng vai nhà đầu tư khó tính, một Agent làm đối thủ) để nhóm tự phản biện tinh chỉnh. Tích hợp API tự động xuất landing page thô bằng v0/Vite.',
      pm: [
        'Soạn slide pitching làm nổi bật tính độc đáo của mô hình kinh doanh và kế hoạch chiếm lĩnh thị trường ngách.',
        'Sinh kịch bản phản biện giả lập (Multi-Agent Debate) giữa nhà đầu tư khó tính và người sáng lập để luyện tập.'
      ],
      fe: [
        'Sử dụng AI sinh nhanh toàn bộ boilerplate code HTML/CSS và React cho Landing Page giới thiệu sản phẩm.',
        'Dựng các mock biểu đồ hiển thị dự báo tăng trưởng kinh doanh và thị trường mục tiêu sinh động.'
      ],
      be: [
        'Thiết kế API rẽ nhánh phân tích xu hướng thị trường từ nguồn tìm kiếm mở.',
        'Viết script Python/NodeJS tự động trích xuất thông tin đối thủ cạnh tranh từ các trang công nghệ.'
      ],
      swot: {
        s: 'Ý tưởng mở, cho phép team tự do sáng tạo công nghệ và thiết kế UI/UX theo sở trường của Hiếu.',
        w: 'Khó chứng minh chiều sâu kỹ thuật cốt lõi (AI defensibility) thực sự đột phá trước hội đồng giám khảo.',
        o: 'Dễ gây ấn tượng mạnh về tính sáng tạo nghệ thuật hoặc mô hình kinh doanh độc đáo, thu hút nhà tài trợ.',
        t: 'Rất nhiều đội thi lựa chọn đề tài này dẫn đến rủi ro bị trùng lặp ý tưởng chung chung, thiếu thực tế.'
      },
      tech: 'AI Generator, Chatbot hỗ trợ brainstorming, công cụ phân tích xu hướng thị trường.',
      challenge: 'Ý tưởng dễ bị chung chung, khó chứng minh tính ứng dụng kỹ thuật đột phá trong 48h.',
      recommendation: 'Chỉ nên chọn nếu khi công bố đề bài có ý tưởng sản phẩm thực sự độc đáo và giải quyết nỗi đau lớn.'
    },
    {
      id: 'nang-suat-sme',
      name: 'Năng Suất Doanh Nghiệp (SME)',
      icon: <Briefcase className="track-icon" style={{ color: '#20c997' }} />,
      desc: 'Xây dựng AI Agent cách mạng hóa vận hành, tự động hóa quy trình nghiệp vụ cho doanh nghiệp vừa và nhỏ (SME).',
      difficulty: '6/10 (Trung bình)',
      market: 'Cực Kỳ Rộng Lớn',
      fit: '9.5/10 (Cực Kỳ Cao)',
      mvp: 'Hệ thống Multi-Agent đóng vai trò là "Nhân sự ảo chuyên nghiệp" hỗ trợ doanh nghiệp SME tự động phản hồi email khách hàng, đối soát hóa đơn bán hàng và cập nhật tồn kho tự động.',
      workflow: [
        'Khách hàng gửi yêu cầu qua Email hoặc Chatbot.',
        'Email Analyzer Agent (AI) phân loại yêu cầu: Hỏi hàng, Khiếu nại, hay Yêu cầu báo giá.',
        'Nếu hỏi hàng: AI tự động kết nối API kiểm tra tồn kho trong cơ sở dữ liệu Postgres.',
        'Invoice Generator Agent tự sinh hóa đơn tạm tính và soạn thư phản hồi gửi lại khách hàng.',
        'Nếu phát sinh khiếu nại: Agent tự động cập nhật trạng thái vào CRM và gửi thông báo khẩn cấp đến Slack/Telegram của nhóm vận hành.'
      ],
      aiPoints: [
        {
          point: 'Intent Routing Agent',
          desc: 'Sử dụng Claude để phân loại ý định khách hàng với độ chính xác cao và định tuyến luồng xử lý phù hợp.'
        },
        {
          point: 'RAG on Product Catalog',
          desc: 'Truy xuất thông tin sản phẩm và chính sách hoàn trả thời gian thực từ cơ sở dữ liệu tri thức của công ty.'
        },
        {
          point: 'Function Calling (Gọi hàm)',
          desc: 'AI tự quyết định khi nào cần gọi API cập nhật kho hàng hoặc sinh mã giảm giá giữ chân khách hàng.'
        }
      ],
      aiProposal: 'Kiến trúc Multi-Agent LangGraph: Agent phân loại ý định (Intent Routing), SQL Agent tự động sinh truy vấn đối soát kho Postgres, và Action Agent tự động gọi webhook Slack/Slackbot gửi báo cáo tồn kho. Đây là workflow tự động hóa cực kỳ thuyết phục giám khảo.',
      pm: [
        'Soạn slide pitching chứng minh tính thực tiễn: sản phẩm giúp giảm thiểu 70% thời gian xử lý thủ công cho doanh nghiệp.',
        'Soạn kịch bản Demo trực tiếp (Live Demo) mô tả dòng chảy công việc khép kín của nhân sự ảo AI.'
      ],
      fe: [
        'Sinh giao diện bảng điều khiển quản trị (Admin Dashboard) hiển thị danh sách các AI Agent đang chạy và lịch sử log.',
        'Thiết kế form cấu hình và gán quyền cho các nhân sự ảo AI trực quan, thân thiện.'
      ],
      be: [
        'Xây dựng luồng LangGraph định tuyến ý định khách hàng (Intent Routing) và xử lý rẽ nhánh.',
        'Viết SQL Generator Agent tự động chuyển hóa ngôn ngữ tự nhiên thành câu lệnh truy vấn CSDL kho hàng Postgres.'
      ],
      swot: {
        s: 'Đồng bộ tuyệt đối với kỹ năng backend/Postgres DB của Quân và khả năng thiết kế UI/UX thực tế, trực quan của Hiếu.',
        w: 'Cần tích hợp rất nhiều nghiệp vụ kết nối API giả lập (CRM, Slack, email) trong khoảng thời gian ngắn.',
        o: 'Thị trường doanh nghiệp SME cực kỳ lớn, tính ứng dụng thực tế và khả năng thương mại hóa sản phẩm rất cao.',
        t: 'Độ cạnh tranh khốc liệt nhất giải đấu do tỷ lệ lớn các đội thi kỹ thuật lựa chọn đề tài thực tế này.'
      },
      tech: 'Multi-Agent Frameworks (LangGraph, CrewAI), RAG trên tài liệu doanh nghiệp, Automation Tooling (Make/Zapier).',
      challenge: 'Cần thiết kế UI/UX cực kỳ đơn giản để chủ doanh nghiệp không rành công nghệ có thể sử dụng dễ dàng.',
      recommendation: 'Nằm trong Phương án 1 (Thế mạnh). Tận dụng tối đa năng lực làm backend/database của Quân và frontend UX của Hiếu.'
    },
    {
      id: 'chinh-phu-so',
      name: 'Chính Phủ Thông Minh',
      icon: <Landmark className="track-icon" style={{ color: '#748ffc' }} />,
      desc: 'Giải pháp cho thành phố thông minh, cải thiện dịch vụ hành chính công số và tương tác với người dân.',
      difficulty: '7/10 (Cao)',
      market: 'Lớn (B2G)',
      fit: '5/10 (Trung bình)',
      mvp: 'Trợ lý ảo CitizenCopilot giúp người dân tra cứu thủ tục hành chính, tự động điền form giấy tờ công chứng và hướng dẫn quy trình dịch vụ công trực tuyến.',
      workflow: [
        'Người dân mô tả nhu cầu bằng ngôn ngữ tự nhiên (ví dụ: "Tôi muốn đăng ký kết hôn").',
        'AI tra cứu chính xác các loại giấy tờ cần thiết từ cổng thông tin pháp luật hành chính.',
        'AI hướng dẫn người dân chụp ảnh CMND/CCCD, tự động trích xuất thông tin điền vào tờ khai mẫu.',
        'AI kiểm tra tính hợp lệ của tờ khai trước khi người dân nhấn nộp.'
      ],
      aiPoints: [
        {
          point: 'OCR Extract & Autofill',
          desc: 'Sử dụng thị giác máy tính trích xuất thông tin giấy tờ tùy thân điền tự động vào biểu mẫu hành chính phức tạp.'
        },
        {
          point: 'Administrative RAG',
          desc: 'Đối chiếu các điều khoản pháp luật, thông tư hướng dẫn hành chính công thực tế để tư vấn chính xác.'
        }
      ],
      aiProposal: 'Thiết lập pipeline OCR kết hợp trích xuất thực thể tự động từ giấy tờ tùy thân của người dân (CCCD, hộ khẩu) bằng mô hình LayoutLM, tự động điền vào các mẫu tờ khai số. Sử dụng RAG đối chiếu hồ sơ với các nghị định, luật dịch vụ công để cảnh báo thiếu sót trước khi nộp.',
      pm: [
        'Soạn slide thuyết trình giải quyết nỗi đau của công dân về thủ tục hành chính công rườm rà.',
        'Viết kịch bản pitch làm nổi bật tính bảo mật thông tin và khả năng mở rộng quy mô phục vụ dịch vụ công số.'
      ],
      fe: [
        'Sinh giao diện Cổng dịch vụ công trực tuyến tối giản, form điền thông tin tự động sau khi quét ảnh CCCD.',
        'Thiết kế chatbot hướng dẫn người dân làm thủ tục hành chính từng bước bằng ngôn ngữ thân thiện.'
      ],
      be: [
        'Viết pipeline OCR trích xuất thông tin từ ảnh chụp giấy tờ tùy thân bằng mô hình học sâu.',
        'Thiết kế CSDL quan hệ Postgres lưu trữ lịch sử xử lý hồ sơ dịch vụ công của công dân.'
      ],
      swot: {
        s: 'Team sở hữu năng lực xử lý trích xuất dữ liệu OCR và tối ưu hóa truy vấn thông tin văn bản quy phạm pháp luật.',
        w: 'Rất khó tiếp cận hoặc giả lập các hệ thống lõi (Core) của chính phủ để làm luồng demo đầu-cuối thực tế.',
        o: 'Nhận được sự ủng hộ và định hướng mạnh mẽ từ ban tổ chức trong khuôn khổ chuyển đổi số dịch vụ hành chính công.',
        t: 'Quy trình thủ tục hành chính công phức tạp, đòi hỏi bảo mật dữ liệu công dân cực kỳ nghiêm ngặt.'
      },
      tech: 'AI Agent tư vấn luật pháp, xử lý ngôn ngữ tự nhiên phân loại ý kiến người dân, OCR số hóa giấy tờ.',
      challenge: 'Đòi hỏi sự am hiểu sâu về quy trình thủ tục hành chính công và độ bảo mật dữ liệu cao.',
      recommendation: 'Không khuyến khích do tính chất B2G khó triển khai demo thực tế chạy ngay trong cuộc thi.'
    },
    {
      id: 'nong-nghiep',
      name: 'Nông Nghiệp Công Nghệ Cao',
      icon: <Leaf className="track-icon" style={{ color: '#51cf66' }} />,
      desc: 'Tối ưu chuỗi cung ứng nông sản, canh tác chính xác và ứng dụng AI thích ứng với biến đổi khí hậu.',
      difficulty: '8/10 (Cao)',
      market: 'Trung bình',
      fit: '4/10 (Thấp)',
      mvp: 'Ứng dụng AI phân tích hình ảnh lá cây phát hiện sâu bệnh hại và lập lịch tưới tiêu, bón phân thông minh dựa trên dự báo thời tiết.',
      workflow: [
        'Nông dân chụp ảnh lá cây bị sâu bệnh tải lên hệ thống.',
        'Computer Vision Model phân loại loại sâu bệnh và mức độ thiệt hại.',
        'AI đề xuất phương án điều trị (loại thuốc, liều lượng) an sau sinh học.',
        'AI tổng hợp dự báo thời tiết 7 ngày tới để đưa ra khuyến nghị thời điểm phun thuốc tối ưu.'
      ],
      aiPoints: [
        {
          point: 'Disease Classification',
          desc: 'Mô hình CNN nhận diện bệnh hại cây trồng qua ảnh chụp thời gian thực.'
        },
        {
          point: 'Irrigation Decision Agent',
          desc: 'Agent phân tích độ ẩm đất, nhiệt độ và dự báo mưa để tự động ra quyết định đóng/mở van tưới.'
        }
      ],
      aiProposal: 'Tích hợp mô hình Computer Vision (như YOLOv8 fine-tuned hoặc Gemini Vision API) phát hiện đốm lá, rỉ sắt và ước lượng tỉ lệ sâu bệnh hại từ ảnh chụp thực tế. Kết hợp AI Agent phân tích chỉ số cảm biến đất (NPK, độ ẩm) và dự báo thời tiết API để ra khuyến nghị tưới tiêu tối ưu.',
      pm: [
        'Soạn slide pitching làm nổi bật giải pháp canh tác chính xác thích ứng với biến đổi khí hậu.',
        'Viết kịch bản thuyết trình thuyết phục giám khảo về tính khả thi thương mại và mức độ áp dụng của người nông dân.'
      ],
      fe: [
        'Sinh giao diện bản đồ nông trại thông minh hiển thị tình trạng độ ẩm, NPK của các khu vực đất.',
        'Thiết kế trang chẩn đoán sâu bệnh hại cây trồng qua ảnh chụp tải lên.'
      ],
      be: [
        'Viết thuật toán xử lý ngưỡng dữ liệu cảm biến IoT để tự động ra quyết định tưới tiêu.',
        'Thiết kế CSDL lưu trữ lịch sử phun thuốc, bón phân và dự báo thời tiết 7 ngày tới.'
      ],
      swot: {
        s: 'Mô hình Computer Vision nhận diện sâu bệnh qua ảnh lá cây rất dễ xây dựng demo sinh động, trực quan trên UI.',
        w: 'Team hoàn toàn thiếu các thiết bị cảm biến nông nghiệp IoT thực tế để giả lập dữ liệu tưới tiêu đầu vào.',
        o: 'Mật độ cạnh tranh cực thấp (chỉ 11% đội chọn), là cơ hội vàng bứt phá điểm số nếu làm tốt phần giao diện.',
        t: 'Ý tưởng dễ bị lý thuyết hóa, khó thuyết phục giám khảo nông nghiệp nếu thiếu số liệu kiểm thử thực tế.'
      },
      tech: 'Computer Vision phát hiện sâu bệnh, phân tích dữ liệu cảm biến IoT, mô hình dự báo thời tiết.',
      challenge: 'Cần phần cứng IoT hoặc tập dữ liệu cảm biến thời gian thực, khó làm demo trực quan sinh động.',
      recommendation: 'Nằm trong Phương án 2 (Đại dương xanh). Rất ít đội lựa chọn làm nông nghiệp công nghệ cao.'
    },
    {
      id: 'giao-duc',
      name: 'Giáo Dục & Đào Tạo',
      icon: <GraduationCap className="track-icon" style={{ color: '#fcc419' }} />,
      desc: 'Cá nhân hóa việc học, tối ưu tài nguyên giáo dục và hỗ trợ định hướng phát triển học tập cho người học.',
      difficulty: '5/10 (Trung bình)',
      market: 'Lớn',
      fit: '8/10 (Cao)',
      mvp: 'Trình biên soạn giáo án và bài tập cá nhân hóa AI-Tutor. Hệ thống tự động tạo lộ trình ôn thi dựa trên điểm yếu của từng học sinh thông qua các bài kiểm tra ngắn.',
      workflow: [
        'Học sinh làm bài test đánh giá năng lực đầu vào ngắn (10 câu).',
        'AI phân tích cấu trúc lỗi sai, vẽ bản đồ lỗ hổng kiến thức của học sinh.',
        'AI thiết kế lộ trình ôn tập cá nhân hóa từng ngày (gồm bài đọc và bài tập tương ứng).',
        'AI Tutor đồng hành giải thích chi tiết mỗi khi học sinh chọn sai đáp án bằng ngôn ngữ dễ hiểu.'
      ],
      aiPoints: [
        {
          point: 'Knowledge Gap Analyzer',
          desc: 'Thuật toán AI phân tích logic lỗi sai của học sinh để định vị chính xác phần kiến thức bị hổng.'
        },
        {
          point: 'Dynamic Question Generator',
          desc: 'Tự động tạo ra các bài tập có độ khó tăng dần (Adaptive Learning) phù hợp với tiến trình học tập.'
        }
      ],
      aiProposal: 'Tích hợp thuật toán Adaptive Learning (học tập thích ứng): AI phân tích vết lỗi sai (Error Trace) của học sinh để định vị lỗ hổng kiến thức trên đồ thị khái niệm (Concept Map). Sinh tự động câu hỏi ôn tập lấp đầy lỗ hổng bằng RAG sinh bài tập cá nhân hóa.',
      pm: [
        'Soạn slide thuyết trình nhấn mạnh tính nhân văn của giáo dục cá nhân hóa và đồng hành cùng học sinh.',
        'Viết kịch bản pitch giải thích thuật toán phân định lỗ hổng kiến thức trực quan và logic.'
      ],
      fe: [
        'Sinh giao diện làm bài thi trắc nghiệm tương thích thích ứng (Adaptive Test) với thanh tiến độ sinh động.',
        'Dựng biểu đồ Concept Map hiển thị các lỗ hổng kiến thức của học sinh dưới dạng nút đồ thị trực quan.'
      ],
      be: [
        'Thiết kế Database Schema lưu trữ cây đồ thị kiến thức môn học và lịch sử ôn luyện.',
        'Viết prompt RAG sinh câu hỏi ôn luyện cá nhân hóa tự động dựa trên mức độ hổng kiến thức của học sinh.'
      ],
      swot: {
        s: 'Dễ dàng xây dựng kịch bản chatbot AI Tutor tương tác trực quan sinh động, tạo hiệu ứng tốt khi pitching.',
        w: 'Cần thuật toán phân tích vết lỗi sai phức tạp để lập đồ thị concept học tập chính xác.',
        o: 'Phân khúc thị trường rộng lớn, dễ chiếm cảm tình của hội đồng giám khảo nhờ tính nhân văn cao.',
        t: 'Mức độ cạnh tranh rất cao (đứng thứ 2 toàn giải đấu với 48.5% đội thi đăng ký chọn).'
      },
      tech: 'AI Tutor cá nhân hóa, RAG kiểm tra kiến thức, thuật toán gợi ý lộ trình học tập dựa trên hành vi.',
      challenge: 'Rất nhiều sản phẩm tương tự trên thị trường, cần tìm được ngách thực sự độc đáo.',
      recommendation: 'Nằm trong Phương án 1 (Thế mạnh). Dễ làm demo trực quan sinh động để K.AI thuyết trình.'
    },
    {
      id: 'thien-tai',
      name: 'Phòng Chống Thiên Tai',
      icon: <CloudRain className="track-icon" style={{ color: '#a6aebb' }} />,
      desc: 'Dự báo, mô hình hóa dữ liệu địa lý và xây dựng giải pháp ứng phó — phục hồi trước các thảm họa thiên tai.',
      difficulty: '9/10 (Rất Cao)',
      market: 'Xã Hội',
      fit: '3/10 (Thấp)',
      mvp: 'Bản đồ số dự báo nguy cơ sạt lở và đề xuất luồng cứu hộ tối ưu khi xảy ra bão lũ bằng AI.',
      workflow: [
        'Hệ thống thu thập dữ liệu độ ẩm đất, lượng mưa và ảnh vệ tinh địa hình.',
        'AI tính toán chỉ số rủi ro sạt lở cho từng khu vực cụ thể.',
        'Khi xảy ra thiên tai: AI Agent tự động định tuyến đường cứu hộ tránh các vùng ngập lụt.',
        'AI soạn thảo tin nhắn khẩn cấp hướng dẫn người dân sơ tán gửi tới các nhà mạng.'
      ],
      aiPoints: [
        {
          point: 'Geospatial Deep Learning',
          desc: 'Mô hình học máy phân tích ảnh vệ tinh và bản đồ độ cao số để dự báo sạt lở đất.'
        },
        {
          point: 'Route Optimization AI',
          desc: 'Thuật toán tìm đường tránh chướng ngại vật ngập lụt động thời gian thực.'
        }
      ],
      aiProposal: 'Sử dụng mạng nơ-ron tích chập đồ thị (GCN) hoặc mô hình học máy phân tích dữ liệu không gian địa lý (GIS) dự báo sạt lở. Thiết kế Agent tối ưu hóa lộ trình cứu hộ (Route Planning AI) tránh các điểm ngập động được cập nhật thời gian thực từ cộng đồng.',
      pm: [
        'Soạn slide pitching chạm tới cảm xúc về tính nhân đạo và cứu hộ khẩn cấp bảo vệ sinh mạng người dân.',
        'Viết kịch bản thuyết trình giải thích luồng định tuyến cứu hộ thông minh tránh các điểm ngập động.'
      ],
      fe: [
        'Sinh giao diện bản đồ cứu hộ khẩn cấp tích hợp Mapbox/Leaflet hiển thị các khu vực ngập lụt.',
        'Thiết kế bảng điều khiển định tuyến đường đi tối ưu và tiếp nhận yêu cầu cứu trợ khẩn cấp.'
      ],
      be: [
        'Thiết kế Database lưu trữ tọa độ các điểm ngập động và yêu cầu cứu trợ của người dân thời gian thực.',
        'Viết thuật toán Dijkstra/A* tìm đường đi ngắn nhất tránh các khu vực ngập sâu.'
      ],
      swot: {
        s: 'Ý tưởng nhân văn sâu sắc, giải quyết bài toán cấp bách của đất nước, dễ tạo ấn tượng cực mạnh khi thuyết trình.',
        w: 'Team hoàn toàn thiếu kiến thức học thuật về thủy văn học, bản đồ GIS địa lý phức tạp.',
        o: 'Độ cạnh tranh thấp nhất giải đấu (chỉ 7.4% đội chọn), khả năng giành giải cực cao nếu giải quyết được bài toán thô.',
        t: 'Thời gian 48h là quá ngắn để xử lý dữ liệu viễn thám và dựng bản đồ ngập lụt động chạy mượt mà.'
      },
      tech: 'Học sâu trên dữ liệu viễn thám/vệ tinh, mô hình hóa toán học dòng chảy/lũ lụt.',
      challenge: 'Yêu cầu kiến thức học thuật chuyên sâu và nguồn dữ liệu địa lý cực kỳ phức tạp.',
      recommendation: 'Nằm trong Phương án 2 (Đại dương xanh). Số lượng đội đăng ký cực ít, cơ hội bứt phá nếu giải quyết được bài toán thô.'
    },
    {
      id: 'tai-chinh',
      name: 'Ngân Hàng & Tài Chính',
      icon: <ShieldAlert className="track-icon" style={{ color: '#fcc419' }} />,
      desc: 'Ứng dụng AI để tái định hình ngành tài chính, tự động hóa vận hành, quản trị rủi ro và cá nhân hóa dịch vụ.',
      difficulty: '7.5/10 (Cao)',
      market: 'Cực Kỳ Lớn',
      fit: '6/10 (Trung bình)',
      mvp: 'Trợ lý phân tích tài chính cá nhân thông minh giúp tự động phân loại giao dịch ngân hàng, lập kế hoạch chi tiêu và gợi ý quỹ đầu tư an sau.',
      workflow: [
        'Người dùng kết nối lịch sử giao dịch sao kê tài khoản ngân hàng.',
        'AI tự động phân loại giao dịch (Ăn uống, Di chuyển, Thuê nhà) với độ chính xác cao.',
        'AI phát hiện các khoản đăng ký dịch vụ định kỳ bị lãng phí (Subscriptions) và cảnh báo người dùng.',
        'AI xây dựng kế hoạch tiết kiệm dựa trên thu nhập và mục tiêu tài chính tương lai.'
      ],
      aiPoints: [
        {
          point: 'Transaction Categorization',
          desc: 'Phân loại các chuỗi text giao dịch ngân hàng viết tắt không chuẩn hóa thành nhóm chi tiêu cụ thể.'
        },
        {
          point: 'Financial Advisor Agent',
          desc: 'Soạn thảo lời khuyên tài chính cá nhân dựa trên phân tích dòng tiền thực tế của người dùng.'
        }
      ],
      aiProposal: 'Tích hợp mô hình học máy phát hiện gian lận (Fraud Detection) dựa trên phân tích chuỗi giao dịch bất thường (Anomaly Detection). Xây dựng trợ lý ảo Robo-Advisor phân tích thói quen dòng tiền người dùng, cá nhân hóa lời khuyên đầu tư tài chính thông minh.',
      pm: [
        'Soạn slide pitch làm nổi bật giải pháp quản trị rủi ro giao dịch và bảo mật dữ liệu Fintech.',
        'Viết kịch bản thuyết trình cơ chế phát hiện gian lận tự động bằng học máy.'
      ],
      fe: [
        'Sinh giao diện ứng dụng quản lý chi tiêu cá nhân trực quan, sinh các biểu đồ tròn cơ cấu chi tiêu.',
        'Thiết kế biểu đồ phân tích dòng tiền ra vào hàng tháng và cảnh báo các khoản phí lãng phí.'
      ],
      be: [
        'Thiết kế Database Schema lưu trữ lịch sử giao dịch và phân loại tự động.',
        'Viết API phát hiện các giao dịch bất thường (Anomaly Detection) dựa trên phân tích chuỗi thời gian.'
      ],
      swot: {
        s: 'Tận dụng CSDL Postgres cực tốt của Quân để lưu trữ dòng tiền giao dịch và tối ưu hóa truy vấn SQL tính toán.',
        w: 'Rất khó tiếp cận nguồn dữ liệu sao kê tài khoản ngân hàng thực tế để huấn luyện và kiểm thử.',
        o: 'Dung lượng thị trường Fintech khổng lồ, dễ tiếp cận các nhà tài trợ lớn từ khối ngân hàng thương mại.',
        t: 'Yêu cầu khắt khe về độ chính xác số liệu, rủi ro bảo mật thông tin và quyền riêng tư dòng tiền.'
      },
      tech: 'AI phát hiện gian lận giao dịch, RAG tư vấn đầu tư tài chính cá nhân, Credit Scoring thông minh.',
      challenge: 'Đòi hỏi kiểm định bảo mật gắt gao và độ trễ giao dịch cực thấp.',
      recommendation: 'Đòi hỏi bảo mật nghiêm ngặt. Chỉ nên chọn nếu có hướng làm Fintech cho người trẻ.'
    }
  ];

  const currentTrack = trackData.find(t => t.id === selectedTrack) || trackData[2];

  return (
    <div className="page-content">
      {/* Tiêu đề & Triết lý thi đấu */}
      <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.05, pointerEvents: 'none' }}>
          <Layers size={200} />
        </div>
        <h2><Compass /> Phân tích &amp; Định vị 8 Track thử thách — VAIC 2026</h2>
        <p className="sub" style={{ margin: '0 0 16px', maxWidth: '80%' }}>
          Căn cứ vào tài liệu hướng dẫn <b>VAIC2026_Hackers-guidebook.md</b>, Vibonymus phân tích chi tiết từng track đề bài, từ đó sẵn sàng thiết kế kiến trúc AI tích hợp sâu sắc đạt chuẩn <b>AI-Native Oath</b> ngay khi BTC công bố đề bài chính thức vào 11:00 ngày 17/07.
        </p>
        
        <div className="oath-box" style={{
          marginTop: '20px',
          padding: '16px',
          borderRadius: '12px',
          background: 'rgba(237, 161, 0, 0.04)',
          border: '1px solid rgba(237, 161, 0, 0.15)',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <Zap style={{ color: 'var(--warning)', flexShrink: 0 }} size={24} />
          <div style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
            <b style={{ color: 'var(--text-primary)', textTransform: 'uppercase' }}>100% AI-Native Oath</b>: Sản phẩm nộp bài bắt buộc phải có AI tham gia trực tiếp xử lý logic cốt lõi (Core Business Flow), có tài liệu <i>AI Collaboration Log</i> chứng minh, không chấp nhận việc dùng AI như một chatbot tĩnh bên lề.
          </div>
        </div>
      </div>

      {/* 2 PHƯƠNG ÁN CHỌN TRACK KHI CÔNG BỐ ĐỀ BÀI */}
      <div className="card">
        <h2><ShieldCheck /> 2 Phương án lựa chọn Track thi đấu khi công bố đề bài</h2>
        <p className="sub" style={{ margin: '0 0 16px' }}>Vibonymus chuẩn bị sẵn 2 kịch bản phản ứng nhanh để chốt đề tài ngay sau 11:00 ngày 17/07:</p>
        
        <div className="grid-2">
          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', background: 'rgba(32, 201, 151, 0.03)' }}>
            <h3 style={{ margin: '0 0 8px', color: 'var(--s2)', fontSize: '0.98rem', fontWeight: 800 }}>⚡ Phương án 1: Lĩnh vực team giỏi nhất (Năng lực cốt lõi)</h3>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <b>Nhóm mục tiêu:</b> Năng Suất Doanh Nghiệp (SME) hoặc Giáo Dục.
              <br />
              <b>Ưu điểm:</b> Tận dụng tối đa thế mạnh xử lý Backend/Database Postgres của Quân và khả năng thiết kế UI/UX giao diện mượt mà của Hiếu để dựng sản phẩm mẫu (MVP) hoàn chỉnh, trực quan nhất trong 48h.
              <br />
              <b>Thách thức:</b> Số lượng đối thủ cạnh tranh trực tiếp sẽ rất lớn (dự kiến chiếm &gt;80% số đội thi theo thống kê).
            </p>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', background: 'rgba(42, 120, 214, 0.03)' }}>
            <h3 style={{ margin: '0 0 8px', color: 'var(--s1)', fontSize: '0.98rem', fontWeight: 800 }}>🌊 Phương án 2: Lĩnh vực ít đội thi nhất (Đại dương xanh)</h3>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <b>Nhóm mục tiêu:</b> Phòng Chống Thiên Tai hoặc Nông Nghiệp.
              <br />
              <b>Ưu điểm:</b> Số lượng đội đăng ký cực kỳ ít (lần lượt chiếm 7.4% và 11.0% theo Competitors Info Graphic), giảm thiểu tối đa cạnh tranh trực diện. Ý tưởng độc lạ dễ gây ấn tượng mạnh với Hội đồng Giám khảo.
              <br />
              <b>Thách thức:</b> Đòi hỏi nghiên cứu kiến thức chuyên ngành phức tạp, khó thu thập dữ liệu kiểm chứng và làm giao diện demo sinh động trong thời gian ngắn.
            </p>
          </div>
        </div>
      </div>

      {/* Grid điều hướng & Panel chi tiết */}
      <div className="grid-split">
        
        {/* Danh sách 8 Track bên trái */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {trackData.map((t) => {
            const isSelected = selectedTrack === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTrack(t.id)}
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: isSelected ? '1px solid var(--s1)' : '1px solid var(--border)',
                  background: isSelected ? 'rgba(42, 120, 214, 0.05)' : 'var(--surface-1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: isSelected ? 'none' : 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                    {t.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: isSelected ? 'var(--s1)' : 'var(--text-primary)' }}>
                      {t.name}
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: isSelected ? 'var(--s1)' : 'var(--text-muted)' }} />
              </div>
            );
          })}
        </div>

        {/* Panel Phân tích chi tiết bên phải */}
        <div className="card" style={{ margin: 0, padding: '24px' }}>
          {/* Header Track */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              {currentTrack.icon}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{currentTrack.name}</h3>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{currentTrack.desc}</p>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid-3" style={{ marginBottom: '24px' }}>
            <div className="meta-card">
              <div className="meta-label">Độ khó đề bài</div>
              <div className="meta-value critical">{currentTrack.difficulty}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Dung lượng thị trường</div>
              <div className="meta-value success">{currentTrack.market}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Mức độ phù hợp với Team</div>
              <div className="meta-value warning">{currentTrack.fit}</div>
            </div>
          </div>

          {/* Sub-tabs điều hướng thông tin phân tích */}
          <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
            <button
              onClick={() => setActiveSubTab('overview')}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: activeSubTab === 'overview' ? 'var(--theme-color)' : 'var(--text-secondary)',
                borderBottom: activeSubTab === 'overview' ? '2px solid var(--theme-color)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Phân tích SWOT
            </button>
            <button
              onClick={() => setActiveSubTab('workflow')}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: activeSubTab === 'workflow' ? 'var(--theme-color)' : 'var(--text-secondary)',
                borderBottom: activeSubTab === 'workflow' ? '2px solid var(--theme-color)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Ý tưởng Workflow
            </button>
            <button
              onClick={() => setActiveSubTab('delegation')}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: activeSubTab === 'delegation' ? 'var(--theme-color)' : 'var(--text-secondary)',
                borderBottom: activeSubTab === 'delegation' ? '2px solid var(--theme-color)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Đề xuất Phân công AI
            </button>
            <button
              onClick={() => setActiveSubTab('ai')}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: activeSubTab === 'ai' ? 'var(--theme-color)' : 'var(--text-secondary)',
                borderBottom: activeSubTab === 'ai' ? '2px solid var(--theme-color)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Điểm tích hợp AI
            </button>
          </div>

          {/* Content panel */}
          <div style={{ minHeight: '220px' }}>
            
            {/* Overview Panel (SWOT Analysis) */}
            {activeSubTab === 'overview' && (
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Target size={16} style={{ color: 'var(--s1)' }} />
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Mục tiêu sản phẩm MVP dự kiến:</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{currentTrack.mvp}</p>
                </div>

                {/* SWOT Analysis Grid */}
                <div className="grid-2" style={{ gap: '14px', marginTop: '16px' }}>
                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(32, 201, 151, 0.04)', border: '1px solid rgba(32, 201, 151, 0.15)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--s2)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>💪 Strengths (S) - Điểm mạnh</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{currentTrack.swot.s}</p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(240, 62, 62, 0.04)', border: '1px solid rgba(240, 62, 62, 0.15)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--critical)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>⚠️ Weaknesses (W) - Điểm yếu</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{currentTrack.swot.w}</p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(42, 120, 214, 0.04)', border: '1px solid rgba(42, 120, 214, 0.15)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--s1)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>🚀 Opportunities (O) - Cơ hội</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{currentTrack.swot.o}</p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(245, 159, 0, 0.04)', border: '1px solid rgba(245, 159, 0, 0.15)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--warning)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>🔥 Threats (T) - Thách thức</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{currentTrack.swot.t}</p>
                  </div>
                </div>

                <div style={{ marginTop: '16px', padding: '14px', borderRadius: '10px', background: 'var(--surface-page)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Thách thức lớn nhất khi vận hành:</div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{currentTrack.challenge}</p>
                </div>
              </div>
            )}

            {/* Workflow Panel */}
            {activeSubTab === 'workflow' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <PlayCircle size={16} style={{ color: 'var(--s1)' }} />
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Ý tưởng luồng vận hành của giải pháp:</span>
                </div>
                <div className="workflow-list">
                  {/* Vertical Line */}
                  <div className="workflow-line"></div>

                  {currentTrack.workflow.map((step, index) => (
                    <div key={index} className="workflow-step">
                      {/* Node Dot */}
                      <div className="workflow-dot"></div>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Bước {index + 1}:</span> {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Đề xuất Phân công AI Panel (NEWLY MOVED HERE) */}
            {activeSubTab === 'delegation' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Zap size={16} style={{ color: 'var(--s1)' }} />
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Đề xuất Phân công Cộng tác AI chi tiết cho từng thành viên:</span>
                </div>

                <div className="grid-3" style={{ gap: '14px' }}>
                  {/* Cột PM */}
                  <div className="meta-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', background: 'var(--surface-page)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                      <User size={14} style={{ color: 'var(--s1)' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--s1)' }}>K.AI (PM &amp; Slide)</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      <ul style={{ paddingLeft: '14px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {currentTrack.pm.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Cột Frontend */}
                  <div className="meta-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', background: 'var(--surface-page)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                      <Layout size={14} style={{ color: 'var(--s3)' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--s3)' }}>Hiếu (Frontend)</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      <ul style={{ paddingLeft: '14px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {currentTrack.fe.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Cột Backend */}
                  <div className="meta-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', background: 'var(--surface-page)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                      <Server size={14} style={{ color: 'var(--s2)' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--s2)' }}>Quân (Backend &amp; DB)</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      <ul style={{ paddingLeft: '14px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {currentTrack.be.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Integration Points Panel */}
            {activeSubTab === 'ai' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Zap size={16} style={{ color: 'var(--warning)' }} />
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Điểm then chốt tích hợp AI (AI-Native Points):</span>
                </div>
                <div className="flex-column">
                  {currentTrack.aiPoints.map((pt, index) => (
                    <div key={index} className="ai-point-card">
                      <div className="ai-point-title">
                        {index + 1}. {pt.point}
                      </div>
                      <p className="ai-point-desc">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                  
                  {/* AI Proposal Section */}
                  <div style={{ 
                    marginTop: '16px', 
                    padding: '16px', 
                    borderRadius: '10px', 
                    background: 'rgba(42, 120, 214, 0.04)', 
                    border: '1px solid rgba(42, 120, 214, 0.15)' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Zap size={16} style={{ color: 'var(--s1)' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)' }}>AI kiến nghị kiến trúc &amp; defensibility cho đề tài này:</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {currentTrack.aiProposal}
                    </p>
                  </div>

                  <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    * Công nghệ dự kiến áp dụng: {currentTrack.tech}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Tracks;
