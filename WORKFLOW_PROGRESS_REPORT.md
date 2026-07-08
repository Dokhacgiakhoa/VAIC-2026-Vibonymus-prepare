# Báo cáo tiến độ — Trang Workflow (src/pages/Workflow.jsx)

Dừng do sắp hết usage limit. File `src/pages/Workflow.jsx` đã build sạch (chỉ còn 3 warning
unused-import có sẵn từ trước, không liên quan việc đang làm: `Zap`, `BookOpen`, `HelpCircle`).

## Đã hoàn thành trong phiên này

1. **Tab "Flow Chart"** (trước là "Sơ đồ tổng thể") — vẽ lại thành một sơ đồ flowchart SVG thật
   (không phải card-grid) với quy ước hình chuẩn:
   - Hình chữ nhật = công việc (process) của từng thành viên
   - Hình thoi = mốc đồng bộ/quyết định (do K.AI chủ trì)
   - Hình tròn = điểm bắt đầu/kết thúc
   - Đường ngang/dọc vuông góc (không còn đường chéo)
   - **Cấu trúc phân cấp đúng thực tế**: K.AI (PM) nằm trên, định hướng xuống Quân + Hiếu
     (không phải 3 người ngang hàng như bản đầu). Quân ↔ Hiếu vẫn phối hợp trực tiếp
     (đã thu hẹp khoảng cách + nhãn "(API ↔ UI)" xuống dòng cho gọn).
   - Vòng lặp phản hồi lỗi trỏ thẳng vào cạnh phải hộp K.AI (không phải đỉnh, tránh đè lên
     mũi tên chính).
   - Rail dọc bên trái (tên giai đoạn, xoay -90°) đối xứng với rail bên phải (kênh phối hợp
     chung: GitHub/Chat/Stand-up).
   - Đoạn đường trùng giữa mũi tên xanh lá (Quân) và cam (Hiếu) khi hội tụ vào hình thoi
     được tô màu trộn RGB `rgb(132,168,61)` thay vì để 1 màu đè lên màu kia.
   - Đã tăng cỡ chữ toàn bộ các nhãn nhỏ (rail, badge "CHỦ TRÌ", nhãn phối hợp, nhãn vòng lặp,
     text trong hình thoi, node bắt đầu/kết thúc) vì bị đánh giá là quá nhỏ.
   - Đã thêm đổ bóng: từng thẻ (K.AI/Quân/Hiếu/hình thoi) có `feDropShadow` riêng, và toàn bộ
     SVG có thêm `filter: drop-shadow(...)` ở cấp root để cả sơ đồ trông như một khối nổi lên
     nền trắng (không chỉ từng thẻ).
   - Mũi tên đã giảm kích thước đầu (marker) cho vừa phải, tăng độ đậm nét vẽ.

2. **Tab "Luồng thời gian 48h"** — sửa lại phần "nhánh song song 3 thành viên" mỗi giai đoạn:
   trước là 3 card ngang hàng nối bằng mũi tên chuỗi (K.AI→Quân→Hiếu), giờ đổi thành K.AI
   (card đầy đủ chiều rộng, có badge "CHỦ TRÌ") ở trên, hai mũi tên chĩa xuống Quân + Hiếu
   nằm song song bên dưới, có nhãn "↔ phối hợp trực tiếp" ở giữa hai card đó. Đã sửa câu mô
   tả đầu trang cho khớp.

3. **Tab "Quy trình tương tác Multi-AI"** — sửa dải tổng quan (overview strip) từ chuỗi ngang
   K.AI→Quân→Hiếu thành K.AI ở trên (card riêng, viền trên xanh dương), hai mũi tên xuống
   Quân + Hiếu ở dưới kèm nhãn "↔ phối hợp". Đã sửa nhãn "Phối hợp & Bàn giao chéo" ở mỗi
   role-row từ kiểu chuỗi tuần tự sang đúng quan hệ: K.AI → Quân & Hiếu (định hướng);
   Quân ↔ Hiếu + Quân → K.AI (báo cáo); Hiếu ↔ Quân + Hiếu → K.AI (báo cáo). Sửa câu mô tả
   đầu trang tương ứng.

## Đang làm dở / cần kiểm tra lại khi mở phiên mới

- **Chưa xác nhận bằng mắt** tab "Quy trình tương tác Multi-AI" sau khi sửa — lần cuối
  bấm vào tab này thì trình duyệt bị treo (CDP screenshot timeout), chưa kịp chụp lại để xem
  layout mới (K.AI trên, Quân+Hiếu dưới) có bị vỡ dòng/đè chữ ở màn hình hẹp hay không.
  **Việc cần làm tiếp theo**: mở lại `http://localhost:5174/` (dev server có thể vẫn đang chạy
  ở background, hoặc chạy lại `npm run dev`), vào tab Workflow → "Quy trình tương tác Multi-AI",
  xem phần dải tổng quan mới và cụm nhãn "Phối hợp & Bàn giao chéo" có hiển thị đúng, không vỡ
  layout không. Nếu lỗi thì sửa trong khối JSX quanh dòng ~536-610 của
  `src/pages/Workflow.jsx` (phần `{/* AIFLOW PANEL */}`).
- Build (`npm run build`) và lint (`npx oxlint src/pages/Workflow.jsx`) đã chạy sạch sau tất cả
  thay đổi ở trên, nên rủi ro lỗi cú pháp là thấp — vấn đề còn lại (nếu có) chỉ là CSS/layout
  thị giác, không phải lỗi build.

## Vị trí liên quan trong code

- Toàn bộ component flowchart SVG: `WorkflowFlowchart` ở đầu file `src/pages/Workflow.jsx`
  (khoảng dòng 1-235).
- Hằng số layout (kích thước, khoảng cách, vị trí) nằm ngay dưới import, đầu file — nếu cần
  chỉnh khoảng cách/kích thước sau này, sửa ở đó thay vì sửa số cứng rải rác trong JSX.
- Panel "Luồng thời gian 48h": tìm comment `{/* TIMEFLOW PANEL */}`.
- Panel "Quy trình tương tác Multi-AI": tìm comment `{/* AIFLOW PANEL */}`.
