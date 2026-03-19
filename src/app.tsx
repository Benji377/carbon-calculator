import { currentView, activeOrgId, selectOrganization } from './store';
import { OrganizationsView } from './pages/OrganizationsView';
import { DashboardView } from './pages/DashboardView';
import { StatisticsView } from './pages/StatisticsView';
import { SettingsView } from './pages/SettingsView';
import { AboutView } from './pages/AboutView';
import { t } from './i18n';
import logoPath from './assets/logo.png';

function Navbar() {
  // A simple helper function to apply Tailwind classes based on the active view
  const navBtnClass = (view: string) => `
    px-3 py-1.5 rounded-md transition-colors text-sm font-medium flex items-center gap-2
    ${currentView.value === view 
      ? 'bg-green-50 text-green-700' 
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
  `;

  return (
    <nav class="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      
      {/* Logo / Home Button */}
      <div 
        class="font-bold cursor-pointer flex items-center gap-2 text-lg hover:opacity-80 transition-opacity"
        onClick={() => selectOrganization(null)} // Clears active org and goes to 'orgs' view
      >
        <img src={logoPath} alt="Carbon Calculator" class="h-8 w-8" />
        <span class="hidden sm:inline text-green-700">Carbon Calculator</span>
      </div>

      {/* Navigation Links */}
      <div class="flex gap-1 sm:gap-2">
        {/* Only show Dashboard link if an organization is currently selected */}
        {activeOrgId.value && (
           <button 
             class={navBtnClass('dashboard')} 
             onClick={() => currentView.value = 'dashboard'}
           >
             <span>📊</span>
             <span class="hidden sm:inline">{t('dashboard')}</span>
           </button>
        )}
        
        <button 
          class={navBtnClass('stats')} 
          onClick={() => currentView.value = 'stats'}
        >
          <span>📈</span>
          <span class="hidden sm:inline">{t('stats')}</span>
        </button>
        
        <button 
          class={navBtnClass('settings')} 
          onClick={() => currentView.value = 'settings'}
        >
          <span>⚙️</span>
          <span class="hidden sm:inline">{t('settings')}</span>
        </button>
      </div>

    </nav>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer class="bg-gray-100 border-t border-gray-200 mt-12 py-6">
      <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-600 gap-4 text-center sm:text-left">
        <p class="m-0">© {currentYear} {t('copyright')}</p>
        <button 
          onClick={() => currentView.value = 'about'}
          class="text-green-700 hover:text-green-900 font-medium transition-colors"
        >
          {t('about')}
        </button>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <div class="min-h-screen text-gray-800 font-sans flex flex-col">
      <Navbar />
      <main class="flex-1 p-4 max-w-4xl mx-auto w-full">
        {currentView.value === 'orgs' && <OrganizationsView />}
        {currentView.value === 'dashboard' && <DashboardView />}
        {currentView.value === 'stats' && <StatisticsView />} 
        {currentView.value === 'settings' && <SettingsView />}
        {currentView.value === 'about' && <AboutView />}
      </main>
      <Footer />
    </div>
  );
}