import { currentView, activeOrgId, selectOrganization } from './store';
import { OrganizationsView } from './pages/OrganizationsView';
import { DashboardView } from './pages/DashboardView';
import { StatisticsView } from './pages/StatisticsView';
import { SettingsView } from './pages/SettingsView';
import './app.css';

// A simple Navbar component
function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => selectOrganization(null)}>
        🌍 Carbon Tracker
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {activeOrgId.value && (
          <button onClick={() => currentView.value = 'dashboard'}>Modules</button>
        )}
        <button onClick={() => currentView.value = 'stats'}>Statistics</button>
        <button onClick={() => currentView.value = 'settings'}>Settings</button>
      </div>
    </nav>
  );
}

// Main App Router
export function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <Navbar />
      <main>
        {currentView.value === 'orgs' && <OrganizationsView />}
        {currentView.value === 'dashboard' && <DashboardView />}
        {currentView.value === 'settings' && <SettingsView />}
        {currentView.value === 'stats' && <StatisticsView />}
      </main>
    </div>
  );
}