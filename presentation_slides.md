# Vietnam AI Innovation Challenge 2026 - Presentation Slides

*Tài liệu tổng hợp nội dung chi tiết được trích xuất từ các file ảnh slide thuyết trình (`chrome_*.png`)*

---

## 1. Chương trình & Tổng quan (Agenda & Overview)

### Slide: Agenda
*File ảnh: `chrome_rF9KNjvoCa.png`*

Lộ trình chương trình (Agenda) được thiết kế theo dạng đường sắt lượn sóng (S-curve) gồm 5 giai đoạn cốt lõi:
1. **OPENING** (Khai mạc)
2. **SETUP & FIRST PROMPT** (Cài đặt & Prompt đầu tiên)
3. **BUILD ALONG PART 1** (Thực hành chung phần 1)
4. **BUILD ALONG PART 2** (Thực hành chung phần 2)
5. **OWN PRACTICE** (Tự thực hành)

---

### Slide: Bảng tiêu chí chấm điểm (Evaluation Criteria)
*File ảnh: `chrome_fj5qAjJrxd.png`*

| # | Tiêu chí chấm điểm (Criterion) | Điểm số (Points) |
|---|---|---|
| 1 | **Technical Implementation & Engineering Depth** (Triển khai kỹ thuật & Độ sâu kỹ thuật) | 20 pts |
| 2 | **AI-Native Architecture & Innovation** (Kiến trúc AI-Native & Tính đổi mới sáng tạo) | 20 pts |
| 3 | **Business Viability & Pilot Pathway** (Tính khả thi thương mại & Lộ trình thử nghiệm) | 20 pts |
| 4 | **AI-Native UX & Design Thinking** (Trải nghiệm người dùng AI-Native & Tư duy thiết kế) | 15 pts |
| 5 | **AI Safety, Grounding & Trust** (An toàn AI, Tính xác thực thông tin & Sự tin cậy) | 15 pts |
| 6 | **Presentation, Demo & Defensibility** (Bài thuyết trình, Demo & Khả năng bảo vệ giải pháp) | 10 pts |
| | **TỔNG CỘNG (TOTAL)** | **100 pts** |

---

### Slide: AI Feature vs. AI-Native
*File ảnh: `chrome_gg11RQJebP.png`*
*Người trình bày: Timothy Nguyen & Lê Phương Trung*

So sánh giữa việc tích hợp tính năng AI (AI Features) và xây dựng sản phẩm AI gốc (AI-Native Products):

* **AI Features (Incremental - Phát triển lũy tiến)**:
  - Tối ưu hóa luồng công việc phần mềm hiện có bằng cách nhúng trí tuệ nhân tạo như một tính năng phụ trợ hoặc tăng tính thẩm mỹ.
  - *Ví dụ*: Tự động hoàn thành (Autocomplete) các truy vấn tìm kiếm bên trong cổng thanh toán.
  - *Đánh giá*: Dựa trên khả năng giữ chân người dùng lũy tiến và thay đổi nhỏ trong tải trọng cơ sở dữ liệu.
  - *Đặc điểm*: Rào cản thấp (Low friction), nhưng chỉ mang lại lợi thế cạnh tranh biên nhẹ (marginal competitive edge).
  
* **AI-Native Products (Transformational - Chuyển đổi đột phá)**:
  - Toàn bộ tuyên bố giá trị (value proposition) và vòng lặp vận hành được xây dựng cấu trúc dựa trên khả năng lập luận của mạng thần kinh nhân tạo (neural network reasoning).
  - *Ví dụ*: Trọng tài giải quyết tranh chấp tự động hoạt động như một bồi thẩm đoàn ảo.
  - *Đánh giá*: Dựa trên việc thay thế hoàn toàn luồng công việc nhận thức và khả năng mở rộng quy mô kinh tế đơn vị.
  - *Đặc điểm*: Sở hữu một vòng lặp dữ liệu phản hồi chủ động và độc quyền (proprietary feedback data flywheel).

---

### Slide: So sánh giải pháp thay thế (Can AI solve it better?)
*File ảnh: `chrome_u0xiFyZHaJ.png`*
*Người trình bày: Timothy Nguyen & Lê Phương Trung*

**Câu hỏi cốt lõi**: Liệu AI có thể giải quyết vấn đề nhanh hơn, rẻ hơn, hoặc chính xác hơn các giải pháp thay thế hiện tại?
- **Định hướng cạnh tranh**: Nếu bạn đang cạnh tranh với các giải pháp hiện tại, phương pháp AI của bạn phải **vượt trội hơn hẳn (significantly better)** chứ không chỉ nhỉnh hơn một chút (slightly better).
- **Lựa chọn con đường**:
  - Nếu **Có** $\rightarrow$ Chọn con đường **AI-native path** (Con đường AI gốc).
  - Nếu **Không** $\rightarrow$ Chỉ là một **AI feature** (Tính năng AI phụ trợ).

---

### Slide: Thử thách của bạn (Your challenge: Pick one problem to solve)
*File ảnh: `chrome_Ti27xmAuDb.png`*
*Người trình bày: Timothy Nguyen & Lê Phương Trung*

Chọn một trong hai bài toán thực tế sau để giải quyết:

* **Problem statement 1 (Mô tả bài toán 1)**:
  > Trung tâm tiếng Anh ABC có khoảng 1.200 học viên đang theo học tại 8 cơ sở khác nhau. Mỗi học viên có một lộ trình học riêng (trình độ, mục tiêu, lịch học khác nhau), nhưng giáo viên hiện chỉ đánh giá tiến độ qua bài kiểm tra cuối khóa, không biết học viên nào đang theo kịp, ai đang tụt lại giữa khóa để can thiệp kịp thời. Cần phải làm sao?
  
* **Problem statement 2 (Mô tả bài toán 2)**:
  > Hợp tác xã nông sản Tây Nguyên có 150 hộ nông dân trồng cà phê, mỗi hộ tự quyết định thời điểm thu hoạch và bán hàng riêng lẻ. Vì không có thông tin chung về giá thị trường hay chất lượng mùa vụ theo thời gian thực, nhiều hộ bán giá thấp hơn thị trường 10–15% hoặc thu hoạch sai thời điểm làm giảm chất lượng hạt. Cần phải làm sao?

---

## 2. Thiết kế và Phát triển Dự án (Enterprise Pilot Dynamics)

### Slide: 3 câu hỏi mọi dự án cần trả lời (3 Questions every project need to answer)
*File ảnh: `chrome_6x2qpilkDu.png`*

Mọi dự án cần phải trả lời rõ ràng 3 câu hỏi cốt lõi để tránh "cạm bẫy" (The Trap):
1. **Question 01**: `What problem are you solving?` (Bạn đang giải quyết vấn đề gì?)
2. **Question 02**: `Can you Solve it?` (Bạn có giải quyết được vấn đề đó không?)
3. **Question 03**: `Will anyone pay for it?` (Có ai sẵn sàng trả tiền cho giải pháp đó không?)

---

### Slide: Bảng thảo luận Miro (Miro Workspace)
*File ảnh: `chrome_BTlw7Tku1X.png`*

Khung tư duy thảo luận nhóm trên Miro (Rétrospective des 4 L) gồm 4 cột tương ứng:
- **Problem** (Vấn đề - Thẻ màu xanh dương)
- **Solution** (Giải pháp - Thẻ màu hồng)
- **Execution** (Thực thi - Thẻ màu vàng)
- **Value** (Giá trị mang lại - Thẻ màu xanh lá)

*Thành viên tham gia thảo luận*: Ninh Nguyen, Thao Hien, buithienan.et, Nguyen Cong, Duong Nguyen Anh, Nguyen Van Hung, Bao Phuc, Nguyen Trung T.

---

### Slide: Xác định chỉ số đo lường (Define metrics)
*File ảnh: `chrome_2nFsSPQKqF.png`*
*Người trình bày: Hưng Lê Quang - HCM city & Timothy Nguyen*

Ba chỉ số đo lường hiệu quả (ROI metrics) cần xác định cho dự án AI:
1. **Efficiency ROI** (Tỉ suất hoàn vốn về hiệu suất/tốc độ)
2. **Accuracy/Quality ROI** (Tỉ suất hoàn vốn về độ chính xác và chất lượng)
3. **Scale ROI** (Tỉ suất hoàn vốn về khả năng mở rộng quy mô)

---

### Slide: Khách hàng sẵn sàng chi trả? (Will anyone pay for it?)
*File ảnh: `chrome_7XPHEr127c.png`*

Để xác định khả năng thương mại, dự án cần làm rõ:
- **Users vs Customer**: Giải pháp của bạn tích hợp vào luồng công việc hiện tại của họ như thế nào? (Người dùng trực tiếp khác với người trả tiền).
- **Thử nghiệm AI**: Làm thế nào để bạn chạy một dự án thử nghiệm AI (AI pilot) mà không gây ra nỗi sợ hãi về lỗi hoặc làm gián đoạn hệ thống hiện có?
- **Đo lường**: Những chỉ số (metrics) nào sẽ chứng minh được giá trị thực tế của giải pháp?

---

### Slide: Đối tượng mục tiêu (Target Audience)
*File ảnh: `chrome_wg5lGWZMLJ.png`*
*Người trình bày: Hưng Lê Quang - HCM city & Timothy Nguyen*

Phân biệt hai đối tượng quan trọng trong dự án:

* **Users (Người dùng trực tiếp)**:
  - Ai là người gánh chịu gánh nặng vận hành khi hệ thống AI của bạn chưa xuất hiện?
  - Ai là người làm việc trực tiếp bên trong sản phẩm của bạn mỗi ngày?
  
* **Customers (Khách hàng chi trả)**:
  - *Những gì họ cần nhìn thấy*: Sự nhạy cảm về giá (price-sensitive), khả năng giảm thiểu rủi ro vận hành (operational/risk mitigation), Thời gian đạt giá trị (Time-to-Value), và tác động trực tiếp tới lợi nhuận cuối cùng (bottom line).

---

### Slide: Giải quyết điểm nghẽn (Targeting one friction point in a process)
*File ảnh: `chrome_jFf6Zt0N9E.png`*

Quy trình sử dụng mẫu (Use case):
```
[1. Application Submitted] ──> [2. Manual check] ──> [3. Risk Scoring] ──> [4. Contract Approval] ──> [5. Account activated]
```

- **DON'T (Không nên)**: Thay thế toàn bộ luồng công việc (`Replace the whole workflow`).
- **DO (Nên)**: Chọn điểm nghẽn để tối ưu. Rủi ro thấp, hiệu quả cao (`Pick the bottleneck. Low Risk, High Efficiency`).

---

### Slide: Lộ trình thử nghiệm (Pilot Roadmap)
*File ảnh: `chrome_16dEuTunKI.png`*
*Người trình bày: Hưng Lê Quang - HCM city & Timothy Nguyen*

Lộ trình phát triển sản phẩm thử nghiệm (Pilot Roadmap) tập trung vào hai giai đoạn:

* **Focus on feasibility (Tập trung vào tính khả thi)**:
  - *Mục tiêu (Objective)*: Giải quyết các điểm nghẽn/ma sát ở cấp độ sản phẩm.
  - *Cảnh báo*: Giải pháp của bạn cần những điều kiện gì để có thể hoạt động trong thế giới thực?
  
* **Focus on scalability & effectiveness (Tập trung vào khả năng mở rộng & hiệu quả)**:
  - *Hiệu suất (Performance)*: Tác động trong thế giới thực - được chứng minh bằng các số liệu cụ thể.
  - *Khả năng mở rộng (Scalability)*: Xử lý hàng loạt (batch processing), loại bỏ các giới hạn về băng thông của các phương pháp truyền thống.

> **Điểm nhấn (Highlight)**: Một lộ trình (roadmap) không phải là một kế hoạch dự án cứng nhắc, bị giới hạn bởi thời gian (như biểu đồ Gantt); thay vào đó, nó là một công cụ truyền thông chiến lược tập trung vào kết quả đầu ra (outcomes), các giả thuyết (hypotheses) và kiểm chứng (validation).

---

## 3. Kỹ năng Prompt kỹ thuật (Prompt Like an Engineer)

### Slide: Prompt như một kỹ sư - Phần 1 (Prompt Like an Engineer - Part 1)
*File ảnh: `chrome_7ru32SnZUn.png`*

* **Spec-First Prompting (Prompt dựa trên đặc tả trước)**:
  - Mô tả vấn đề cần giải quyết, không mô tả giải pháp (`Describe the problem, not the solution`).
  - Tách biệt phần lập kế hoạch với phần triển khai thực tế (`Separate planning from implementation`).
  - Cung cấp bối cảnh cụ thể (`Provide specific context`).
  - Thiết lập các ràng buộc rõ ràng (`Set clear constraints`).
  
* **Iterative Refinement (Cải tiến lặp lại)**:
  - Xây dựng các vòng lặp phản hồi (`Build feedback loops`).
  - Đòi hỏi bằng chứng/kiểm chứng, không chấp nhận những lời khẳng định suông (`Demand evidence, not claims`).
  - Dán mã nguồn tham chiếu trực tiếp (`Paste reference code`).

---

### Slide: Prompt như một kỹ sư - Phần 2 (Prompt Like an Engineer - Part 2)
*File ảnh: `chrome_ySzsbs4C9A.png`*

* **Context Management (Quản lý bối cảnh/context)**:
  - Một tác vụ, một prompt (`One task, one prompt`).
  - Quản lý bối cảnh - vùng nguy hiểm 40% (`Manage context – the 40% danger zone`).
  - Sử dụng các lệnh `/clear` và `/compact` để làm sạch và thu gọn context.
  
* **When Prompts Fail (Khi Prompt thất bại)**:
  - Quay lại bước trước, không chắp vá (`Rewind, don't patch`).
  - 4 chế độ thất bại thường gặp:
    - Vòng lặp AI (`AI loops`)
    - Ảo giác của mô hình (`Hallucinations`)
    - Mất bối cảnh (`Lost context`)
    - Thiết kế quá phức tạp (`Over-engineering`)
