import React from 'react';
import { Users, Table, Activity } from 'lucide-react';
import { philosophyNote, roleCards, crossTableHeaders, crossTableRows, flowSteps } from '../data/roles-data';

const Roles = () => {
  return (
    <div className="page-content">
      {/* Phân công vai trò */}
      <div className="card">
        <h2><Users /> Phân công vai trò thành viên</h2>
        <p className="sub" style={{ margin: '0 0 1.1765rem' }}>
          <b>Triết lý phân vai cộng tác AI-assisted:</b> {philosophyNote}
        </p>
        <div className="roles-grid">
          {roleCards.map((role) => (
            <div className="role-card" key={role.name}>
              <div className="role-name"><span className="role-dot" style={{ background: `var(${role.colorVar})` }}></span> {role.name}</div>
              <div className="role-title">{role.title}</div>
              <div style={{ display: 'inline-block', marginTop: '0.3529rem', fontSize: '0.72rem', fontWeight: 800, color: `var(${role.colorVar})`, background: `color-mix(in srgb, var(${role.colorVar}) 12%, transparent)`, padding: '0.1176rem 0.4706rem', borderRadius: '0.2941rem' }}>
                🤖 {role.aiTool}
              </div>
              <p style={{ margin: '0.5882rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{role.summary}</p>
              <ul className="role-list">
                {role.responsibilities.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bảng phân công chéo */}
      <div className="card">
        <h2><Table /> Phân công trách nhiệm chéo (Cross Responsibility Matrix)</h2>
        <p className="sub" style={{ margin: '0 0 1.1765rem' }}>Các mốc phối hợp quan trọng đảm bảo không ai bị cô lập và sản phẩm đồng bộ nhanh chóng.</p>
        <div className="cross-table-scroll">
          <table className="cross-table">
            <thead>
              <tr>
                {crossTableHeaders.map((h, i) => <th key={i}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {crossTableRows.map((row, i) => (
                <tr key={i}>
                  <td><b>{row.milestone}</b></td>
                  {row.cells.map((cell, j) => <td key={j}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sơ đồ workflow */}
      <div className="card">
        <h2><Activity /> Quy trình phối hợp 48h</h2>
        <div className="flow">
          {flowSteps.map((step) => (
            <div className="flow-step" key={step.num}>
              <div className="flow-num">{step.num}</div>
              <div className="flow-title">{step.title}</div>
              <div className="flow-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roles;
