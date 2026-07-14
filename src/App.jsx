import React, { useState } from 'react';
import './App.css';
import CompetitionPage from './pages/CompetitionPage';
import Competitors from './pages/Competitors';
import TeamPage from './pages/TeamPage';
import Navbar from './components/Navbar';

function App() {
  const [activeTab, setActiveTab] = useState('competition');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

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
