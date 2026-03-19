import { useSignal } from '@preact/signals';
import { activeOrg, addModuleInstance } from '../store';
import { MODULE_CATALOG } from '../data/moduleCatalog';
import { ModuleCard } from '../components/ModuleCard';

export function DashboardView() {
  const selectedDefId = useSignal(Object.keys(MODULE_CATALOG)[0]);

  if (!activeOrg.value) return <p>No organization selected.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>{activeOrg.value.name}</h2>
      
      {/* List Active Modules */}
      <div>
        {activeOrg.value.modules.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No modules added yet. Add one below.</p>
        ) : (
          activeOrg.value.modules.map(modInstance => (
            <ModuleCard 
              key={modInstance.id} 
              moduleInstance={modInstance} 
              onEdit={() => alert(`Edit module ${modInstance.id} clicked!`)}
              onDelete={() => alert(`Delete module ${modInstance.id} clicked!`)}
            />
          ))
        )}
      </div>

      {/* Floating Action Button (simplified for now as a bottom bar) */}
      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f3f4f6', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>Add a Module</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select 
            value={selectedDefId.value} 
            onChange={(e) => selectedDefId.value = (e.target as HTMLSelectElement).value}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            {Object.values(MODULE_CATALOG).map(def => (
              <option key={def.id} value={def.id}>{def.title}</option>
            ))}
          </select>
          <button 
            onClick={() => addModuleInstance(selectedDefId.value)} 
            style={{ padding: '0.75rem 1.5rem', borderRadius: '4px' }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}