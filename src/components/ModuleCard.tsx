import type { ModuleInstance } from '../types';
import { MODULE_CATALOG } from '../data/moduleCatalog';
import type { CountryCode } from '../data/factors';

interface Props {
  moduleInstance: ModuleInstance;
  country: CountryCode; // We must pass this down from the active organization!
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ModuleCard({ moduleInstance, country, onEdit, onDelete }: Props) {
  // Look up the definition to get the title, description, and formula
  const def = MODULE_CATALOG[moduleInstance.defId];
  if (!def) return null; // Safety check in case a module is removed from the catalog

  // Calculate the total CO2 for this specific card, injecting the country factor
  const co2 = def.calculateCO2(moduleInstance.value, moduleInstance.submoduleValues, country);

  return (
    <div class="border border-gray-200 rounded-lg p-6 bg-white shadow-sm mb-4 transition-shadow hover:shadow-md">
      
      {/* Header & Total CO2 */}
      <div class="flex justify-between items-start mb-4">
        <div class="flex items-start gap-3">
          <div class="text-3xl">{def.icon}</div>
          <div>
            <h3 class="m-0 mb-1 text-lg font-bold text-gray-900">{def.title}</h3>
            <p class="m-0 text-gray-500 text-sm">{def.description}</p>
          </div>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-red-600">
            {/* Added rounding so we don't get crazy long decimals like 14.000000001 */}
            {co2.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg
          </div>
        </div>
      </div>

      {/* Values Display */}
      <div class="bg-gray-50 p-4 rounded-md">
        <div class={`flex justify-between ${def.submodules ? 'font-normal text-gray-600' : 'font-bold text-gray-800'}`}>
          <span>Value:</span>
          <span>{moduleInstance.value} {def.unit}</span>
        </div>
        
        {/* Render Submodules if they exist */}
        {def.submodules && def.submodules.length > 0 && (
          <div class="border-t border-gray-200 pt-3 mt-3">
            <p class="m-0 mb-2 text-sm font-bold text-gray-600">Breakdown:</p>
            <div class="space-y-1">
              {def.submodules.map(sub => (
                <div key={sub.id} class="flex justify-between text-sm text-gray-500">
                  <span>{sub.title}</span>
                  <span class="font-medium text-gray-700">{moduleInstance.submoduleValues?.[sub.id] || 0} {def.unit}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div class="flex gap-2 mt-5 justify-end">
        <button 
          onClick={onEdit} 
          class="px-4 py-1.5 cursor-pointer rounded text-gray-700 hover:bg-gray-100 font-medium transition-colors"
        >
          Edit
        </button>
        <button 
          onClick={onDelete} 
          class="px-4 py-1.5 cursor-pointer text-red-600 bg-transparent border border-red-600 rounded hover:bg-red-50 font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}