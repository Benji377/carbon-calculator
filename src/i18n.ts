// src/i18n.ts
import { signal, effect } from "@preact/signals";

export type Language = 'en' | 'de' | 'it' | 'es' | 'sv';

// Load saved language or default to English
const savedLang = localStorage.getItem("carbon-app-lang") as Language;
export const currentLang = signal<Language>(savedLang || 'en');

// Auto-save language changes
effect(() => {
  localStorage.setItem("carbon-app-lang", currentLang.value);
});

// The Dictionary. You can move this to a separate JSON file later if it gets huge,
// but keeping it here as a TypeScript object is perfectly fine for now.
const dictionary: Record<Language, Record<string, string>> = {
  en: {
    settings: "Settings",
    language: "Language",
    exportData: "Export Data",
    exportDesc: "Download a backup of all your organizations and modules.",
    importData: "Import Data",
    importDesc: "Restore your data from a JSON backup file.",
    downloadBtn: "Download Backup",
  },
  de: {
    settings: "Einstellungen",
    language: "Sprache",
    exportData: "Daten exportieren",
    exportDesc: "Laden Sie ein Backup all Ihrer Organisationen und Module herunter.",
    importData: "Daten importieren",
    importDesc: "Stellen Sie Ihre Daten aus einer JSON-Backup-Datei wieder her.",
    downloadBtn: "Backup herunterladen",
  },
  it: {
    settings: "Impostazioni",
    language: "Lingua",
    exportData: "Esporta Dati",
    exportDesc: "Scarica un backup di tutte le tue organizzazioni e moduli.",
    importData: "Importa Dati",
    importDesc: "Ripristina i tuoi dati da un file di backup JSON.",
    downloadBtn: "Scarica Backup",
  },
  es: {
    settings: "Configuración",
    language: "Idioma",
    exportData: "Exportar Datos",
    exportDesc: "Descarga una copia de seguridad de todas tus organizaciones y módulos.",
    importData: "Importar Datos",
    importDesc: "Restaura tus datos desde un archivo de copia de seguridad JSON.",
    downloadBtn: "Descargar Copia",
  },
  sv: {
    settings: "Inställningar",
    language: "Språk",
    exportData: "Exportera Data",
    exportDesc: "Ladda ner en säkerhetskopia av alla dina organisationer och moduler.",
    importData: "Importera Data",
    importDesc: "Återställ dina data från en JSON-säkerhetskopia.",
    downloadBtn: "Ladda ner Backup",
  }
};

// The helper function we will use in our UI components
export function t(key: string): string {
  return dictionary[currentLang.value]?.[key] || dictionary['en'][key] || key;
}