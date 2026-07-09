# Vibonymus @ VAIC 2026 — Kế hoạch thi đấu

Dự án này là hệ thống **Dashboard Quản lý & Lập kế hoạch thi đấu** của đội thi **Vibonymus** tại cuộc thi **Vietnam AI Challenge (VAIC) 2026**. Được xây dựng trên nền tảng React và Vite, ứng dụng cung cấp giao diện trực quan hóa toàn bộ quá trình chuẩn bị, phân chia công việc, tổng hợp tài nguyên AI hữu ích và phân tích đối thủ cạnh tranh.

---

## 🚀 Tính năng chính

Ứng dụng được chia thành nhiều phân hệ quản lý trực quan:

1. **📊 Dashboard (Tổng quan)**
   - Theo dõi tiến độ chuẩn bị của đội theo thời gian thực.
   - Các mốc thời gian quan trọng (Milestones) và danh sách công việc cần làm (To-Do List).
   - Biểu đồ và chỉ số hiệu suất của các thành viên.

2. **📅 Agenda (Lịch trình thi đấu)**
   - Lịch trình chi tiết các buổi training, vòng thi (Sơ loại, Bán kết, Chung kết).
   - Nhắc nhở các hạn chót (Deadlines) nộp bài thi.

3. **👥 Roles (Phân vai nhiệm vụ)**
   - Quản lý sơ đồ nhân sự và vai trò của từng thành viên trong team (AI Research, Frontend/Backend Dev, Data Analyst, Team Lead).
   - Mô tả chi tiết kỹ năng và trách nhiệm của từng cá nhân.

4. **📚 AI Resource (Tài nguyên AI)**
   - Bộ sưu tập các thư viện mã nguồn mở, mô hình pre-trained, và Git repositories tốt nhất được chọn lọc kỹ càng cho **8 track thi đấu** của VAIC 2026.

5. **🏁 Tracks (Các Track thi đấu)**
   - Chi tiết về 8 track thi đấu của cuộc thi (NLP, Computer Vision, Generative AI, Audio Processing, v.v.).
   - Phân tích yêu cầu kỹ thuật và tiêu chí chấm điểm cho từng track.

6. **🎯 Competitors (Phân tích đối thủ)**
   - Bảng phân tích các đội đối thủ nặng ký cùng bảng thi đấu.
   - So sánh điểm mạnh, điểm yếu và chiến thuật đối phó của Vibonymus.

7. **🔄 Workflow (Luồng công việc)**
   - Sơ đồ flowchart trực quan thể hiện quy trình phát triển sản phẩm AI: từ bước phân tích đề bài, tiền xử lý dữ liệu, huấn luyện mô hình, kiểm thử đến đóng gói sản phẩm.

---

## 🛠️ Công nghệ sử dụng

* **Core Framework**: React 18+ (JSX, Hooks)
* **Build Tool**: Vite (Cực nhanh với Hot Module Replacement)
* **Styling**: Vanilla CSS (Tối ưu hóa hiệu năng, tùy biến cao)
* **Linter**: Oxlint (Cấu hình lint nhanh chóng, hiện đại)

---

## 📂 Cấu trúc thư mục dự án

```text
VAIC-2026-Vibonymus-Prepare/
├── .claude/               # Cấu hình AI Agent cục bộ (đã ignore)
├── dist/                  # Thư mục build ứng dụng (đã ignore)
├── node_modules/          # Dependencies của dự án (đã ignore)
├── public/                # Tài nguyên tĩnh (Favicon, Background images)
├── src/
│   ├── assets/            # Ảnh và các tài nguyên dùng trong code
│   ├── components/        # Các React Components dùng chung (Navbar, Awards...)
│   ├── data/              # Dữ liệu tĩnh cấu trúc của dự án (workflow-data...)
│   ├── pages/             # Các trang chính của Dashboard (Dashboard, AIResource, Agenda...)
│   ├── App.css            # Stylesheets chính của ứng dụng
│   ├── App.jsx            # Component gốc điều phối routing các tab
│   ├── index.css          # Reset CSS
│   └── main.jsx           # Điểm khởi chạy React app
├── index.html             # Tệp HTML chính của Vite
├── package.json           # Cấu hình dự án & các dependencies
├── vite.config.js         # Cấu hình Vite dev server & build
└── README.md              # Tài liệu hướng dẫn này
```

---

## ⚙️ Hướng dẫn cài đặt và chạy chạy thử

### Yêu cầu hệ thống
- Đã cài đặt **Node.js** (Khuyến nghị phiên bản 18 LTS trở lên)
- Trình quản lý gói **npm** hoặc **yarn**

### Các bước khởi chạy

1. **Cài đặt các gói phụ thuộc (Dependencies)**:
   ```bash
   npm install
   ```

2. **Chạy ứng dụng ở môi trường phát triển (Development Mode)**:
   ```bash
   npm run dev
   ```
   *Mở trình duyệt và truy cập: [http://localhost:5173](http://localhost:5173) (hoặc cổng được hiển thị trong terminal).*

3. **Biên dịch dự án cho môi trường sản xuất (Build Production)**:
   ```bash
   npm run build
   ```
   *Mã nguồn tối ưu sau khi build sẽ nằm trong thư mục `dist/`.*

4. **Chạy thử bản build production (Preview)**:
   ```bash
   npm run preview
   ```

---

## 🕵️ Cào dữ liệu đối thủ (Competitors Scraper)

Trang **Competitors** dùng dữ liệu thật cào từ `hub.aiforvietnam.org` (169 đội thi VAIC 2026), không phải số liệu giả định. Chi tiết thiết kế đầy đủ ở [`SCRAPE_PLAN.md`](./SCRAPE_PLAN.md); dưới đây là hướng dẫn nhanh để bất kỳ thành viên nào cũng tự cào và đóng góp dữ liệu được.

### Cách 1 — Chrome Extension (1 click, khuyến nghị)

1. Mở `chrome://extensions/`, bật **Developer mode**.
2. Bấm **Load unpacked**, chọn thư mục `extension/` trong repo này.
3. Ghim icon extension lên toolbar, mở `hub.aiforvietnam.org` và đăng nhập bằng tài khoản của bạn (nếu chưa).
4. Bấm icon extension → bấm **"Cào dữ liệu"**. Extension tự đọc phiên đăng nhập sẵn có của bạn (không mở trình duyệt tự động, không đụng Google OAuth), cào toàn bộ đội + thành viên, rồi tự tải 1 file JSON về `Downloads/vaic-scrapes/`.
5. Copy file JSON đó vào thư mục `data/scrapes/` trong repo.
6. Tạo branch mới, commit file, mở Pull Request.

### Cách 2 — Script dòng lệnh (dự phòng)

Nếu không dùng được extension:
1. Mở `hub.aiforvietnam.org`, đăng nhập, nhấn F12 → Console → chạy `copy(localStorage.getItem('ai-hacks.authenticated_access_token'))`.
2. Tạo file `.auth/token.txt`, dán token vào, lưu lại.
3. Chạy `npm run scrape` (có thể thêm `-- --limit=5` để chạy thử với ít đội trước).

### Sau khi PR được merge vào `main`

Một **GitHub Action tự động** (`.github/workflows/rebuild-competitors-index.yml`) sẽ tự chạy `npm run rebuild-index` và commit lại `data/scrapes/latest.json`, `data/scrapes/CHANGELOG.md`, `src/data/competitors-data.json` — không cần ai chạy tay. Vào tab **Actions** trên GitHub để xem tiến trình, hoặc xem `data/scrapes/CHANGELOG.md` để biết dữ liệu vừa thay đổi gì so với lần cào trước.

Nếu muốn chạy thủ công (ví dụ đang test local): `npm run rebuild-index`.

---

## ⚠️ Lưu ý về Git Tracking

Các tài liệu ôn tập lớn (đặc biệt là tệp `.pdf` lớn hơn 100MB và các định dạng `.docx`, `.xlsx`) cũng như thư mục cấu hình cục bộ của agent (`.claude/`) đã được cấu hình tự động trong `.gitignore` để tránh làm phình repository Git. Chỉ các file mã nguồn và tài liệu văn bản Markdown `.md` mới được phép đẩy lên Git.
