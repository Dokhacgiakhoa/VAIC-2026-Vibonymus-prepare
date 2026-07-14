import React from 'react';
import { Users, Table, Activity } from 'lucide-react';

const Roles = () => {
  return (
    <div className="page-content">
      {/* Phân công vai trò */}
      <div className="card">
        <h2><Users /> Phân công vai trò thành viên</h2>
        <p className="sub" style={{ margin: '0 0 1.1765rem' }}>
          <b>Triết lý phân vai cộng tác AI-assisted:</b> Team gồm 5 thành viên (theo hồ sơ đăng ký chính thức trên hub.aiforvietnam.org), mỗi người chủ trì mảng thế mạnh dựa trên kỹ năng thật và dùng AI tăng tốc, các thành viên còn lại hỗ trợ chéo để đảm bảo không ai bị cô lập.
        </p>
        <div className="roles-grid">
          <div className="role-card">
            <div className="role-name"><span className="role-dot" style={{ background: 'var(--s1)' }}></span> K.AI</div>
            <div className="role-title">PM, Pitching &amp; Frontend/UI-UX (Đội trưởng)</div>
            <ul className="role-list">
              <li><b>Chủ trì (60%)</b>: Quản trị tiến độ chung (PM), soạn thảo slide thuyết trình, xây dựng kịch bản pitch và trực tiếp thuyết trình trước hội đồng giám khảo.</li>
              <li><b>Chủ trì (25% FE &amp; UI/UX)</b>: Thiết kế giao diện, chuyển đổi thiết kế sang code React (Frontend) — tận dụng kỹ năng UI/UX &amp; Web Development sẵn có.</li>
              <li><b>Hỗ trợ (15%)</b>: Điều phối chung giữa mảng AI (Mai, Quang) và Backend (Quân), tổng hợp AI Collaboration Log.</li>
            </ul>
          </div>
          <div className="role-card">
            <div className="role-name"><span className="role-dot" style={{ background: 'var(--s2)' }}></span> Quân</div>
            <div className="role-title">Backend &amp; Database</div>
            <ul className="role-list">
              <li><b>Chủ trì (80%)</b>: Thiết kế cấu trúc cơ sở dữ liệu (Database Schema), lập trình logic API Backend, tích hợp API nhà tài trợ.</li>
              <li><b>Hỗ trợ (20%)</b>: Phối hợp với Mai/Quang để kết nối endpoint AI vào hệ thống, hỗ trợ K.AI viết tài liệu thuyết minh sản phẩm.</li>
            </ul>
          </div>
          <div className="role-card">
            <div className="role-name"><span className="role-dot" style={{ background: 'var(--s5)' }}></span> Mai</div>
            <div className="role-title">AI/ML &amp; Data Science</div>
            <ul className="role-list">
              <li><b>Chủ trì (80%)</b>: Xây dựng pipeline dữ liệu, huấn luyện/tinh chỉnh mô hình AI/ML, thiết kế RAG &amp; vector database — dựa trên kỹ năng AI/ML, Khoa học dữ liệu, Nghiên cứu.</li>
              <li><b>Hỗ trợ (20%)</b>: Phối hợp với Quang kiểm thử độ chính xác Agent, hỗ trợ Quân định dạng dữ liệu trả về từ API AI.</li>
            </ul>
          </div>
          <div className="role-card">
            <div className="role-name"><span className="role-dot" style={{ background: 'var(--s6)' }}></span> Quang</div>
            <div className="role-title">AI Agent, API Integration &amp; Security</div>
            <ul className="role-list">
              <li><b>Chủ trì (80%)</b>: Thiết kế logic AI Agent, tích hợp API AI (LLM providers), rà soát bảo mật hệ thống — dựa trên kỹ năng AI/ML, API/Tích hợp hệ thống, Bảo mật.</li>
              <li><b>Hỗ trợ (20%)</b>: Phối hợp với Mai kiểm thử pipeline AI, hỗ trợ Quân bảo mật API Backend.</li>
            </ul>
          </div>
          <div className="role-card">
            <div className="role-name"><span className="role-dot" style={{ background: 'var(--s7)' }}></span> Lâm</div>
            <div className="role-title">QA, Kiểm thử &amp; Hậu cần</div>
            <ul className="role-list">
              <li><b>Chủ trì (70%)</b>: Kiểm thử toàn hệ thống (QA), rà soát lỗi trước mỗi lần demo/checkpoint, chuẩn bị hậu cần đội trong 48h.</li>
              <li><b>Hỗ trợ (30%)</b>: Ghi chép AI Collaboration Log cùng K.AI, hỗ trợ chạy thử kịch bản demo trước giờ pitching.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bảng phân công chéo */}
      <div className="card">
        <h2><Table /> Phân công trách nhiệm chéo (Cross Responsibility Matrix)</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem' }}>Các mốc phối hợp quan trọng đảm bảo không ai bị cô lập và sản phẩm đồng bộ nhanh chóng.</p>
        <div className="cross-table-scroll">
          <table className="cross-table">
            <thead>
              <tr>
                <th>Mốc thời gian phối hợp</th>
                <th>K.AI (PM &amp; Frontend)</th>
                <th>Quân (Backend &amp; DB)</th>
                <th>Mai (AI/ML &amp; Data)</th>
                <th>Quang (AI Agent &amp; API)</th>
                <th>Lâm (QA &amp; Hậu cần)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Nhận đề &amp; Brainstorm (D1, 11:00-14:00)</b></td>
                <td>Chủ trì định hướng chọn track, khung giải pháp và phác thảo nhanh wireframe UI</td>
                <td>Góp ý kiến trúc DB và API khả thi</td>
                <td>Đánh giá nguồn dữ liệu/mô hình AI khả dụng cho track</td>
                <td>Phác thảo kiến trúc AI Agent &amp; các API AI cần tích hợp</td>
                <td>Chuẩn bị checklist hậu cần, ghi chú brainstorm</td>
              </tr>
              <tr>
                <td><b>Dựng Prototype sơ bộ (D1, 14:00-19:00)</b></td>
                <td>Soạn thảo kịch bản demo, outline slide pitch và dựng thiết kế giao diện</td>
                <td>Thiết kế DB schema, dựng api mockup</td>
                <td>Xây dựng pipeline dữ liệu &amp; thử nghiệm mô hình AI đầu tiên</td>
                <td>Dựng khung AI Agent, cấu hình kết nối LLM provider</td>
                <td>Kiểm thử sơ bộ luồng, ghi nhận lỗi ban đầu</td>
              </tr>
              <tr>
                <td><b>Tích hợp Frontend &amp; AI (D2, 09:00-15:00)</b></td>
                <td>Code giao diện React, kết nối API hiển thị, review bài thuyết trình với mentor</td>
                <td>Nhúng API AI, kết nối server Backend</td>
                <td>Tinh chỉnh mô hình/RAG theo phản hồi mentor</td>
                <td>Tích hợp Agent vào Backend, rà soát bảo mật API</td>
                <td>QA vòng 1: kiểm thử end-to-end, báo lỗi</td>
              </tr>
              <tr>
                <td><b>Chuẩn bị Demo &amp; Slide (D2, 16:00-21:00)</b></td>
                <td>Hoàn thiện giao diện FE mượt mà, tập dượt thuyết trình, hoàn thiện slide</td>
                <td>Deploy URL Backend, viết thuyết minh và log AI</td>
                <td>Chốt độ chính xác AI, chuẩn bị số liệu minh chứng</td>
                <td>Kiểm thử tải &amp; độ ổn định Agent trước demo</td>
                <td>QA vòng 2, hỗ trợ chạy thử kịch bản demo</td>
              </tr>
              <tr>
                <td><b>Đóng gói &amp; Submit (D3, 07:00-11:00)</b></td>
                <td>Kiểm duyệt slides, quay demo video (≤5 phút), rehearsal bài pitching lần cuối</td>
                <td>Nộp mô tả dự án &amp; link repo GitHub công khai</td>
                <td>Hoàn thiện tài liệu mô tả mô hình/pipeline AI</td>
                <td>Rà soát bảo mật lần cuối trước khi nộp bài</td>
                <td>Kiểm tra checklist nộp bài đầy đủ, hậu cần rehearsal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sơ đồ workflow */}
      <div className="card">
        <h2><Activity /> Quy trình phối hợp 48h</h2>
        <div className="flow">
          <div className="flow-step">
            <div className="flow-num">1</div>
            <div className="flow-title">Nhận đề bài</div>
            <div className="flow-desc">11:00 17/07 — Nghe giới thiệu 8 track, bối cảnh, tiêu chí chấm của BTC.</div>
          </div>
          <div className="flow-step">
            <div className="flow-num">2</div>
            <div className="flow-title">Chọn track</div>
            <div className="flow-desc">Cả team chốt track phù hợp năng lực &amp; mối quan tâm nhanh chóng trước 12:00.</div>
          </div>
          <div className="flow-step">
            <div className="flow-num">3</div>
            <div className="flow-title">Phát triển giải pháp</div>
            <div className="flow-desc">Phân tích vấn đề → Build prototype → Tích hợp AI. Chia ca ngủ luân phiên qua 2 đêm.</div>
          </div>
          <div className="flow-step">
            <div className="flow-num">4</div>
            <div className="flow-title">Mentoring &amp; Tinh chỉnh</div>
            <div className="flow-desc">Nhận phản hồi từ Mentor Wave 1 (kiến trúc) &amp; Wave 2 (UX) để tinh chỉnh sản phẩm.</div>
          </div>
          <div className="flow-step">
            <div className="flow-num">5</div>
            <div className="flow-title">Nộp bài &amp; Pitch</div>
            <div className="flow-desc">Nộp đủ 5 hạng mục trước 11:00 19/07. Sẵn sàng Pitch trực tiếp nếu lọt Top 10.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
