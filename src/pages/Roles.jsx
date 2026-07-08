import React from 'react';
import { Users, Table, Activity } from 'lucide-react';

const Roles = () => {
  return (
    <div className="page-content">
      {/* Phân công vai trò */}
      <div className="card">
        <h2><Users /> Phân công vai trò thành viên</h2>
        <p className="sub" style={{ margin: '0 0 20px' }}>
          <b>Triết lý phân vai cộng tác AI-assisted:</b> Thành viên chủ trì chịu trách nhiệm chính <b>80%</b> công việc mảng đó bằng cách sử dụng AI tăng tốc, hai thành viên còn lại đóng vai trò hỗ trợ chéo mỗi người <b>10%</b> (để review, kiểm thử và tối ưu hóa chéo).
        </p>
        <div className="roles-grid">
          <div className="role-card">
            <div className="role-name"><span className="role-dot" style={{ background: 'var(--s1)' }}></span> K.AI</div>
            <div className="role-title">PM &amp; Pitching (Thuyết trình)</div>
            <ul className="role-list">
              <li><b>Chủ trì (80%)</b>: Quản trị tiến độ chung (PM), soạn thảo slide thuyết trình (14 slides), xây dựng kịch bản pitch và trực tiếp thuyết trình trước hội đồng giám khảo.</li>
              <li><b>Hỗ trợ (10% BE &amp; DB)</b>: Tư vấn và hỗ trợ Quân thiết kế kiến trúc hệ thống mẫu và Docker setup ban đầu.</li>
              <li><b>Hỗ trợ (10% FE)</b>: Hỗ trợ Hiếu kiểm thử giao diện React, fix các lỗi tích hợp API trên Frontend.</li>
            </ul>
          </div>
          <div className="role-card">
            <div className="role-name"><span className="role-dot" style={{ background: 'var(--s2)' }}></span> Quân</div>
            <div className="role-title">Backend &amp; Database</div>
            <ul className="role-list">
              <li><b>Chủ trì (80%)</b>: Thiết kế cấu trúc cơ sở dữ liệu (Database Schema), lập trình logic API Backend, tích hợp API nhà tài trợ và kết nối mô hình ngôn ngữ lớn (LLM).</li>
              <li><b>Hỗ trợ (10% PM &amp; Pitch)</b>: Phản biện bài toán, hỗ trợ K.AI viết tài liệu thuyết minh sản phẩm &amp; collab log AI.</li>
              <li><b>Hỗ trợ (10% FE)</b>: Phối hợp kiểm thử kết nối đầu cuối (End-to-End) và luồng nhận dữ liệu của Frontend.</li>
            </ul>
          </div>
          <div className="role-card">
            <div className="role-name"><span className="role-dot" style={{ background: 'var(--s3)' }}></span> Hiếu</div>
            <div className="role-title">Frontend &amp; Marketing</div>
            <ul className="role-list">
              <li><b>Chủ trì (80%)</b>: Thiết kế giao diện UI/UX trên Figma, chuyển đổi thiết kế sang code React (Frontend), làm mịn visual và viết các micro-animations.</li>
              <li><b>Hỗ trợ (10% PM &amp; Pitch)</b>: Hỗ trợ K.AI thiết kế slide thuyết trình, phối màu và căn chỉnh kịch bản demo.</li>
              <li><b>Hỗ trợ (10% BE)</b>: Đóng góp ý kiến về định dạng dữ liệu trả về từ API sao cho dễ render và thân thiện với người dùng.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bảng phân công chéo */}
      <div className="card">
        <h2><Table /> Phân công trách nhiệm chéo (Cross Responsibility Matrix)</h2>
        <p className="sub" style={{ margin: '0 0 16px' }}>Các mốc phối hợp quan trọng đảm bảo không ai bị cô lập và sản phẩm đồng bộ nhanh chóng.</p>
        <div className="cross-table-scroll">
          <table className="cross-table">
            <thead>
              <tr>
                <th>Mốc thời gian phối hợp</th>
                <th>K.AI (PM &amp; Pitch)</th>
                <th>Quân (Backend &amp; DB)</th>
                <th>Hiếu (Frontend &amp; MKT)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Nhận đề &amp; Brainstorm (D1, 11:00-14:00)</b></td>
                <td>Chủ trì định hướng chọn track và khung giải pháp</td>
                <td>Góp ý kiến trúc DB và API khả thi</td>
                <td>Phác thảo nhanh wireframe ý tưởng UI</td>
              </tr>
              <tr>
                <td><b>Dựng Prototype sơ bộ (D1, 14:00-19:00)</b></td>
                <td>Soạn thảo kịch bản demo và outline slide pitch</td>
                <td>Thiết kế DB schema, dựng api mockup</td>
                <td>Dựng thiết kế Figma, export CSS giao diện</td>
              </tr>
              <tr>
                <td><b>Tích hợp Frontend &amp; AI (D2, 09:00-15:00)</b></td>
                <td>Review bài thuyết trình và slide ban đầu với mentor</td>
                <td>Nhúng API AI, kết nối server Backend</td>
                <td>Code giao diện React, kết nối API hiển thị</td>
              </tr>
              <tr>
                <td><b>Chuẩn bị Demo &amp; Slide (D2, 16:00-21:00)</b></td>
                <td>Tập dượt thuyết trình, hoàn thiện slide</td>
                <td>Deploy URL Backend, viết thuyết minh và log AI</td>
                <td>Hoàn thiện giao diện FE mượt mà, hỗ trợ làm slide</td>
              </tr>
              <tr>
                <td><b>Đóng gói &amp; Submit (D3, 07:00-11:00)</b></td>
                <td>Kiểm duyệt slides, rehearsal bài pitching lần cuối</td>
                <td>Nộp mô tả dự án &amp; link repo GitHub công khai</td>
                <td>Quay và nộp demo video (≤5 phút)</td>
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
