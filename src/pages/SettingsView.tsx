// src/pages/SettingsView.tsx
import { currentLang, t } from '../i18n';
import type { Language } from '../i18n';
import { organizations } from '../store';

export function SettingsView() {
  
  // --- EXPORT LOGIC ---
  const handleExport = () => {
    // 1. Convert the data to a JSON string
    const dataStr = JSON.stringify(organizations.value, null, 2);
    // 2. Create a Blob (a file-like object)
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    // 3. Create a temporary anchor tag to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `carbon_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // --- IMPORT LOGIC ---
  const handleImport = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        // Basic validation: check if it's an array
        if (Array.isArray(importedData)) {
          organizations.value = importedData;
          alert("Data imported successfully!");
        } else {
          alert("Invalid backup file format.");
        }
      } catch (err) {
        alert("Error reading the file. Is it a valid JSON?");
      }
      input.value = ""; // Reset the input
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>{t('settings')}</h2>

      {/* --- LANGUAGE SELECTOR --- */}
      <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white' }}>
        <h3 style={{ marginTop: 0 }}>{t('language')}</h3>
        <select 
          value={currentLang.value} 
          onChange={(e) => currentLang.value = (e.target as HTMLSelectElement).value as Language}
          style={{ padding: '0.5rem', borderRadius: '4px', width: '100%', maxWidth: '300px' }}
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
          <option value="es">Español</option>
          <option value="sv">Svenska</option>
        </select>
      </div>

      {/* --- EXPORT DATA --- */}
      <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white' }}>
        <h3 style={{ marginTop: 0 }}>{t('exportData')}</h3>
        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{t('exportDesc')}</p>
        <button onClick={handleExport} style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', cursor: 'pointer', background: '#111827', color: 'white', border: 'none' }}>
          {t('downloadBtn')}
        </button>
      </div>

      {/* --- IMPORT DATA --- */}
      <div style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white' }}>
        <h3 style={{ marginTop: 0 }}>{t('importData')}</h3>
        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{t('importDesc')}</p>
        <input 
          type="file" 
          accept=".json" 
          onChange={handleImport} 
          style={{ display: 'block', marginTop: '1rem' }}
        />
      </div>

    </div>
  );
}