import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Workflow from './Workflow';
import Roles from './Roles';
import AIResource from './AIResource';

const SUB_TABS = [
  { id: 'gantt', label: 'Gantt' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'roles', label: 'Thành viên' },
  { id: 'ai', label: 'AI Resource' },
];

const TeamPage = () => {
  const [subTab, setSubTab] = useState('gantt');

  return (
    <div className="page-content">
      <div className="day-tabs">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            className={`day-tab ${subTab === t.id ? 'active' : ''}`}
            onClick={() => setSubTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subTab === 'gantt' && <Dashboard />}
      {subTab === 'workflow' && <Workflow />}
      {subTab === 'roles' && <Roles />}
      {subTab === 'ai' && <AIResource />}
    </div>
  );
};

export default TeamPage;
