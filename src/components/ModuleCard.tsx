// src/components/ModuleCard.tsx
import type { ModuleInstance } from '../types';
import { MODULE_CATALOG } from '../data/moduleCatalog';

interface Props {
  moduleInstance: ModuleInstance;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ModuleCard({ moduleInstance, onEdit, onDelete }: Props) {
  // Look up the definition to get the title, description, and formula
  const def = MODULE_CATALOG[moduleInstance.defId];
  if (!def) return null; // Safety check in case a module is removed from catalog

  // Calculate the total CO2 for this specific card
  const co2 = def.calculateCO2(moduleInstance.value, moduleInstance.submoduleValues);

  return (
    <div style={{ 
      border: '1px solid #e5e7eb', 
      borderRadius: '8px', 
      padding: '1.5rem', 
      background: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '1rem'
    }}>
      {/* Header & Total CO2 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ margin: '0 0 0.25rem 0' }}>{def.title}</h3>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>{def.description}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e11d48' }}>
            {co2.toLocaleString()} kg
          </div>
        </div>
      </div>

      {/* Values Display */}
      <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: def.submodules ? 'normal' : 'bold' }}>
          <span>Main Value:</span>
          <span>{moduleInstance.value}</span>
        </div>
        
        {/* Render Submodules if they exist */}
        {def.submodules && def.submodules.length > 0 && (
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', fontWeight: 'bold', color: '#4b5563' }}>Breakdown:</p>
            {def.submodules.map(sub => (
              <div key={sub.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                <span>{sub.title}</span>
                <span>{moduleInstance.submoduleValues?.[sub.id] || 0}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
        <button onClick={onEdit} style={{ padding: '0.4rem 1rem', cursor: 'pointer' }}>Edit</button>
        <button onClick={onDelete} style={{ padding: '0.4rem 1rem', cursor: 'pointer', color: '#dc2626', background: 'transparent', border: '1px solid #dc2626' }}>Delete</button>
      </div>
    </div>
  );
}