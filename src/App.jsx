import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Agenda from './pages/Agenda';
import Roles from './pages/Roles';
import AIResource from './pages/AIResource';
import Tracks from './pages/Tracks';
import Competitors from './pages/Competitors';
import Workflow from './pages/Workflow';
import Navbar from './components/Navbar';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'agenda':
        return <Agenda />;
      case 'roles':
        return <Roles />;
      case 'tools':
        return <AIResource />;
      case 'tracks':
        return <Tracks />;
      case 'teams':
        return <Competitors />;
      case 'workflow':
        return <Workflow />;
      default:
        return <Dashboard />;
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
