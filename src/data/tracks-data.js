/**
 * Thang điểm 100, chia 6 tiêu chí định lượng — công thức áp dụng thống nhất cho cả 8 track:
 * - market /20: chấm tay theo quy mô khách hàng tiềm năng thực tế tại VN (đã ghi rõ marketBasis).
 * - teamFit /20 = (teamFitRaw / 10) × 20 — đối chiếu năng lực hiện có của Vibonymus với yêu cầu track.
 * - feasibility /15 = (10 − difficultyRaw) / 10 × 15 — độ khó đề bài càng cao, khả thi dựng MVP trong 48h càng thấp.
 * - competition /15 = 15 × (1 − competitionPercent / 100) — % đội đã đăng ký quan tâm track, dữ liệu thật từ 233 đội cào được (hub.aiforvietnam.org, 14/07/2026).
 * - dataReadiness /15: chấm tay theo khả năng có dữ liệu/API giả lập thật để dựng demo thuyết phục trong 48h (đã ghi rõ dataReadinessBasis).
 * - legalRisk /15: chấm tay theo mức độ AN TOÀN pháp lý/đạo đức dữ liệu — điểm càng cao nghĩa là rủi ro càng THẤP (đã ghi rõ legalRiskBasis).
 *
 * Phân công 6 thành viên Vibonymus (khớp src/data/roles-data.js):
 * - kai   = K.AI  (Đội trưởng · Tech Lead · Backend & Database · AI Plan)
 * - quan  = Quân  (Frontend & UI/UX)
 * - mai   = Mai   (QC & Quản lý hiệu suất)
 * - quang = Quang (AI Core, Agent & Grounding/RAG)
 * - lam   = Lâm   (Computer Vision, Security & Pentest)
 * - yen   = Yến   (Business, Pilot & Kinh doanh)
 */
export function calcTrackScore(score) {
  const teamFit = Math.round((score.teamFitRaw / 10) * 20);
  const feasibility = Math.round(((10 - score.difficultyRaw) / 10) * 15);
  const competition = Math.round(15 * (1 - score.competitionPercent / 100));
  const total = score.market + teamFit + feasibility + competition + score.dataReadiness + score.legalRisk;
  return { ...score, teamFit, feasibility, competition, total };
}

export const trackData = [
  {
    id: 'y-te',
    name: 'Y Tế & Sức Khỏe',
    iconName: 'Heart',
    iconColor: '#ff6b6b',
    desc: 'Ứng dụng AI trong chăm sóc sức khỏe: hỗ trợ chẩn đoán, tối ưu vận hành và nâng cao chất lượng dịch vụ y tế.',
    score: {
      market: 16, marketBasis: 'Thị trường y tế số lớn nhưng bị giới hạn bởi rào cản pháp lý và quy trình kiểm định lâm sàng.',
      teamFitRaw: 4, difficultyRaw: 8, competitionPercent: 26.6,
      dataReadiness: 5, dataReadinessBasis: 'Dữ liệu bệnh án thật cực khó tiếp cận trong 48h vì quy định bảo mật y tế — chỉ có thể demo bằng dữ liệu giả lập.',
      legalRisk: 3, legalRiskBasis: 'Rủi ro pháp lý rất cao nếu AI gợi ý chẩn đoán/đơn thuốc sai — ảnh hưởng trực tiếp sức khỏe người dùng thực tế.'
    },
    mvp: 'Hệ thống AI Copilot hỗ trợ bác sĩ tóm tắt hồ sơ bệnh án, tra cứu phác đồ điều trị từ nguồn uy tín và gợi ý chẩn đoán sơ bộ — định vị rõ là công cụ hỗ trợ tham khảo, không thay thế bác sĩ.',
    workflow: [
      'Bác sĩ upload hồ sơ/ghi chú bệnh án (dạng text hoặc ghi âm giọng nói).',
      'Lâm dựng Computer Vision Agent nhận diện chữ viết tay, chuyển hóa dữ liệu thô thành JSON chuẩn hóa.',
      'Quang xây Medical RAG Agent đối chiếu triệu chứng với phác đồ điều trị chính thống của Bộ Y Tế qua Vector DB.',
      'LLM tổng hợp gợi ý chẩn đoán sơ bộ kèm trích dẫn nguồn, luôn hiển thị cảnh báo "cần bác sĩ xác nhận".'
    ],
    aiPoints: [
      { point: 'OCR & Cấu trúc hóa (Lâm)', desc: 'Dùng Gemini Pro Vision/model Computer Vision nhận diện chữ viết tay bác sĩ và cấu trúc hóa dữ liệu bệnh án.' },
      { point: 'Medical RAG Grounding (Quang)', desc: 'Vector DB chứa phác đồ điều trị chính thống của Bộ Y Tế để grounding câu trả lời, chống hallucination.' }
    ],
    aiProposal: 'Quang thiết kế Agent 2 tầng: tầng 1 phân loại triệu chứng bằng LLM, tầng 2 grounding trên GraphRAG dữ liệu phác đồ điều trị Bộ Y Tế trước khi trả lời. Lâm phụ trách pipeline Computer Vision đọc chữ viết tay/ảnh xét nghiệm và rà soát bảo mật luồng dữ liệu bệnh án. Vì rủi ro pháp lý cao (chỉ 3/15 điểm an toàn), sản phẩm bắt buộc hiển thị disclaimer rõ ràng ở mọi màn hình kết quả.',
    kai: [
      'Thiết kế DB schema Postgres lưu hồ sơ bệnh án mã hóa, đáp ứng yêu cầu bảo mật y tế cơ bản.',
      'Lên AI Plan: vạch ranh giới rõ giữa AI tra cứu hỗ trợ (an toàn) và AI đưa chẩn đoán cuối (rủi ro pháp lý cao, cần disclaimer).'
    ],
    quan: [
      'Dựng giao diện Dashboard nhập bệnh án, upload ảnh toa thuốc/phiếu xét nghiệm.',
      'Thiết kế biểu đồ theo dõi chỉ số sinh tồn bệnh nhân, tối ưu để bác sĩ đọc nhanh khi demo.'
    ],
    mai: [
      'Xây bộ test case đánh giá độ chính xác gợi ý chẩn đoán trên dữ liệu bệnh án mẫu trước khi nộp bài.',
      'Theo dõi tiến độ tích hợp OCR–RAG–giao diện, cảnh báo sớm nếu có nguy cơ trễ Checkpoint.'
    ],
    quang: [
      'Xây Medical RAG: grounding câu trả lời trên phác đồ điều trị Bộ Y Tế qua Vector DB, giảm hallucination.',
      'Thiết kế Agent phân loại triệu chứng → tra cứu phác đồ → gợi ý chẩn đoán sơ bộ kèm trích dẫn nguồn.'
    ],
    lam: [
      'Dùng Computer Vision (Gemini Pro Vision) nhận diện chữ viết tay bác sĩ, cấu trúc hóa dữ liệu bệnh án.',
      'Rà soát bảo mật luồng dữ liệu bệnh án (mã hóa, phân quyền truy cập) trước khi demo.'
    ],
    yen: [
      'Phân tích tính khả thi thương mại: rào cản pháp lý y tế VN rất cao, định vị sản phẩm là "công cụ hỗ trợ bác sĩ", không thay thế chẩn đoán.',
      'Chuẩn bị luận điểm pitch nhấn mạnh cơ chế kiểm soát hallucination và an toàn dữ liệu trước hội đồng.'
    ],
    swot: {
      s: 'Lâm có kinh nghiệm Computer Vision thực chiến (dự án U-Mamba, ICISN 2026) và Quang có nền tảng AI/ML để dựng Medical RAG chống hallucination — đúng năng lực chuyên sâu track này cần.',
      w: 'Cả team không có ai có nền tảng y sinh học để tự kiểm chứng tính an toàn của các khuyến nghị chẩn đoán/đơn thuốc.',
      o: 'Nhu cầu số hóa hồ sơ y tế và tư vấn từ xa tại VN lớn, track này chỉ 26,6% trong 233 đội chọn — ít cạnh tranh hơn SME/Giáo dục.',
      t: 'Rủi ro pháp lý và đạo đức cực cao nếu AI gợi ý sai (điểm an toàn chỉ 3/15) — bắt buộc giới hạn phạm vi demo ở "hỗ trợ tra cứu", tránh mọi tuyên bố chẩn đoán chắc chắn.'
    },
    tech: 'Computer Vision (OCR y tế), Medical RAG grounding trên Vector DB, LLM có System Instruction giới hạn phạm vi tư vấn.',
    challenge: 'Đòi hỏi độ chính xác gần tuyệt đối và giới hạn rõ phạm vi AI được phép kết luận — sai sót ảnh hưởng trực tiếp an toàn người dùng.',
    recommendation: 'Chỉ nên chọn nếu Quang/Lâm tự tin kiểm soát hallucination tốt trong 48h; điểm benchmark 46/100 xếp gần cuối — không phải lựa chọn ưu tiên.'
  },
  {
    id: 'doi-moi',
    name: 'Đổi Mới Sáng Tạo',
    iconName: 'Compass',
    iconColor: '#4dabf7',
    desc: 'Phát triển sản phẩm mới, cải tiến quy trình và ứng dụng phương pháp đổi mới sáng tạo thúc đẩy kinh doanh.',
    score: {
      market: 12, marketBasis: 'Không có phân khúc khách hàng cụ thể — thị trường "mở" nhưng khó định lượng quy mô thực tế.',
      teamFitRaw: 6, difficultyRaw: 6, competitionPercent: 54.9,
      dataReadiness: 10, dataReadinessBasis: 'Không phụ thuộc dữ liệu ngành cụ thể — có thể tự tạo dữ liệu mẫu tuỳ theo ý tưởng chọn.',
      legalRisk: 13, legalRiskBasis: 'Không đụng dữ liệu cá nhân/nhạy cảm, rủi ro pháp lý gần như không có.'
    },
    mvp: 'Nền tảng AI Agent hỗ trợ brainstorm ý tưởng sản phẩm, tự phản biện qua Multi-Agent Debate và sinh nhanh landing page demo.',
    workflow: [
      'Người dùng nhập ý tưởng ban đầu sơ sài.',
      'Quang dựng Market Analysis Agent phân tích xu hướng, đề xuất 3 hướng mô hình kinh doanh tiềm năng.',
      'Multi-Agent Debate (1 Agent đóng nhà đầu tư khó tính, 1 Agent đóng đối thủ) tự phản biện ý tưởng, sinh SWOT & PRD.',
      'Quân dùng AI sinh nhanh landing page demo minh họa ý tưởng cuối cùng.'
    ],
    aiPoints: [
      { point: 'Market Analysis Agent (Quang)', desc: 'LLM phân tích xu hướng tìm kiếm, gợi ý ngách sản phẩm ít cạnh tranh dựa trên dữ liệu công khai.' },
      { point: 'Multi-Agent Debate (Quang)', desc: '2 Agent tranh luận vai nhà đầu tư/đối thủ để nhóm tự phản biện, tránh ý tưởng chung chung.' }
    ],
    aiProposal: 'Vì track này không có đề bài cố định, tính "AI-Native" rất dễ bị đánh giá hời hợt nếu chỉ dùng AI sinh nội dung tĩnh. Quang nên thiết kế hẳn 1 hệ Multi-Agent Debate thật (không phải chatbot đơn) làm lõi kỹ thuật chính; Lâm hỗ trợ đánh giá tính khả thi kỹ thuật của ý tưởng được chọn, nhất là nếu ý tưởng liên quan Computer Vision/bảo mật.',
    kai: [
      'Quyết định kiến trúc kỹ thuật tổng thể sau khi chốt ý tưởng cụ thể — đây là track rủi ro nhất vì chưa biết trước đề bài thật.',
      'Chuẩn bị sẵn boilerplate linh hoạt, dễ đổi hướng nhanh trong 48h.'
    ],
    quan: [
      'Dùng AI sinh nhanh boilerplate HTML/CSS/React cho landing page giới thiệu ý tưởng.',
      'Dựng mock biểu đồ dự báo tăng trưởng kinh doanh sinh động cho phần demo.'
    ],
    mai: [
      'Theo dõi tiến độ chốt ý tưởng đúng hạn — rủi ro lớn nhất của track này là lan man, không chốt kịp.',
      'Đánh giá thử tính thuyết phục của ý tưởng qua góc nhìn người ngoài trước khi demo chính thức.'
    ],
    quang: [
      'Thiết kế Multi-Agent Debate: 1 Agent phản biện vai nhà đầu tư khó tính, 1 Agent vai đối thủ cạnh tranh.',
      'Xây Agent phân tích xu hướng thị trường, gợi ý ngách sản phẩm ít cạnh tranh.'
    ],
    lam: [
      'Đánh giá tính khả thi kỹ thuật của ý tưởng được chọn trong 48h, cảnh báo sớm nếu quá tham vọng.',
      'Hỗ trợ bảo mật cơ bản nếu ý tưởng có phần thu thập dữ liệu người dùng.'
    ],
    yen: [
      'Đánh giá tính khả thi kinh doanh và market validation cho từng hướng ý tưởng trước khi chốt.',
      'Chuẩn bị luận điểm pitch nhấn mạnh tính độc đáo, tránh bị đánh giá "ý tưởng chung chung" — điểm yếu lớn nhất của track này.'
    ],
    swot: {
      s: 'Track mở, không giới hạn công nghệ — team tận dụng đúng thế mạnh AI Agent của Quang thay vì phải học ngành mới trong 48h.',
      w: 'Khó chứng minh chiều sâu kỹ thuật (AI defensibility) nếu không chọn được hướng đủ sắc — rủi ro lớn nhất là "làm cho có AI" mà không giải quyết nỗi đau thật.',
      o: 'Track được nhiều đội chọn nhất (54,9% trong 233 đội) nhưng đa số làm hời hợt — cơ hội bứt phá nếu Vibonymus có ý tưởng đủ sắc và Multi-Agent Debate làm lõi kỹ thuật thật.',
      t: 'Cạnh tranh đông nhất giải đấu, dễ bị giám khảo đánh giá trùng lặp nếu không tìm được góc nhìn khác biệt.'
    },
    tech: 'Multi-Agent Debate framework (LangGraph/CrewAI), LLM phân tích xu hướng thị trường, code generator cho landing page.',
    challenge: 'Ý tưởng dễ chung chung; chỉ nên chọn khi có concept cụ thể đủ mạnh ngay khi công bố đề, không phải chọn vì "an toàn".',
    recommendation: 'Phương án dự phòng (điểm benchmark 60/100, cao thứ 3) — chỉ chọn khi đọc đề thấy ý tưởng thật sự độc đáo, không chọn mặc định vì đông đội làm.'
  },
  {
    id: 'nang-suat-sme',
    name: 'Năng Suất Doanh Nghiệp (SME)',
    iconName: 'Briefcase',
    iconColor: '#20c997',
    desc: 'Xây dựng AI Agent cách mạng hóa vận hành, tự động hóa quy trình nghiệp vụ cho doanh nghiệp vừa và nhỏ (SME).',
    score: {
      market: 20, marketBasis: '~921.000 doanh nghiệp SME đang hoạt động tại Việt Nam (Tổng cục Thống kê) — nhóm khách hàng lớn nhất trong 8 track.',
      teamFitRaw: 9.5, difficultyRaw: 6, competitionPercent: 41.6,
      dataReadiness: 13, dataReadinessBasis: 'Dễ giả lập dữ liệu CRM, email, tồn kho bằng dataset mẫu hoặc mock API trong vài giờ.',
      legalRisk: 12, legalRiskBasis: 'Dữ liệu doanh nghiệp mô phỏng, không đụng thông tin cá nhân nhạy cảm.'
    },
    mvp: 'Hệ thống Multi-Agent đóng vai trò là "Nhân sự ảo chuyên nghiệp" hỗ trợ doanh nghiệp SME tự động phản hồi email khách hàng, đối soát hóa đơn bán hàng và cập nhật tồn kho tự động.',
    workflow: [
      'Khách hàng gửi yêu cầu qua Email hoặc Chatbot.',
      'Email Analyzer Agent (Quang) phân loại yêu cầu: Hỏi hàng, Khiếu nại, hay Yêu cầu báo giá.',
      'Nếu hỏi hàng: AI tự động kết nối API kiểm tra tồn kho trong cơ sở dữ liệu Postgres do K.AI thiết kế.',
      'Invoice Generator Agent tự sinh hóa đơn tạm tính và soạn thư phản hồi gửi lại khách hàng.',
      'Nếu phát sinh khiếu nại: Agent tự động cập nhật trạng thái vào CRM và gửi thông báo khẩn cấp đến Slack/Telegram của nhóm vận hành.'
    ],
    aiPoints: [
      { point: 'Intent Routing Agent (Quang)', desc: 'Dùng Claude để phân loại ý định khách hàng với độ chính xác cao và định tuyến luồng xử lý phù hợp.' },
      { point: 'RAG on Product Catalog (Quang)', desc: 'Truy xuất thông tin sản phẩm và chính sách hoàn trả thời gian thực từ cơ sở dữ liệu tri thức của công ty.' },
      { point: 'Function Calling (Quang, bảo mật do Lâm rà soát)', desc: 'AI tự quyết định khi nào cần gọi API cập nhật kho hàng hoặc sinh mã giảm giá giữ chân khách hàng.' }
    ],
    aiProposal: 'Quang dựng kiến trúc Multi-Agent LangGraph: Intent Routing Agent, SQL Agent tự sinh truy vấn đối soát kho Postgres, và Action Agent gọi webhook Slack. K.AI đảm bảo Backend/DB đủ nhanh cho các Agent truy vấn thời gian thực; Lâm rà soát bảo mật các Function Calling gọi API thật (cập nhật kho, sinh mã giảm giá) để tránh Agent bị lợi dụng.',
    kai: [
      'Thiết kế DB schema Postgres đối soát tồn kho/hóa đơn, xây API Backend chính cho hệ Multi-Agent.',
      'Lên AI Plan tổng thể: xác định Agent nào tự quyết định, Agent nào cần con người duyệt trước khi hành động.'
    ],
    quan: [
      'Sinh giao diện Admin Dashboard hiển thị danh sách AI Agent đang chạy và lịch sử log.',
      'Thiết kế form cấu hình/gán quyền cho nhân sự ảo AI, tối giản để chủ SME không rành công nghệ vẫn dùng được.'
    ],
    mai: [
      'QC luồng end-to-end: Email → Intent Routing → Invoice/CRM, đảm bảo không rơi request nào.',
      'Đo lường & báo cáo % giảm thời gian xử lý thủ công — số liệu này là luận điểm pitch chính.'
    ],
    quang: [
      'Dựng kiến trúc Multi-Agent LangGraph: Intent Routing Agent, SQL Agent đối soát kho Postgres, Action Agent gọi webhook Slack.',
      'Tối ưu RAG trên catalog sản phẩm & chính sách hoàn trả để trả lời khách hàng chính xác.'
    ],
    lam: [
      'Rà soát bảo mật các Function Calling gọi API thật (cập nhật kho, sinh mã giảm giá) — tránh Agent gọi sai/bị lợi dụng.',
      'Backup Quân về code Frontend nếu cần gấp trước checkpoint.'
    ],
    yen: [
      'Xây business case định lượng: SME VN có ~921.000 doanh nghiệp — thị trường lớn nhất trong 8 track.',
      'Chuẩn bị luận điểm pitch nhấn mạnh khả năng thương mại hóa thật, không chỉ demo hackathon.'
    ],
    swot: {
      s: 'Đúng năng lực cốt lõi của team: K.AI mạnh Backend/Database, Quang mạnh AI Agent/RAG, Quân mạnh UI/UX — 3 mảnh ghép khớp hoàn toàn yêu cầu track.',
      w: 'Cần tích hợp nhiều nghiệp vụ API giả lập (CRM, Slack, email) trong thời gian ngắn — Lâm cần hỗ trợ bảo mật các điểm gọi API này.',
      o: 'Thị trường SME VN cực lớn (~921.000 doanh nghiệp), tính ứng dụng thực tế và khả năng thương mại hóa cao nhất trong 8 track.',
      t: 'Track cạnh tranh nhiều thứ nhì (41,6% trong 233 đội) — cần điểm khác biệt rõ ràng (Multi-Agent thật, không phải chatbot đơn) để nổi bật.'
    },
    tech: 'Multi-Agent Frameworks (LangGraph, CrewAI), RAG trên tài liệu doanh nghiệp, Automation Tooling (Make/Zapier).',
    challenge: 'Cần thiết kế UI/UX cực kỳ đơn giản để chủ doanh nghiệp không rành công nghệ có thể sử dụng dễ dàng.',
    recommendation: 'Track điểm benchmark cao nhất (79/100) — ưu tiên số 1, tận dụng đúng thế mạnh Backend (K.AI), AI Agent (Quang) và UI/UX (Quân).'
  },
  {
    id: 'chinh-phu-so',
    name: 'Chính Phủ Thông Minh',
    iconName: 'Landmark',
    iconColor: '#748ffc',
    desc: 'Giải pháp cho thành phố thông minh, cải thiện dịch vụ hành chính công số và tương tác với người dân.',
    score: {
      market: 10, marketBasis: 'Mô hình B2G — số đầu mối khách hàng (cơ quan hành chính) giới hạn dù tác động tới hàng chục triệu người dân.',
      teamFitRaw: 5, difficultyRaw: 7, competitionPercent: 15.5,
      dataReadiness: 4, dataReadinessBasis: 'Không thể giả lập hệ thống lõi (Core) của chính phủ trong 48h — khó dựng demo đầu-cuối thực tế.',
      legalRisk: 6, legalRiskBasis: 'Dữ liệu công dân (CCCD, hộ khẩu) thuộc nhóm nhạy cảm cao, quy định bảo mật hành chính công nghiêm ngặt.'
    },
    mvp: 'Trợ lý ảo CitizenCopilot giúp người dân tra cứu thủ tục hành chính, tự động điền form giấy tờ công chứng và hướng dẫn quy trình dịch vụ công trực tuyến.',
    workflow: [
      'Người dân mô tả nhu cầu bằng ngôn ngữ tự nhiên (ví dụ: "Tôi muốn đăng ký kết hôn").',
      'Quang dựng Administrative RAG Agent tra cứu chính xác các loại giấy tờ cần thiết từ văn bản pháp luật hành chính.',
      'Lâm dựng Computer Vision Agent hướng dẫn chụp ảnh CCCD, tự động trích xuất thông tin điền vào tờ khai mẫu.',
      'AI kiểm tra tính hợp lệ của tờ khai trước khi người dân nhấn nộp, luôn kèm cảnh báo "cần xác nhận tại cơ quan chức năng".'
    ],
    aiPoints: [
      { point: 'OCR Extract & Autofill (Lâm)', desc: 'Dùng Computer Vision trích xuất thông tin giấy tờ tùy thân, điền tự động vào biểu mẫu hành chính phức tạp.' },
      { point: 'Administrative RAG (Quang)', desc: 'Đối chiếu các điều khoản pháp luật, thông tư hướng dẫn hành chính công thực tế để tư vấn chính xác.' }
    ],
    aiProposal: 'Quang xây RAG đối chiếu hồ sơ với văn bản pháp luật hành chính công thật (không tự bịa quy định), Lâm phụ trách OCR trích xuất CCCD/hộ khẩu. Vì không thể giả lập hệ thống lõi chính phủ trong 48h (điểm sẵn sàng dữ liệu chỉ 4/15), nên giới hạn demo ở phạm vi "trợ lý tra cứu & điền hộ form" thay vì tuyên bố kết nối thật với hệ thống nhà nước.',
    kai: [
      'Thiết kế CSDL Postgres lưu lịch sử xử lý hồ sơ dịch vụ công, đảm bảo chuẩn bảo mật cơ bản.',
      'Lên AI Plan giới hạn phạm vi: AI chỉ tra cứu & điền form hộ, không tự quyết định thay cơ quan nhà nước.'
    ],
    quan: [
      'Sinh giao diện Cổng dịch vụ công trực tuyến tối giản, form tự điền sau khi quét ảnh CCCD.',
      'Thiết kế chatbot hướng dẫn thủ tục hành chính từng bước bằng ngôn ngữ thân thiện, dễ hiểu với người lớn tuổi.'
    ],
    mai: [
      'QC độ chính xác OCR trích xuất CCCD/hộ khẩu trước khi demo — sai sót ở đây rất dễ bị giám khảo bắt lỗi.',
      'Theo dõi tiến độ sát sao vì đây là track khó dựng demo đầu-cuối thực tế nhất (điểm sẵn sàng dữ liệu chỉ 4/15).'
    ],
    quang: [
      'Xây Administrative RAG: đối chiếu hồ sơ với nghị định/thông tư hành chính công để cảnh báo thiếu sót trước khi nộp.',
      'Giới hạn phạm vi Agent chỉ tư vấn, không tự động phê duyệt hồ sơ thay cơ quan nhà nước.'
    ],
    lam: [
      'Dùng Computer Vision/OCR trích xuất thông tin từ ảnh CCCD/hộ khẩu, tự động điền form.',
      'Rà soát bảo mật dữ liệu công dân — nhóm dữ liệu nhạy cảm cao, cần mã hóa nghiêm ngặt.'
    ],
    yen: [
      'Đánh giá thực tế: mô hình B2G khó bán trực tiếp, nên định vị sản phẩm hướng tới cổng thông tin công dân thay vì thay thế hệ thống lõi chính phủ.',
      'Chuẩn bị luận điểm pitch nhấn mạnh giá trị xã hội dù thị trường B2G khó thương mại hóa nhanh.'
    ],
    swot: {
      s: 'Lâm có kinh nghiệm Computer Vision/OCR thực chiến và Quang có nền tảng RAG — đủ năng lực dựng phần trích xuất & tra cứu pháp luật.',
      w: 'Không ai trong team có kinh nghiệm làm việc trực tiếp với hệ thống hành chính công, khó giả lập luồng demo đầu-cuối thực tế.',
      o: 'Nhận được sự ủng hộ và định hướng mạnh mẽ từ ban tổ chức trong khuôn khổ chuyển đổi số dịch vụ hành chính công; track ít cạnh tranh (15,5%).',
      t: 'Quy trình thủ tục hành chính công phức tạp, đòi hỏi bảo mật dữ liệu công dân cực kỳ nghiêm ngặt.'
    },
    tech: 'Computer Vision/OCR số hóa giấy tờ, Administrative RAG tra cứu văn bản pháp luật, xử lý ngôn ngữ tự nhiên phân loại yêu cầu người dân.',
    challenge: 'Đòi hỏi sự am hiểu sâu về quy trình thủ tục hành chính công và độ bảo mật dữ liệu cao.',
    recommendation: 'Điểm benchmark 48/100 — không khuyến khích do tính chất B2G khó triển khai demo thực tế đầu-cuối trong cuộc thi.'
  },
  {
    id: 'nong-nghiep',
    name: 'Nông Nghiệp Công Nghệ Cao',
    iconName: 'Leaf',
    iconColor: '#51cf66',
    desc: 'Tối ưu chuỗi cung ứng nông sản, canh tác chính xác và ứng dụng AI thích ứng với biến đổi khí hậu.',
    score: {
      market: 10, marketBasis: '~9,1 triệu hộ nông dân cả nước, nhưng khả năng chi trả cho SaaS AI thấp và phụ thuộc hạ tầng IoT sẵn có.',
      teamFitRaw: 4, difficultyRaw: 8, competitionPercent: 9,
      dataReadiness: 4, dataReadinessBasis: 'Có dataset ảnh bệnh lá công khai (VD: PlantVillage) nhưng thiếu dữ liệu cảm biến IoT thực tế cho phần tưới tiêu.',
      legalRisk: 13, legalRiskBasis: 'Dữ liệu nông nghiệp không nhạy cảm, rủi ro pháp lý thấp.'
    },
    mvp: 'Ứng dụng AI phân tích hình ảnh lá cây phát hiện sâu bệnh hại và lập lịch tưới tiêu, bón phân thông minh dựa trên dự báo thời tiết.',
    workflow: [
      'Nông dân chụp ảnh lá cây bị sâu bệnh tải lên hệ thống.',
      'Lâm fine-tune Computer Vision Model phân loại loại sâu bệnh và mức độ thiệt hại.',
      'Quang dựng Irrigation Decision Agent kết hợp kết quả CV với dữ liệu cảm biến (giả lập) để đề xuất phương án điều trị.',
      'Agent tổng hợp dự báo thời tiết 7 ngày tới để đưa ra khuyến nghị thời điểm phun thuốc tối ưu.'
    ],
    aiPoints: [
      { point: 'Disease Classification (Lâm)', desc: 'Model Computer Vision (YOLOv11 fine-tuned) nhận diện bệnh hại cây trồng qua ảnh chụp thời gian thực.' },
      { point: 'Irrigation Decision Agent (Quang)', desc: 'Agent phân tích độ ẩm đất, nhiệt độ và dự báo mưa để tự động ra quyết định đóng/mở van tưới.' }
    ],
    aiProposal: 'Lâm là người phù hợp nhất dựng lõi Computer Vision (đã có kinh nghiệm thật với YOLOv11 qua dự án U-Mamba) fine-tune trên dataset ảnh bệnh lá công khai. Quang xây Agent kết hợp kết quả CV với dữ liệu cảm biến giả lập (NPK, độ ẩm) và API thời tiết để ra khuyến nghị tưới tiêu — đây là phần thể hiện tư duy Agent thật, không chỉ là "app nhận diện ảnh" đơn thuần.',
    kai: [
      'Thiết kế CSDL lưu lịch sử phun thuốc/bón phân/dự báo thời tiết.',
      'Lên AI Plan tích hợp Computer Vision (Lâm) với Agent ra quyết định (Quang) và dữ liệu cảm biến IoT giả lập.'
    ],
    quan: [
      'Sinh giao diện bản đồ nông trại hiển thị độ ẩm/NPK từng khu vực đất.',
      'Thiết kế trang chẩn đoán sâu bệnh qua ảnh chụp tải lên, tối ưu cho người dùng ít rành công nghệ (nông dân).'
    ],
    mai: [
      'QC độ chính xác model nhận diện sâu bệnh trên dataset test trước demo.',
      'Theo dõi tiến độ chặt — track thiếu dữ liệu IoT thật nên rủi ro chậm tiến độ cao (điểm sẵn sàng dữ liệu chỉ 4/15).'
    ],
    quang: [
      'Xây Agent phân tích chỉ số cảm biến đất (giả lập) và dự báo thời tiết để ra khuyến nghị tưới tiêu.',
      'Tích hợp kết quả Computer Vision của Lâm vào luồng ra quyết định tự động.'
    ],
    lam: [
      'Dùng kinh nghiệm Computer Vision thật (YOLOv11, dự án U-Mamba) fine-tune model nhận diện bệnh lá trên dataset công khai (PlantVillage).',
      'Ước lượng tỉ lệ sâu bệnh hại từ ảnh chụp thực tế — đây là phần kỹ thuật nặng nhất của track.'
    ],
    yen: [
      'Đánh giá thị trường: ~9,1 triệu hộ nông dân nhưng khả năng chi trả SaaS AI thấp — nên định vị mô hình B2B qua hợp tác xã thay vì bán lẻ từng hộ.',
      'Chuẩn bị luận điểm pitch tận dụng lợi thế "đại dương xanh" (chỉ 9% trong 233 đội chọn track này).'
    ],
    swot: {
      s: 'Lâm có kinh nghiệm Computer Vision thực chiến (YOLOv11, dự án U-Mamba) — model nhận diện sâu bệnh qua ảnh lá cây khớp đúng năng lực này.',
      w: 'Team thiếu thiết bị cảm biến IoT thật, phải giả lập toàn bộ dữ liệu tưới tiêu đầu vào.',
      o: 'Mật độ cạnh tranh thấp nhất giải đấu (chỉ 9% trong 233 đội chọn), là cơ hội vàng bứt phá điểm số nếu làm tốt phần giao diện.',
      t: 'Ý tưởng dễ bị lý thuyết hóa, khó thuyết phục giám khảo nông nghiệp nếu thiếu số liệu kiểm thử thực tế.'
    },
    tech: 'Computer Vision phát hiện sâu bệnh (Lâm), Agent ra quyết định tưới tiêu dựa trên cảm biến + thời tiết (Quang).',
    challenge: 'Cần phần cứng IoT hoặc tập dữ liệu cảm biến thời gian thực, khó làm demo trực quan sinh động.',
    recommendation: 'Nằm trong Phương án 2 (Đại dương xanh, điểm benchmark 52/100). Rất ít đội lựa chọn làm nông nghiệp công nghệ cao.'
  },
  {
    id: 'giao-duc',
    name: 'Giáo Dục & Đào Tạo',
    iconName: 'GraduationCap',
    iconColor: '#fcc419',
    desc: 'Cá nhân hóa việc học, tối ưu tài nguyên giáo dục và hỗ trợ định hướng phát triển học tập cho người học.',
    score: {
      market: 16, marketBasis: '~22 triệu học sinh - sinh viên toàn quốc (Bộ GD&ĐT) — thị trường EdTech quy mô lớn, đã có hạ tầng số sẵn.',
      teamFitRaw: 8, difficultyRaw: 5, competitionPercent: 45.5,
      dataReadiness: 12, dataReadinessBasis: 'Dễ tự soạn bộ câu hỏi/đề thi mẫu và dữ liệu học sinh giả lập để demo thuật toán ôn tập.',
      legalRisk: 11, legalRiskBasis: 'Dữ liệu học sinh có tính nhạy cảm nhẹ (trẻ vị thành niên) nhưng dễ kiểm soát khi dùng dữ liệu giả lập.'
    },
    mvp: 'Trình biên soạn giáo án và bài tập cá nhân hóa AI-Tutor. Hệ thống tự động tạo lộ trình ôn thi dựa trên điểm yếu của từng học sinh thông qua các bài kiểm tra ngắn.',
    workflow: [
      'Học sinh làm bài test đánh giá năng lực đầu vào ngắn (10 câu).',
      'Quang dựng Knowledge Gap Analyzer phân tích cấu trúc lỗi sai, vẽ bản đồ lỗ hổng kiến thức của học sinh.',
      'Quang dùng RAG thiết kế lộ trình ôn tập cá nhân hóa từng ngày (gồm bài đọc và bài tập tương ứng).',
      'AI Tutor đồng hành giải thích chi tiết mỗi khi học sinh chọn sai đáp án bằng ngôn ngữ dễ hiểu.'
    ],
    aiPoints: [
      { point: 'Knowledge Gap Analyzer (Quang)', desc: 'Thuật toán AI phân tích logic lỗi sai của học sinh để định vị chính xác phần kiến thức bị hổng.' },
      { point: 'Dynamic Question Generator (Quang)', desc: 'RAG tự động tạo bài tập có độ khó tăng dần (Adaptive Learning) phù hợp tiến trình học tập.' }
    ],
    aiProposal: 'Quang là người phù hợp dựng Knowledge Gap Analyzer (phân tích vết lỗi sai bằng LLM) và RAG sinh câu hỏi cá nhân hóa — đây là phần "AI-Native" thật sự khác biệt so với một bộ đề trắc nghiệm tĩnh. Track cạnh tranh rất cao (45,5%) nên cần Yến giúp định vị ngách cụ thể (môn học/đối tượng) thay vì làm AI-Tutor chung chung.',
    kai: [
      'Thiết kế Database lưu cây đồ thị kiến thức môn học và lịch sử ôn luyện.',
      'Lên AI Plan cho hệ Adaptive Learning: luồng dữ liệu giữa bài test đầu vào, RAG sinh câu hỏi và giao diện.'
    ],
    quan: [
      'Sinh giao diện bài thi trắc nghiệm thích ứng (Adaptive Test) với thanh tiến độ sinh động.',
      'Dựng biểu đồ Concept Map hiển thị lỗ hổng kiến thức học sinh dưới dạng đồ thị trực quan.'
    ],
    mai: [
      'QC độ chính xác thuật toán phân tích lỗi sai trên bộ đề test mẫu trước demo.',
      'Theo dõi tiến độ tích hợp Knowledge Gap Analyzer với giao diện, đảm bảo kịp Checkpoint.'
    ],
    quang: [
      'Xây Knowledge Gap Analyzer: phân tích vết lỗi sai của học sinh, định vị lỗ hổng kiến thức trên Concept Map.',
      'Dùng RAG sinh câu hỏi ôn tập cá nhân hóa lấp đầy đúng lỗ hổng vừa phát hiện.'
    ],
    lam: [
      'Hỗ trợ bảo mật dữ liệu học sinh — nhóm dữ liệu nhạy cảm nhẹ vì liên quan trẻ vị thành niên.',
      'Backup Quân về Frontend nếu cần gấp trước checkpoint.'
    ],
    yen: [
      'Đánh giá thị trường: ~22 triệu học sinh-sinh viên toàn quốc, nhưng cạnh tranh cao thứ nhì giải đấu (45,5%) — cần tìm ngách khác biệt.',
      'Chuẩn bị luận điểm pitch nhấn mạnh tính nhân văn và cơ chế phân tích lỗ hổng kiến thức khác biệt so với các đội khác.'
    ],
    swot: {
      s: 'Quang có thể dựng kịch bản AI Tutor tương tác dựa trên Knowledge Gap Analyzer thật, tạo hiệu ứng tốt khi pitching.',
      w: 'Cần thuật toán phân tích vết lỗi sai đủ chính xác để lập đồ thị concept học tập đáng tin cậy trong 48h.',
      o: 'Phân khúc thị trường rộng lớn (~22 triệu học sinh-sinh viên), dễ chiếm cảm tình hội đồng giám khảo nhờ tính nhân văn cao.',
      t: 'Mức độ cạnh tranh rất cao (đứng thứ 2 toàn giải đấu với 45,5% trong 233 đội đăng ký chọn).'
    },
    tech: 'Knowledge Gap Analyzer (LLM phân tích lỗi sai), RAG sinh bài tập cá nhân hóa, thuật toán Adaptive Learning.',
    challenge: 'Rất nhiều sản phẩm tương tự trên thị trường, cần tìm được ngách thực sự độc đáo.',
    recommendation: 'Track điểm benchmark cao thứ 2 (71/100). Nằm trong Phương án 1 (Thế mạnh) — dễ làm demo trực quan sinh động.'
  },
  {
    id: 'thien-tai',
    name: 'Phòng Chống Thiên Tai',
    iconName: 'CloudRain',
    iconColor: '#a6aebb',
    desc: 'Dự báo, mô hình hóa dữ liệu địa lý và xây dựng giải pháp ứng phó — phục hồi trước các thảm họa thiên tai.',
    score: {
      market: 6, marketBasis: 'Giá trị xã hội cao nhưng gần như không có mô hình khách hàng trả phí trực tiếp trong 48h.',
      teamFitRaw: 3, difficultyRaw: 9, competitionPercent: 9.4,
      dataReadiness: 3, dataReadinessBasis: 'Dữ liệu viễn thám/vệ tinh và bản đồ ngập động cực kỳ phức tạp, gần như không thể xử lý xong trong 48h.',
      legalRisk: 9, legalRiskBasis: 'Không đụng dữ liệu cá nhân, nhưng sai số dự báo có thể ảnh hưởng an toàn tính mạng nếu triển khai thật.'
    },
    mvp: 'Bản đồ số dự báo nguy cơ sạt lở và đề xuất luồng cứu hộ tối ưu khi xảy ra bão lũ bằng AI.',
    workflow: [
      'Hệ thống thu thập dữ liệu độ ẩm đất, lượng mưa và ảnh vệ tinh địa hình (giả lập).',
      'Lâm hỗ trợ phân tích ảnh vệ tinh ở mức cơ bản để ước lượng chỉ số rủi ro sạt lở từng khu vực.',
      'Quang dựng Route Planning Agent tự động định tuyến đường cứu hộ tránh vùng ngập lụt khi có sự cố.',
      'AI soạn thảo tin nhắn khẩn cấp hướng dẫn người dân sơ tán, luôn kèm khuyến cáo xác minh với cơ quan chức năng.'
    ],
    aiPoints: [
      { point: 'Geospatial Analysis (Lâm, mức cơ bản)', desc: 'Phân tích ảnh vệ tinh/bản đồ độ cao số ở mức cơ bản để ước lượng nguy cơ sạt lở đất.' },
      { point: 'Route Optimization Agent (Quang)', desc: 'Thuật toán tìm đường tránh chướng ngại vật ngập lụt động thời gian thực.' }
    ],
    aiProposal: 'Đây là track đòi hỏi kiến thức học thuật (thủy văn, GIS) mà chưa ai trong team có kinh nghiệm thật — nếu chọn, nên giới hạn phạm vi kỹ thuật vừa sức: Quang dựng Agent định tuyến cứu hộ (bài toán thuật toán quen thuộc hơn dự báo sạt lở), Lâm chỉ hỗ trợ xử lý ảnh vệ tinh ở mức cơ bản. Không nên cam kết độ chính xác dự báo thiên tai thật trong 48h.',
    kai: [
      'Thiết kế Database lưu tọa độ điểm ngập động và yêu cầu cứu trợ thời gian thực.',
      'Lên AI Plan: xác định rõ phạm vi "hỗ trợ cảnh báo" chứ không cam kết độ chính xác dự báo tuyệt đối.'
    ],
    quan: [
      'Sinh giao diện bản đồ cứu hộ khẩn cấp (Mapbox/Leaflet) hiển thị khu vực ngập lụt.',
      'Thiết kế bảng điều khiển định tuyến đường đi và tiếp nhận yêu cầu cứu trợ.'
    ],
    mai: [
      'QC độ tin cậy thuật toán định tuyến trên dữ liệu giả lập trước demo — track này rủi ro dữ liệu sai lệch cao nhất.',
      'Theo dõi tiến độ chặt vì đây là track khó nhất (độ khó đề bài 9/10, điểm sẵn sàng dữ liệu chỉ 3/15).'
    ],
    quang: [
      'Xây Agent tối ưu lộ trình cứu hộ (Route Planning) tránh điểm ngập động cập nhật thời gian thực.',
      'Giới hạn rõ phạm vi dự báo, tránh Agent đưa ra cam kết an toàn tuyệt đối khi dữ liệu đầu vào là giả lập.'
    ],
    lam: [
      'Dùng kinh nghiệm Computer Vision phân tích ảnh vệ tinh/viễn thám ước lượng nguy cơ sạt lở ở mức cơ bản trong 48h.',
      'Đánh giá sớm mức độ khả thi thật của phần địa lý (thủy văn, GIS) trước khi team đầu tư quá nhiều thời gian.'
    ],
    yen: [
      'Đánh giá thực tế: giá trị xã hội cao nhưng gần như không có mô hình khách hàng trả phí — định vị pitch theo hướng tác động xã hội/thu hút tài trợ.',
      'Chuẩn bị luận điểm pitch tận dụng lợi thế cạnh tranh thấp thứ nhì giải đấu (9,4%).'
    ],
    swot: {
      s: 'Ý tưởng nhân văn sâu sắc, giải quyết bài toán cấp bách của đất nước, dễ tạo ấn tượng mạnh khi thuyết trình.',
      w: 'Không ai trong team có kiến thức học thuật về thủy văn học, bản đồ GIS địa lý phức tạp.',
      o: 'Độ cạnh tranh thấp thứ nhì giải đấu (chỉ 9,4% trong 233 đội chọn), khả năng giành giải cao nếu giải quyết được bài toán thô.',
      t: 'Thời gian 48h là quá ngắn để xử lý dữ liệu viễn thám và dựng bản đồ ngập lụt động chạy mượt mà.'
    },
    tech: 'Phân tích ảnh vệ tinh/viễn thám ở mức cơ bản (Lâm), Route Planning Agent (Quang), mô hình hóa toán học dòng chảy/lũ lụt.',
    challenge: 'Yêu cầu kiến thức học thuật chuyên sâu và nguồn dữ liệu địa lý cực kỳ phức tạp — vượt quá năng lực hiện có của team.',
    recommendation: 'Điểm benchmark thấp nhất (40/100). Chỉ chọn nếu không còn lựa chọn nào khác, và phải thu hẹp phạm vi kỹ thuật ngay từ đầu.'
  },
  {
    id: 'tai-chinh',
    name: 'Ngân Hàng & Tài Chính',
    iconName: 'ShieldAlert',
    iconColor: '#fcc419',
    desc: 'Ứng dụng AI để tái định hình ngành tài chính, tự động hóa vận hành, quản trị rủi ro và cá nhân hóa dịch vụ.',
    score: {
      market: 19, marketBasis: '~80 triệu tài khoản ngân hàng số tại Việt Nam (NHNN) — quy mô khách hàng cực lớn.',
      teamFitRaw: 6, difficultyRaw: 7.5, competitionPercent: 31.8,
      dataReadiness: 9, dataReadinessBasis: 'Có thể dùng dataset giao dịch giả lập (VD: Kaggle) nhưng sao kê ngân hàng thật gần như không thể tiếp cận trong 48h.',
      legalRisk: 5, legalRiskBasis: 'Dữ liệu tài chính cá nhân thuộc nhóm bảo mật nghiêm ngặt nhất (chuẩn PCI-DSS), rủi ro pháp lý cao.'
    },
    mvp: 'Trợ lý phân tích tài chính cá nhân thông minh giúp tự động phân loại giao dịch ngân hàng, lập kế hoạch chi tiêu và gợi ý quỹ đầu tư an toàn.',
    workflow: [
      'Người dùng kết nối lịch sử giao dịch sao kê tài khoản ngân hàng (giả lập).',
      'Quang dựng Financial Advisor Agent phân loại giao dịch (Ăn uống, Di chuyển, Thuê nhà) với độ chính xác cao.',
      'Agent phát hiện các khoản đăng ký dịch vụ định kỳ bị lãng phí (Subscriptions) và cảnh báo người dùng.',
      'Agent xây dựng kế hoạch tiết kiệm dựa trên thu nhập và mục tiêu tài chính tương lai.'
    ],
    aiPoints: [
      { point: 'Transaction Categorization (Quang)', desc: 'Phân loại chuỗi text giao dịch ngân hàng viết tắt không chuẩn hóa thành nhóm chi tiêu cụ thể.' },
      { point: 'Financial Advisor Agent (Quang)', desc: 'Soạn lời khuyên tài chính cá nhân dựa trên phân tích dòng tiền thực tế của người dùng.' }
    ],
    aiProposal: 'Quang dựng Financial Advisor Agent kết hợp Anomaly Detection cho gian lận. Vì đây là track yêu cầu bảo mật cao nhất (rủi ro pháp lý chỉ 5/15), Lâm cần vào cuộc sớm để rà soát bảo mật/pentest thay vì để tới cuối mới kiểm tra — một lỗ hổng lộ ra khi demo có thể mất điểm nghiêm trọng ở track này.',
    kai: [
      'Thiết kế Database Schema lưu lịch sử giao dịch và phân loại tự động — tận dụng thế mạnh Backend/Postgres.',
      'Lên AI Plan cho hệ Fraud Detection + Financial Advisor Agent, đảm bảo kiến trúc đủ chuẩn bảo mật cơ bản.'
    ],
    quan: [
      'Sinh giao diện quản lý chi tiêu cá nhân, biểu đồ tròn cơ cấu chi tiêu trực quan.',
      'Thiết kế biểu đồ dòng tiền ra vào hàng tháng và cảnh báo khoản phí lãng phí.'
    ],
    mai: [
      'QC độ chính xác phân loại giao dịch trên dataset giả lập trước demo.',
      'Theo dõi tiến độ tích hợp Fraud Detection với giao diện, đảm bảo kịp Checkpoint.'
    ],
    quang: [
      'Xây Financial Advisor Agent: phân tích dòng tiền, soạn lời khuyên tài chính cá nhân hóa.',
      'Tích hợp model phát hiện giao dịch bất thường (Anomaly Detection) dựa trên chuỗi thời gian.'
    ],
    lam: [
      'Rà soát bảo mật nghiêm ngặt cho luồng dữ liệu tài chính (chuẩn PCI-DSS) — track yêu cầu bảo mật cao nhất trong 8 track.',
      'Pentest API trước khi demo, vì dữ liệu tài chính là mục tiêu tấn công phổ biến nhất.'
    ],
    yen: [
      'Đánh giá thị trường: ~80 triệu tài khoản ngân hàng số VN — quy mô lớn nhưng cạnh tranh cũng cao (31,8%).',
      'Chuẩn bị luận điểm pitch nhấn mạnh cơ chế bảo mật + phát hiện gian lận tự động, điểm giám khảo Fintech quan tâm nhất.'
    ],
    swot: {
      s: 'K.AI có nền tảng Backend/Postgres tốt để lưu trữ và tính toán dòng tiền giao dịch, Quang có thể xây Agent phân tích tài chính cá nhân hóa.',
      w: 'Rất khó tiếp cận nguồn dữ liệu sao kê tài khoản ngân hàng thực tế để huấn luyện và kiểm thử.',
      o: 'Dung lượng thị trường Fintech khổng lồ (~80 triệu tài khoản), dễ tiếp cận nhà tài trợ lớn từ khối ngân hàng thương mại.',
      t: 'Yêu cầu khắt khe về độ chính xác số liệu, rủi ro bảo mật thông tin và quyền riêng tư dòng tiền.'
    },
    tech: 'Financial Advisor Agent (Quang), Anomaly Detection phát hiện gian lận, bảo mật/pentest chuẩn PCI-DSS (Lâm).',
    challenge: 'Đòi hỏi kiểm định bảo mật gắt gao và độ trễ giao dịch cực thấp.',
    recommendation: 'Điểm benchmark 59/100. Chỉ nên chọn nếu Lâm tự tin đảm bảo bảo mật kịp trong 48h.'
  }
];
