# Hướng dẫn Phát triển & Chiến thuật Thi đấu (Dành cho Gemini & Claude)

Dự án này là trang Dashboard đồng hành cùng đội **Vibonymus** tham gia **Hackathon VAIC 2026**.
Tài liệu này được biên soạn để các AI Agent (Gemini, Claude) khi tham gia phát triển dự án hiểu ngay bối cảnh, cấu trúc và triết lý mà không cần phải quét (scan) toàn bộ thư mục.

---

## 💡 Triết lý Phát triển (AI-Native Development)

1. **Sử dụng AI là chính, hạn chế viết code tay (Hạn chế tối đa code cứng):**
   - Mọi quyết định thiết kế và xử lý logic đều được hỗ trợ bởi AI.
   - Tận dụng cả tài khoản AI trả phí và các AI miễn phí (Claude Pro, Claude Max, Gemini Pro, Gemini Free).
2. **Cơ chế Data-Driven (Tách biệt Dữ liệu và Code):**
   - **Tuyệt đối không hardcode nội dung text, danh sách task hoặc data trong file JSX.**
   - Toàn bộ dữ liệu chữ, danh sách, timeline và thông số phải được đặt trong các file tại thư mục `src/data/` (ví dụ: `workflow-data.js`, `dashboard-data.js`).
   - Các file giao diện trong `src/pages/` chỉ import biến từ data để `map` ra giao diện, giữ cho file code cực kỳ ngắn gọn và dễ bảo trì.

---

## 📁 Cấu trúc Thư mục Dự án

```text
VAIC-2026-Vibonymus-Prepare/
├── .auth/                  <- Chứa token.txt để cào dữ liệu (đã gitignore)
├── src/
│   ├── data/
│   │   ├── workflow-data.js  <- Dữ liệu luồng tương tác 6 người & 48h
│   │   ├── dashboard-data.js <- Dữ liệu Gantt 72h & Tiêu chí chấm điểm
│   │   └── competitors-data.json <- Snapshot thông tin đối thủ cạnh tranh
│   ├── pages/
│   │   ├── Dashboard.jsx   <- Trang chủ: Gantt chart 72h & Tiêu chí chấm điểm
│   │   ├── Workflow.jsx    <- Trang luồng phối hợp (Flowchart SVG + 48h timeline)
│   │   └── Competitors.jsx <- Trang đối thủ cạnh tranh
│   └── utils/
│       └── competitorAnalysis.js <- Logic tính điểm đe doạ đối thủ
└── scripts/                <- Các script Node.js cào dữ liệu tự động
```

---

## 🎯 Chiến thuật Thi đấu & Phân công Vai trò (72 giờ)

Biểu đồ Gantt và dòng thời gian chỉ tập trung vào **00:00 ngày 17/07 đến 24:00 ngày 19/07** (tổng cộng 72 tiếng).

### 👥 Đội hình 6 thành viên & AI Tools của họ:
1. **K.AI — Tech Lead / Backend & DB (Claude Pro / Free):** Thiết kế DB, sinh migration SQL, viết API chính, xử lý logic nghiệp vụ lõi, deploy lên cloud.
2. **Quân — Frontend & UI/UX (Claude Max 5x):** Dựng khung giao diện React component, tối ưu SEO, viết micro-animations mượt mà.
3. **Mai — QC & Hiệu suất (Gemini Pro / Free):** Quản lý tiến độ, phát hiện bug, soát chính tả và tính logic của tài liệu.
4. **Quang — AI Core & Security (Claude Pro / Free):** Huấn luyện mô hình, viết prompt, grounding (RAG), bảo mật prompt (Prompt Injection).
5. **Lâm — AI Core & Security (Claude Pro / Free):** Huấn luyện/Thử nghiệm mô hình CV/AI, hỗ trợ Quang, thực hiện kiểm thử bảo mật (Pentest) API & DB.
6. **Yến — Business & Pitching (Gemini Pro / Free):** Khảo sát đối thủ thương mại, xây dựng business case (3 câu hỏi cốt lõi), chuẩn bị slide pitching & kịch bản Q&A.

### ⏱️ Luồng Phối hợp & Các Mốc Đồng bộ (Sync Checkpoints):
- **Checkpoint 1 (Giờ 4 - 15:00 17/07):** Chốt API contract, wireframe giao diện chính & định hướng business case.
- **Checkpoint 2 (Giờ 24 - 11:00 18/07):** Demo nội bộ giữa chặng, ghép nối thử Backend - Frontend - AI Core.
- **Checkpoint 3 (Giờ 36 - 23:00 18/07):** Khảo sát UI/UX trên mobile, pentest sơ bộ, khoá tính năng (Feature Freeze).
- **Checkpoint 4 (Giờ 48 - 11:00 19/07):** Code Freeze, deploy production, đóng gói link nộp bài và bắt đầu tập pitch.
