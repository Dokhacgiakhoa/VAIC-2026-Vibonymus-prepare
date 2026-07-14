import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { agendaData } from '../data/agenda-data';

const Agenda = () => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="page-content">
      <div className="card">
        <h2><Calendar /> Lịch trình sự kiện chi tiết (Agenda)</h2>
        <p className="sub" style={{ margin: '0 0 1.1765rem' }}>Đối chiếu múi giờ và mốc thời gian quan trọng của Ban tổ chức để căn chỉnh tiến độ code.</p>
        
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
                style={event.critical ? { color: 'var(--critical)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4706rem' } : {}}
                dangerouslySetInnerHTML={{ __html: event.desc }}
              />
            </div>
          ))}
        </div>
        <div className="note" style={{ marginTop: '1.1765rem' }}>* Giờ dự kiến và có thể được Ban tổ chức điều chỉnh thêm qua các kênh chat chính thức.</div>
      </div>
    </div>
  );
};

export default Agenda;
