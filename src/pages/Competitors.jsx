import React, { useState } from 'react';
import CompetitorsTeam from './competitors/CompetitorsTeam';
import CompetitorsIndividual from './competitors/CompetitorsIndividual';

const SUB_TABS = [
  { id: 'team', label: 'Team' },
  { id: 'individual', label: 'Cá nhân' },
];

const Competitors = () => {
  const [subTab, setSubTab] = useState('team');

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

      {subTab === 'team' && <CompetitorsTeam />}
      {subTab === 'individual' && <CompetitorsIndividual />}
    </div>
  );
};

export default Competitors;
