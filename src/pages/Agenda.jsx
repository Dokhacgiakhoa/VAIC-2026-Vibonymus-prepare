import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const Agenda = () => {
  const [activeDay, setActiveDay] = useState(0);

  const agendaData = [
    {
      day: "Thứ Sáu, 17/07",
      events: [
        { time: "08:00–08:30", desc: "Check-in & ổn định chỗ ngồi tại NIC Hòa Lạc." },
        { time: "08:30–09:30", desc: "Khai mạc sự kiện, giới thiệu Mentor & nhà tài trợ." },
        { time: "09:30–10:00", desc: "Công bố danh sách Track đăng ký chính thức của các đội." },
        { time: "10:00–11:00", desc: "Thời gian đăng ký/điều chỉnh thông tin cuối cùng." },
        { time: "11:00", desc: "<b>CÔNG BỐ ĐỀ BÀI CHÍNH THỨC</b> — Bắt đầu 48h hackathon.", critical: true },
        { time: "12:00–13:30", desc: "Ăn trưa, nhận phòng/vị trí làm việc của team." },
        { time: "16:00–17:30", desc: "Workshop kỹ thuật từ nhà tài trợ chính (Google, Meta, FPT...)." },
        { time: "18:00–19:30", desc: "Ăn tối tự chọn tại khu ẩm thực NIC." },
        { time: "19:30–21:00", desc: "Giao lưu AI & Networking giữa các đội." },
        { time: "21:00–07:00", desc: "Đêm phát triển đầu tiên — Tập trung dựng core logic và repo." }
      ]
    },
    {
      day: "Thứ Bảy, 18/07",
      events: [
        { time: "07:00–09:00", desc: "Ăn sáng linh hoạt." },
        { time: "09:00–10:30", desc: "<b>Checkpoint 1</b> — nộp project name, track đã chọn, mô tả giải pháp & hướng tiếp cận ban đầu.", critical: true },
        { time: "10:00–12:00", desc: "Mentor Wave 1: rà soát kiến trúc kỹ thuật (đăng ký slot 20' trước 16/07)." },
        { time: "16:00–17:30", desc: "Mentor Wave 2: UX, thiết kế, kinh doanh — song song 5 phòng." },
        { time: "18:00–19:30", desc: "Ăn tối, DJ ngoài trời, trivia/relay-race theo faction." },
        { time: "21:00–23:00", desc: "<b>Checkpoint 2</b> — nộp live deployed URL và GitHub repository public.", critical: true },
        { time: "23:00–07:00", desc: "Phiên phát triển đêm cuối; khu đồ ăn nhẹ + trạm y tế hoạt động 24/7." }
      ]
    },
    {
      day: "Chủ Nhật, 19/07",
      events: [
        { time: "07:00–09:00", desc: "Ăn sáng, chuẩn bị nộp bài cuối cùng." },
        { time: "09:00", desc: "Mở cửa khu vực cộng đồng." },
        { time: "11:00", desc: "<b>Đóng cổng nộp bài</b> — hạn chót, không gia hạn.", critical: true },
        { time: "13:00", desc: "Công bố Top 10 đội vào chung kết." },
        { time: "15:00", desc: "Top 10 thuyết trình trực tiếp trên sân khấu chính, phát sóng toàn quốc." },
        { time: "17:00", desc: "Lễ trao giải — Chung kết sân khấu chính." }
      ]
    }
  ];

  return (
    <div className="page-content">
      <div className="card">
        <h2><Calendar /> Lịch trình sự kiện chi tiết (Agenda)</h2>
        <p className="sub" style={{ margin: '0 0 20px' }}>Đối chiếu múi giờ và mốc thời gian quan trọng của Ban tổ chức để căn chỉnh tiến độ code.</p>
        
        {/* Day selection tabs */}
        <div className="day-tabs">
          {agendaData.map((dayObj, index) => (
            <button
              key={index}
              className={`day-tab ${activeDay === index ? 'active' : ''}`}
              onClick={() => setActiveDay(index)}
              aria-selected={activeDay === index ? 'true' : 'false'}
            >
              {dayObj.day}
            </button>
          ))}
        </div>

        {/* Selected Day Timeline */}
        <div className="agenda-day">
          {agendaData[activeDay].events.map((event, idx) => (
            <div key={idx} className="agenda-row">
              <div className="agenda-time">{event.time}</div>
              <div 
                className="agenda-desc" 
                style={event.critical ? { color: 'var(--critical)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' } : {}}
                dangerouslySetInnerHTML={{ __html: event.desc }}
              />
            </div>
          ))}
        </div>
        <div className="note" style={{ marginTop: '20px' }}>* Giờ dự kiến và có thể được Ban tổ chức điều chỉnh thêm qua các kênh chat chính thức.</div>
      </div>
    </div>
  );
};

export default Agenda;
