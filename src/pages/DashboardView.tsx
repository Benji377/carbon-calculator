// src/pages/DashboardView.tsx
import { useSignal, useComputed } from '@preact/signals';
import { activeOrg, addModuleInstanceWithValues, updateModuleInstance, deleteModuleInstance } from '../store';
import { MODULE_CATALOG } from '../data/moduleCatalog';
import { ModuleCard } from '../components/ModuleCard';
import { AddModuleModal } from '../components/AddModuleModal';
import { EditModuleModal } from '../components/EditModuleModal';
import { ConfirmationModal } from '../components/ConfirmationModal';

export function DashboardView() {
  const showAddModal = useSignal(false);
  const editingModule = useSignal<string | null>(null);
  const deletingModule = useSignal<string | null>(null);

  const org = activeOrg.value;
  if (!org) return <p class="text-gray-500 p-4">No organization selected.</p>;

  // Calculate total CO2
  const totalCO2 = useComputed(() => {
    return org.modules.reduce((sum, mod) => {
      const def = MODULE_CATALOG[mod.defId];
      return sum + (def ? def.calculateCO2(mod.value, mod.submoduleValues, org.country) : 0);
    }, 0);
  });

  const handleAddModule = (newModule: any) => {
    addModuleInstanceWithValues(newModule.defId, newModule.value, newModule.submoduleValues);
    showAddModal.value = false;
  };

  const handleDeleteModule = () => {
    if (deletingModule.value) {
      deleteModuleInstance(deletingModule.value);
      deletingModule.value = null;
    }
  };

  const editModule = org.modules.find(m => m.id === editingModule.value);

  return (
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-2">{org.name}</h2>
      
      {/* Total CO2 Display */}
      <div class="mb-6 bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200">
        <p class="text-gray-600 text-sm mb-1">Total CO2 Emissions</p>
        <h3 class="text-4xl font-bold text-red-600 m-0">
          {totalCO2.value.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg CO₂
        </h3>
      </div>
      
      {/* List Active Modules */}
      <div class="mb-12">
        {org.modules.length === 0 ? (
          <p class="text-gray-500">No modules added yet. Click the + button to add one.</p>
        ) : (
          org.modules.map(modInstance => (
            <ModuleCard 
              key={modInstance.id} 
              moduleInstance={modInstance} 
              country={org.country || 'it'} 
              onEdit={() => editingModule.value = modInstance.id}
              onDelete={() => deletingModule.value = modInstance.id}
            />
          ))
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => showAddModal.value = true}
        class="fixed bottom-8 right-8 w-16 h-16 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 transition-colors flex items-center justify-center text-2xl font-bold"
      >
        +
      </button>

      {/* Modals */}
      {showAddModal.value && (
        <AddModuleModal 
          onClose={() => showAddModal.value = false}
          onConfirm={handleAddModule}
        />
      )}

      {editingModule.value && editModule && (
        <EditModuleModal 
          moduleInstance={editModule}
          onClose={() => editingModule.value = null}
          onSave={(updated) => {
            updateModuleInstance(updated);
            editingModule.value = null;
          }}
        />
      )}

      {deletingModule.value && (
        <ConfirmationModal 
          title="Delete Module"
          message="Are you sure you want to delete this module? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          isDelete={true}
          onConfirm={handleDeleteModule}
          onCancel={() => deletingModule.value = null}
        />
      )}
    </div>
  );
}