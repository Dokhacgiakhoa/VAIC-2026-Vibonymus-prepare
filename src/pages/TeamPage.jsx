import React from 'react';
import Dashboard from './Dashboard';
import Workflow from './Workflow';
import Roles from './Roles';
import AIResource from './AIResource';
import Preparation from './Preparation';
import { usePersistedTab } from '../hooks/usePersistedTab';

const SUB_TABS = [
  { id: 'gantt', label: 'Gantt' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'roles', label: 'Thành viên' },
  { id: 'ai', label: 'AI Resource' },
  { id: 'prep', label: 'Chuẩn bị' },
];
const SUB_TAB_IDS = SUB_TABS.map((t) => t.id);

const TeamPage = () => {
  const [subTab, setSubTab] = usePersistedTab('vaic_team_subtab', 'gantt', SUB_TAB_IDS);

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
      {subTab === 'prep' && <Preparation />}
    </div>
  );
};

export default TeamPage;
