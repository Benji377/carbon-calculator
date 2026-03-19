import { currentView, activeOrg, activeOrgId, selectOrganization } from './store';
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

// Placeholder for the Organizations List
function OrganizationsView() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Organizations</h2>
      <p>List of orgs will go here...</p>
      {/* We will build this next */}
    </div>
  );
}

// Placeholder for the Modules Dashboard
function DashboardView() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>{activeOrg.value?.name} - Dashboard</h2>
      <p>Modules will go here...</p>
      {/* We will build the module list and FAB here next */}
    </div>
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
        {currentView.value === 'settings' && <div style={{ padding: '2rem' }}>Settings Page (Import/Export goes here)</div>}
        {currentView.value === 'stats' && <div style={{ padding: '2rem' }}>Statistics Page</div>}
      </main>
    </div>
  );
}