import { useSignal } from '@preact/signals';
import { organizations, addOrganization, selectOrganization, deleteOrganization } from '../store';
import { OrganizationCard } from '../components/OrganizationCard';
import { AddOrganizationModal } from '../components/AddOrganizationModal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import type { CountryCode } from '../data/factors';

export function OrganizationsView() {
  const showAddModal = useSignal(false);
  const deletingOrgId = useSignal<string | null>(null);

  const handleAddOrganization = (name: string, description: string, country: CountryCode) => {
    addOrganization(name, description, country);
    showAddModal.value = false;
  };

  const handleDeleteOrganization = () => {
    if (deletingOrgId.value) {
      deleteOrganization(deletingOrgId.value);
      deletingOrgId.value = null;
    }
  };

  return (
    <div class="p-4">
      <h2 class="text-3xl font-bold mb-8 text-gray-900">🏢 Your Organizations</h2>
      
      {organizations.value.length === 0 ? (
        <div class="text-center py-12">
          <p class="text-gray-500 mb-6">No organizations yet. Create one to get started!</p>
        </div>
      ) : (
        <div class="grid gap-4 md:grid-cols-2 mb-12">
          {organizations.value.map(org => (
            <div key={org.id} class="relative">
              <OrganizationCard 
                org={org} 
                onClick={() => selectOrganization(org.id)}
              />
              <button
                onClick={() => deletingOrgId.value = org.id}
                class="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete organization"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Centered Add Button */}
      <div class="flex justify-center mt-12">
        <button 
          onClick={() => showAddModal.value = true}
          class="px-8 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-colors shadow-lg text-lg flex items-center gap-2"
        >
          ➕ Add Organization
        </button>
      </div>

      {/* Add Organization Modal */}
      {showAddModal.value && (
        <AddOrganizationModal 
          onClose={() => showAddModal.value = false}
          onConfirm={handleAddOrganization}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingOrgId.value && (
        <ConfirmationModal
          title="Delete Organization"
          message="Are you sure you want to delete this organization and all its modules? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          isDelete={true}
          onConfirm={handleDeleteOrganization}
          onCancel={() => deletingOrgId.value = null}
        />
      )}
    </div>
  );
}