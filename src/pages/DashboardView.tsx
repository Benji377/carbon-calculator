// src/pages/DashboardView.tsx
import { useSignal } from '@preact/signals';
import { activeOrg, addModuleInstance } from '../store';
import { MODULE_CATALOG } from '../data/moduleCatalog';
import { ModuleCard } from '../components/ModuleCard';

export function DashboardView() {
  const selectedDefId = useSignal(Object.keys(MODULE_CATALOG)[0]);

  const org = activeOrg.value;
  if (!org) return <p class="text-gray-500 p-4">No organization selected.</p>;

  return (
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-6">{org.name}</h2>
      
      {/* List Active Modules */}
      <div class="mb-12">
        {org.modules.length === 0 ? (
          <p class="text-gray-500">No modules added yet. Add one below.</p>
        ) : (
          org.modules.map(modInstance => (
            <ModuleCard 
              key={modInstance.id} 
              moduleInstance={modInstance} 
              country={org.country || 'it'} 
              onEdit={() => alert(`Edit module ${modInstance.id} clicked!`)}
              onDelete={() => alert(`Delete module ${modInstance.id} clicked!`)}
            />
          ))
        )}
      </div>

      {/* Add Module UI */}
      <div class="bg-gray-100 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-bold mb-4 m-0">Add a Module</h3>
        <div class="flex gap-2">
          <select 
            value={selectedDefId.value} 
            onChange={(e) => selectedDefId.value = (e.target as HTMLSelectElement).value}
            class="flex-1 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
          >
            {Object.values(MODULE_CATALOG).map(def => (
              <option key={def.id} value={def.id}>{def.title}</option>
            ))}
          </select>
          <button 
            onClick={() => addModuleInstance(selectedDefId.value)} 
            class="px-6 py-2 bg-green-700 text-white font-bold rounded hover:bg-green-800 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}