import React from 'react';
import { ClipboardList, FolderGit2, Luggage } from 'lucide-react';
import { introNote, memberChecklists, openSourceToLearn, logisticsChecklist } from '../data/preparation-data';

const Preparation = () => {
  return (
    <div className="page-content">
      <div className="card">
        <h2><ClipboardList /> Chuẩn bị trước ngày thi</h2>
        <p className="sub" style={{ margin: '0 0 1.1765rem' }}>{introNote}</p>

        <div className="roles-grid">
          {memberChecklists.map((m) => (
            <div className="role-card" key={m.name}>
              <div className="role-name"><span className="role-dot" style={{ background: `var(${m.colorVar})` }}></span> {m.name}</div>
              <div className="role-title">{m.role}</div>
              <ul className="role-list">
                {m.items.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5882rem' }}>
          <FolderGit2 style={{ color: 'var(--s1)' }} /> Công cụ &amp; mã nguồn mở nên tìm hiểu trước
        </h2>
        <p className="sub" style={{ margin: '0 0 1.1765rem' }}>
          Không phải chờ đến khi vào trận mới học — làm quen trước để 48h chỉ tập trung vào build sản phẩm:
        </p>
        <div className="grid-2">
          {openSourceToLearn.map((item, i) => (
            <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '0.7059rem', padding: '0.9412rem', background: 'var(--surface-page)' }}>
              <h3 style={{ margin: '0 0 0.4706rem', color: `var(${item.colorVar})`, fontSize: '0.92rem', fontWeight: 800 }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2><Luggage /> Hậu cần &amp; checklist cá nhân</h2>
        <ul className="checklist">
          {logisticsChecklist.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Preparation;
