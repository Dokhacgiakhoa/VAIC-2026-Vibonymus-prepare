import React, { useState } from 'react';
import Agenda from './Agenda';
import Awards from '../components/Awards';
import Tracks from './Tracks';

const SUB_TABS = [
  { id: 'agenda', label: 'Agenda' },
  { id: 'awards', label: 'Giải thưởng' },
  { id: 'guideline', label: 'Guideline' },
];

const CompetitionPage = () => {
  const [subTab, setSubTab] = useState('agenda');

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

      {subTab === 'agenda' && <Agenda />}
      {subTab === 'awards' && <Awards />}
      {subTab === 'guideline' && <Tracks />}
    </div>
  );
};

export default CompetitionPage;
