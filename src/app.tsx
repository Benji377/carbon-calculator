import { currentView, activeOrgId, selectOrganization } from './store';
import { OrganizationsView } from './pages/OrganizationsView';
import { DashboardView } from './pages/DashboardView';
import { StatisticsView } from './pages/StatisticsView';
import { SettingsView } from './pages/SettingsView';
import { t } from './i18n';

function Navbar() {
  // A simple helper function to apply Tailwind classes based on the active view
  const navBtnClass = (view: string) => `
    px-3 py-1.5 rounded-md transition-colors text-sm font-medium
    ${currentView.value === view 
      ? 'bg-green-50 text-green-700' 
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
  `;

  return (
    <nav class="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      
      {/* Logo / Home Button */}
      <div 
        class="font-bold cursor-pointer text-green-700 flex items-center gap-2 text-lg hover:opacity-80 transition-opacity"
        onClick={() => selectOrganization(null)} // Clears active org and goes to 'orgs' view
      >
        <span>🌍</span>
        <span class="hidden sm:inline">Carbon Tracker</span>
      </div>

      {/* Navigation Links */}
      <div class="flex gap-1 sm:gap-2">
        {/* Only show Dashboard link if an organization is currently selected */}
        {activeOrgId.value && (
           <button 
             class={navBtnClass('dashboard')} 
             onClick={() => currentView.value = 'dashboard'}
           >
             {t('dashboard')}
           </button>
        )}
        
        <button 
          class={navBtnClass('stats')} 
          onClick={() => currentView.value = 'stats'}
        >
          {t('stats')}
        </button>
        
        <button 
          class={navBtnClass('settings')} 
          onClick={() => currentView.value = 'settings'}
        >
          {t('settings')}
        </button>
      </div>

    </nav>
  );
}

export function App() {
  return (
    <div class="min-h-screen text-gray-800 font-sans max-w-4xl mx-auto">
      <Navbar />
      <main class="p-4">
        {currentView.value === 'orgs' && <OrganizationsView />}
        {currentView.value === 'dashboard' && <DashboardView />}
        {currentView.value === 'stats' && <StatisticsView />} 
        {currentView.value === 'settings' && <SettingsView />}
      </main>
    </div>
  );
}