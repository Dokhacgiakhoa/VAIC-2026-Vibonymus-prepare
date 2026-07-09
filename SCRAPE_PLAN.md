# Plan: Cào dữ liệu đối thủ (hub.aiforvietnam.org) cho trang Competitors

## 1. Mục đích

Thay dữ liệu **giả định/mock** hiện tại trong `src/pages/Competitors.jsx` (mảng `topCompetitors` với các tên đội hư cấu như Aulacys, XVibe...) bằng dữ liệu **thật** của 169 đội thi VAIC 2026 và thành viên của họ, phục vụ phân tích đối thủ cho team Vibonymus.

## 2. Bối cảnh kỹ thuật

- Site hiện tại là **static site** (Vite + React), không có backend riêng — và **không cần thêm backend** cho mục đích này (xem mục 2b).
- Dữ liệu đội/thành viên nằm sau backend thật của ban tổ chức: `https://hub-api.aiforvietnam.org`, khác domain với site tĩnh này.
- Các endpoint yêu cầu **phiên đăng nhập** (cookie session) — đã xác nhận qua request `GET /users/me` trả `200` khi trình duyệt đang đăng nhập.
- Không thể cào "live" ngay trong trình duyệt khi người dùng mở trang public (dính CORS + auth + khối lượng request lớn với 169 đội). Giải pháp: **script cào chạy riêng (Node.js + Playwright), có bước tự kiểm tra/đăng nhập, xuất ra file JSON tĩnh**; `Competitors.jsx` chỉ import và hiển thị. Đây là pipeline "refresh dữ liệu theo yêu cầu", không phải scraping real-time trong lúc người dùng xem trang.

### 2b. Vì sao không cần backend — kể cả khi nhiều thành viên cùng cào

Yêu cầu thực tế là: đẩy code lên GitHub, **thành viên khác clone về, tự chạy cào bằng tài khoản riêng của họ**, rồi commit dữ liệu và mở PR để merge. Đây vẫn là mô hình "script chạy local + commit kết quả vào git", không phải nhiều client gọi vào 1 server dùng chung — nên không có nhu cầu kỹ thuật nào đòi hỏi backend:

- Mỗi người tự đăng nhập bằng tài khoản của họ trên máy họ (luồng Playwright ở mục 4 vốn đã thiết kế để chạy độc lập theo từng máy, không phụ thuộc session của người khác).
- Kết quả cào chỉ cần **merge qua git** (pull request), không cần đồng bộ real-time giữa nhiều người.
- Vấn đề cần giải là **tránh xung đột (conflict) khi nhiều PR cùng sửa file dữ liệu** — giải quyết ở mục 5b bằng cách tách "file nguồn" (luôn là file mới, không bao giờ conflict) khỏi "file tổng hợp" (có thể tự sinh lại sau khi merge, không cần merge tay).

Backend chỉ đáng cân nhắc nếu sau này muốn: tự động cào theo lịch không cần ai bấm tay, hoặc cào tập trung một chỗ rồi nhiều người chỉ xem (không cào) — cả hai đều ngoài phạm vi yêu cầu hiện tại.

## 3. Các API đã xác định (qua DevTools/network)

| Endpoint | Method | Mục đích |
|---|---|---|
| `/fan/teams?page=N&page_size=M` | GET | Danh sách đội, phân trang (tổng 169 đội) |
| `/teams/{slug}` | GET | Chi tiết 1 đội: track quan tâm, kỹ năng cần, danh sách thành viên (kèm slug từng người) |
| `/profile/{slug}` | GET | Chi tiết 1 thành viên: nghề nghiệp, lĩnh vực quan tâm, ngành, kỹ năng, link GitHub/LinkedIn/Website, đội đang tham gia |
| `/users/me` | GET | Dùng để **kiểm tra phiên đăng nhập còn hiệu lực hay không** (200 = còn, 401/redirect = hết hạn) |

Không có endpoint liệt kê toàn bộ thành viên công khai — slug thành viên chỉ lộ ra qua danh sách thành viên trong từng đội (bước 2 bên dưới).

## 4. Kiến trúc: dùng Playwright thay vì copy cookie thủ công

Thay vì bắt bạn tự mở DevTools copy cookie (dễ sai, dễ hết hạn, không thân thiện), script sẽ **tự lái một trình duyệt thật (Playwright/Chromium)**:

- Nếu đã có phiên đăng nhập lưu từ lần chạy trước (`.auth/session.json`) → tái sử dụng, không cần đăng nhập lại.
- Nếu chưa đăng nhập / phiên hết hạn → **tự mở cửa sổ trình duyệt hiện (headful)**, điều hướng tới trang đăng nhập, và **chờ bạn đăng nhập thủ công** (nhập tài khoản/mật khẩu hoặc SSO) ngay trong cửa sổ đó. Script không đọc/nhập giúp mật khẩu — chỉ chờ và phát hiện khi đăng nhập thành công.
- Sau khi phát hiện đăng nhập thành công (gọi thử `/users/me` trả 200), script **tự lưu lại session** (`storageState` của Playwright: cookie + localStorage) vào `.auth/session.json` (đã thêm vào `.gitignore`, không commit) để các lần chạy sau khỏi phải đăng nhập lại.
- Toàn bộ request cào dữ liệu sau đó chạy bằng `page.evaluate(() => fetch(...))` **ngay trong ngữ cảnh trang đã đăng nhập** → tự động kèm cookie/CORS đúng như khi bạn dùng tay, không phải tự dựng header thủ công.

### Luồng chi tiết khi chạy `npm run scrape`

```
1. Khởi động Playwright, mở Chromium.
2. Nếu tồn tại .auth/session.json → load storageState vào context.
3. Mở tab, điều hướng tới https://hub.aiforvietnam.org/
4. Gọi thử GET /users/me (qua fetch trong page):
     - 200 OK → đã đăng nhập, tiếp tục bước 6.
     - 401 / lỗi → sang bước 5.
5. CHƯA ĐĂNG NHẬP:
     - In hướng dẫn ra console (tiếng Việt), ví dụ:
       "Chưa phát hiện phiên đăng nhập. Một cửa sổ Chrome sẽ mở ra trang đăng nhập
        hub.aiforvietnam.org. Vui lòng đăng nhập bằng tài khoản của bạn (email/Google/...).
        Sau khi đăng nhập xong và thấy trang chủ, quay lại terminal và nhấn Enter để tiếp tục."
     - Điều hướng cửa sổ Playwright (đang hiện, không headless) tới trang đăng nhập.
     - Chờ người dùng nhấn Enter ở terminal (readline) HOẶC tự động poll /users/me mỗi
       2-3 giây tối đa ~5 phút để phát hiện đăng nhập thành công mà không cần bấm Enter.
     - Khi thành công → lưu storageState vào .auth/session.json, in "Đăng nhập thành công,
       bắt đầu cào dữ liệu...".
     - Nếu quá thời gian chờ (timeout) → in lỗi rõ ràng và dừng, không cào dở dang.
6. ĐÃ ĐĂNG NHẬP — bắt đầu cào:
   a. Loop GET /fan/teams?page=N&page_size=50 tới khi đủ 169 đội.
   b. Với mỗi đội: GET /teams/{slug} lấy chi tiết + slug thành viên.
   c. Với mỗi thành viên (unique theo slug): GET /profile/{slug}.
   d. Giữa các request: delay ~300-500ms (lịch sự, tránh bị chặn / rate-limit).
   e. Nếu bất kỳ request nào giữa chừng trả 401 (phiên hết hạn khi đang cào)
      → dừng ngay, lưu tạm kết quả đã cào được (checkpoint), in hướng dẫn
        "Phiên đăng nhập đã hết hạn giữa chừng, vui lòng chạy lại `npm run scrape`
         để đăng nhập lại và tiếp tục."
7. So sánh dữ liệu vừa cào với snapshot gần nhất (data/scrapes/latest.json) → sinh diff
   (đội mới/mất, thành viên vào/ra, thay đổi kỹ năng/nghề nghiệp...).
8. Lưu snapshot mới có timestamp (data/scrapes/<timestamp>.json), cập nhật
   data/scrapes/latest.json, ghi thêm mục vào data/scrapes/CHANGELOG.md, và ghi đè
   src/data/competitors-data.json (bản "hiện tại" mà Competitors.jsx dùng để hiển thị).
   (+ cache thô trong .cache/ để lần sau chỉ cào phần thiếu/mới thay vì cào lại từ đầu).
9. Đóng trình duyệt, in tóm tắt: số đội, số thành viên đã cào, thời gian chạy, và tóm tắt
   thay đổi so với lần cào trước (ví dụ: "+3 đội mới, -1 đội đã rút, 5 đội đổi thành viên").
```

Nhờ vậy: nếu bạn **đã đăng nhập Chrome sẵn nhưng là Chrome cá nhân khác** với Chromium riêng của Playwright, script vẫn tự xử lý được (vì nó dùng session riêng lưu ở `.auth/session.json`, không phụ thuộc Chrome hệ thống) — chỉ cần đăng nhập một lần trong cửa sổ mà script mở ra, các lần sau tự động.

## 5. Cấu trúc file/module

```
scripts/
  scrape-competitors.mjs   # entry point, chạy bằng `node scripts/scrape-competitors.mjs`
  rebuild-index.mjs        # quét toàn bộ data/scrapes/*.json (trừ derived files) -> sinh lại
                           # latest.json, CHANGELOG.md, src/data/competitors-data.json
  lib/
    auth.mjs               # kiểm tra + luồng đăng nhập, load/save storageState
    api.mjs                # các hàm gọi /fan/teams, /teams/{slug}, /profile/{slug} qua page.evaluate
    transform.mjs          # chuẩn hoá dữ liệu thô -> shape dùng cho Competitors.jsx
    diff.mjs               # so sánh 2 snapshot bất kỳ theo thứ tự thời gian, sinh danh sách thay đổi
.auth/
  session.json             # (gitignored) storageState Playwright đã đăng nhập — RIÊNG theo từng máy/người
.cache/
  teams/{slug}.json        # (gitignored) cache thô từng đội, để resume khi bị ngắt giữa chừng
  members/{slug}.json      # (gitignored) cache thô từng thành viên
data/scrapes/
  # --- NGUỒN THẬT (raw), luôn là file MỚI khi cào, không bao giờ conflict khi merge ---
  2026-07-09T100000-khoa.json     # snapshot: <timestamp>-<username hoặc slug người cào>.json
  2026-07-16T093000-hieu.json     # người khác cào vào thời điểm khác -> file khác, không đụng nhau
  # --- FILE TỔNG HỢP (derived), KHÔNG commit bằng tay / không cố merge thủ công khi conflict ---
  latest.json               # = snapshot có timestamp mới nhất, do rebuild-index.mjs SINH RA
  CHANGELOG.md              # nhật ký đọc được, do rebuild-index.mjs SINH LẠI TOÀN BỘ mỗi lần chạy
src/data/
  competitors-data.json    # bản "hiện tại" cho Competitors.jsx — cũng do rebuild-index.mjs sinh ra
```

## 6. Danh sách field cần cào (đã chốt theo yêu cầu)

**Đội (team):**
- Tên team
- Lĩnh vực quan tâm
- Kỹ năng cần
- Số lượng thành viên
- Danh sách thành viên (tên từng người + slug để link sang trang cá nhân)
- Đội trưởng (ai trong danh sách thành viên là đội trưởng)

**Cá nhân (member):**
- Tên
- Nghề nghiệp
- Ngành
- Kỹ năng
- Link GitHub
- Link LinkedIn
- Link Website
- Mô tả (bio giới thiệu bản thân, nếu profile có field này — cần xác nhận lại khi chạy thử vì chưa thấy rõ trong bản xem trước trang `/h/ducquangvu`)

## 7. Schema output dự kiến (`competitors-data.json`)

```json
{
  "scrapedAt": "2026-07-09T10:00:00+07:00",
  "totalTeams": 169,
  "teams": [
    {
      "slug": "ictuqtech",
      "name": "ICTU-QTech",
      "interests": ["Giáo dục & Đào tạo"],
      "skillsNeeded": ["AI/ML", "API / Tích hợp hệ thống", "Python"],
      "memberCount": 6,
      "leaderSlug": "ducquangvu",
      "members": [
        {
          "slug": "ducquangvu",
          "name": "Duc-quang Vu",
          "isLeader": true,
          "occupation": "Trí tuệ nhân tạo / Dữ liệu / Học máy, Nghiên cứu / Học thuật",
          "industries": ["Giáo dục", "Công nghệ"],
          "skills": ["AI/ML", "API / Tích hợp hệ thống", "Khoa học dữ liệu", "Python", "Nghiên cứu"],
          "links": { "github": "https://github.com/vdquang1991", "linkedin": null, "website": "https://vdquang1991.github.io/" },
          "description": null
        }
      ]
    }
  ]
}
```

Cần xác nhận lại field `description` (mô tả) và tên field chính xác trong JSON gốc (ví dụ API có thể đặt tên khác như `bio`, `about`) khi xem response thật — sẽ chốt lại ở bước chạy thử (mục 9, bước 6).

## 8. Lưu lịch sử & phát hiện thay đổi giữa các lần cào

Mỗi lần chạy `npm run scrape` là một **snapshot** mới, được lưu vĩnh viễn (không ghi đè, tên file có timestamp + người cào) trong `data/scrapes/`, và **được commit vào git** — nhờ vậy toàn bộ lịch sử thay đổi của 169 đội theo thời gian nằm ngay trong repo, không phải hạ tầng bên ngoài.

**Ngay sau khi cào xong (chạy local, trước khi commit):**
1. Script tự tìm snapshot có timestamp mới nhất đang có trong `data/scrapes/` (của chính mình hoặc của người khác đã merge trước đó) làm mốc so sánh.
2. So sánh với dữ liệu vừa cào được, theo từng cấp:
   - **Cấp đội**: đội mới xuất hiện (`teamsAdded`), đội biến mất/rút lui (`teamsRemoved`), đội còn tồn tại nhưng đổi thông tin (`teamsChanged`: đổi tên, đổi lĩnh vực quan tâm, đổi kỹ năng cần, đổi số lượng/đổi đội trưởng).
   - **Cấp thành viên trong đội**: thành viên mới vào đội, thành viên rời đội (so theo slug).
   - **Cấp hồ sơ cá nhân**: với thành viên có ở cả 2 lần, so sánh nghề nghiệp/ngành/kỹ năng/link/mô tả có đổi không (`membersChanged`).
3. In tóm tắt diff ra console ngay (không cần mở file mới biết có gì thay đổi), ví dụ: *"+3 đội mới, -1 đội đã rút, 5 đội đổi thành viên"*.
4. Ghi snapshot mới vào `data/scrapes/<timestamp>-<username>.json` — **đây là bước duy nhất cần commit**, các file tổng hợp (`latest.json`, `CHANGELOG.md`, `competitors-data.json`) sẽ được sinh lại tự động sau khi merge (xem mục 8b), không cần tự tay cập nhật hay cố merge nếu bị conflict.

## 8b. Nhiều người cùng cào & merge không xung đột

**Quy trình cho từng thành viên:**
1. Clone repo, `npm install`, `npx playwright install chromium` (chỉ lần đầu).
2. Chạy `npm run scrape` — script tự mở Chromium, tự phát hiện họ **chưa đăng nhập trên máy này** (vì `.auth/session.json` không được commit, mỗi máy/mỗi người có phiên riêng) → hiện hướng dẫn đăng nhập theo đúng luồng ở mục 4, họ đăng nhập bằng **tài khoản của chính họ**.
3. Script cào xong, in tóm tắt diff, ghi ra file `data/scrapes/<timestamp>-<username-của-họ>.json`.
4. Họ tạo branch mới, `git add data/scrapes/<file-vừa-tạo>`, commit, push, mở Pull Request.
5. Vì tên file luôn duy nhất (timestamp + username), **PR của nhiều người không bao giờ conflict ở bước này** dù cào cùng lúc.

**Sau khi PR được merge vào `main` (một người bất kỳ, hoặc tự động qua CI):**
- Chạy `npm run rebuild-index` (script `scripts/rebuild-index.mjs`):
  - Quét toàn bộ `data/scrapes/*.json` (loại trừ `latest.json`), sắp xếp theo timestamp trong tên file.
  - Sinh lại `latest.json` = snapshot mới nhất.
  - Sinh lại toàn bộ `CHANGELOG.md` bằng cách diff lần lượt từng cặp snapshot liên tiếp theo thời gian (không phải "append", mà build lại từ đầu — nên không bao giờ có file bị lệch do merge order khác nhau).
  - Sinh lại `src/data/competitors-data.json` từ snapshot mới nhất.
- Commit 3 file tổng hợp này (thường không conflict vì luôn được *ghi đè hoàn toàn*, không merge từng dòng — nếu lỡ có conflict thì cách xử lý luôn là: xoá, chạy lại `npm run rebuild-index`, commit đè).

**Tuỳ chọn nâng cao:** thêm một GitHub Action chạy `npm run rebuild-index` tự động mỗi khi có commit mới vào `main` (đúng lúc PR merge xong) và tự commit lại 3 file tổng hợp — khi đó không ai phải nhớ chạy tay bước này. Đây vẫn không phải "backend" (không có server chạy liên tục phục vụ request), chỉ là một job CI chạy 1 lần rồi tắt.

## 9. Các bước triển khai (tổng hợp thứ tự làm)

1. Thêm `playwright` vào `devDependencies`, chạy `npx playwright install chromium` (một lần, mỗi thành viên tự chạy trên máy họ).
2. Thêm `.auth/` và `.cache/` vào `.gitignore` (nhưng **không** gitignore `data/scrapes/` — thư mục này cố ý được commit để giữ lịch sử).
3. Viết `scripts/lib/auth.mjs`: load/save storageState, hàm `ensureLoggedIn(context, page)` thực hiện đúng luồng ở mục 4.
4. Viết `scripts/lib/api.mjs`: 3 hàm `fetchAllTeams()`, `fetchTeamDetail(slug)`, `fetchProfile(slug)` — đều gọi qua `page.evaluate(fetch...)`.
5. Viết `scripts/lib/diff.mjs`: hàm thuần so sánh 2 snapshot bất kỳ (không phụ thuộc file cụ thể) — dùng lại được cả lúc cào (in tóm tắt console) lẫn lúc `rebuild-index` (sinh CHANGELOG).
6. Viết `scripts/scrape-competitors.mjs`: nối các bước, tự đặt tên file `data/scrapes/<timestamp>-<username>.json` (username lấy từ `/users/me` hoặc từ biến môi trường `SCRAPER_NAME`), có log tiến độ và in tóm tắt diff cuối cùng.
7. Viết `scripts/rebuild-index.mjs`: quét toàn bộ snapshot trong `data/scrapes/`, sinh lại `latest.json`, `CHANGELOG.md`, `src/data/competitors-data.json` (theo mục 8b).
8. **Chạy thử với ~5-10 đội trước** (giới hạn bằng biến môi trường hoặc flag `--limit=10`) để kiểm tra schema JSON thật khớp với mục 7, chỉnh `transform.mjs` cho đúng.
9. Chạy full 169 đội, kiểm tra snapshot đầu tiên trong `data/scrapes/` + `rebuild-index` sinh ra `competitors-data.json` hợp lệ.
10. Thêm vào `package.json`: `"scrape": "node scripts/scrape-competitors.mjs"` và `"rebuild-index": "node scripts/rebuild-index.mjs"`.
11. Refactor `src/pages/Competitors.jsx`:
    - Import `competitors-data.json` thay cho mảng mock.
    - Định nghĩa lại công thức xếp hạng/so sánh dựa trên dữ liệu thật có (số thành viên, độ đa dạng kỹ năng, trùng track SME...) — chốt cụ thể khi code, vì bản mock hiện tại có "điểm số" hư cấu không thể giữ nguyên.
    - Thêm bộ lọc theo track/kỹ năng cho danh sách 169 đội (tuỳ chọn, nếu cần).
    - Giữ nguyên phần so sánh Vibonymus vs đối thủ đã có.
12. `npm run build` để kiểm tra site build ổn với dữ liệu thật.
13. Viết README ngắn hướng dẫn thành viên khác: clone → cài đặt → `npm run scrape` (tự đăng nhập tài khoản riêng) → mở PR → sau khi merge chạy `npm run rebuild-index`.
14. (Tuỳ chọn) Thêm GitHub Action tự chạy `rebuild-index` khi có commit mới vào `main`.
15. Test thử với snapshot giả lập của "người thứ 2" để xác nhận merge không conflict và `rebuild-index` chạy đúng.

## 10. Lưu ý / ràng buộc

- Chỉ cào dữ liệu mà tài khoản (của bạn hoặc từng thành viên) đã có quyền xem qua giao diện web (không bypass auth/permission, không đoán mật khẩu, không tự động hoá bước đăng nhập).
- Giữ tốc độ request thấp (delay giữa các lần gọi), tránh gây tải cho server ban tổ chức.
- Không commit `.auth/session.json`, `.cache/`, hay bất kỳ cookie/token nào vào git. Ngược lại, `data/scrapes/*.json` (snapshot lịch sử) **nên** được commit vì đó chính là mục đích lưu lịch sử.
- Nếu ban tổ chức có điều khoản sử dụng (ToS) cấm cào dữ liệu, cần bạn xác nhận việc này chỉ phục vụ mục đích cá nhân/nghiên cứu nội bộ trong team, không phát tán dữ liệu thành viên các đội khác ra ngoài.

## 11. Việc cần làm tiếp theo

- [ ] Xác nhận kiến trúc Playwright (mục 4) là hướng bạn muốn, hay muốn đơn giản hơn (cookie thủ công như bản plan trước)
- [ ] Thêm Playwright + cấu hình `.gitignore`
- [ ] Viết `scripts/lib/auth.mjs` (luồng đăng nhập + lưu session)
- [ ] Viết `scripts/lib/api.mjs` + `scripts/lib/diff.mjs` + `scripts/scrape-competitors.mjs`
- [ ] Viết `scripts/rebuild-index.mjs` (sinh lại latest.json / CHANGELOG.md / competitors-data.json)
- [ ] Chạy thử giới hạn ~5-10 đội, chốt schema JSON thật
- [ ] Chạy full 169 đội, sinh snapshot đầu tiên + chạy rebuild-index ra `competitors-data.json`
- [ ] Chốt công thức xếp hạng/so sánh mới cho `Competitors.jsx`
- [ ] Refactor `Competitors.jsx` dùng dữ liệu thật
- [ ] Viết README hướng dẫn thành viên khác chạy cào + mở PR
- [ ] Test giả lập 2 người cùng cào rồi merge, xác nhận không conflict
