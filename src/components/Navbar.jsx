import React from 'react';
import { Trophy, Swords, Users } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'competition', label: 'Cuộc thi', icon: <Trophy /> },
    { id: 'competitors', label: 'Đối thủ', icon: <Swords /> },
    { id: 'team', label: 'Team', icon: <Users /> },
  ];

  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        {/* Sliding active indicator backgrounds */}
        <div
          className="nav-indicator"
          style={{
            width: `calc((100% - 0.7059rem) / ${tabs.length})`,
            transform: `translateX(${activeIndex * 100}%)`
          }}
        />

        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
