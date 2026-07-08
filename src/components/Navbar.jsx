import React from 'react';
import { Home, Calendar, UserCheck, Cpu, Compass, GitBranch, BarChart2 } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home /> },
    { id: 'agenda', label: 'Agenda', icon: <Calendar /> },
    { id: 'tracks', label: '8 Tracks', icon: <Compass /> },
    { id: 'tools', label: 'AI Resource', icon: <Cpu /> },
    { id: 'teams', label: 'Competitors', icon: <BarChart2 /> },
    { id: 'roles', label: 'Roles', icon: <UserCheck /> },
    { id: 'workflow', label: 'Workflow', icon: <GitBranch /> }
  ];

  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        {/* Sliding active indicator backgrounds */}
        <div 
          className="nav-indicator" 
          style={{ 
            width: `calc((100% - 12px) / ${tabs.length})`,
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
