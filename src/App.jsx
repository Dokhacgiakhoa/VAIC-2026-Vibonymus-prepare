import React, { useState } from 'react';
import './App.css';
import CompetitionPage from './pages/CompetitionPage';
import Competitors from './pages/Competitors';
import TeamPage from './pages/TeamPage';
import Navbar from './components/Navbar';

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (['competition', 'competitors', 'team'].includes(hash)) {
      return hash;
    }
    const saved = localStorage.getItem('vaic_active_tab');
    if (['competition', 'competitors', 'team'].includes(saved)) {
      return saved;
    }
    return 'competition';
  });

  React.useEffect(() => {
    window.location.hash = activeTab;
    localStorage.setItem('vaic_active_tab', activeTab);
    window.scrollTo(0, 0);
  }, [activeTab]);

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['competition', 'competitors', 'team'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'competition':
        return <CompetitionPage />;
      case 'competitors':
        return <Competitors />;
      case 'team':
        return <TeamPage />;
      default:
        return <CompetitionPage />;
    }
  };

  return (
    <div className="viz-root">
      {/* Active Page Content */}
      <main>
        {renderContent()}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
