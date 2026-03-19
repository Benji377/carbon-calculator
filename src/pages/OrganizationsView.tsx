import { useSignal } from '@preact/signals';
import { organizations, addOrganization, selectOrganization } from '../store';
import { OrganizationCard } from '../components/OrganizationCard';
import { COUNTRY_NAMES, type CountryCode } from '../data/factors';

export function OrganizationsView() {
  const newOrgName = useSignal("");
  const newOrgDesc = useSignal("");
  const newOrgCountry = useSignal<CountryCode>("it"); // Default to Italy

  const handleAdd = (e: Event) => {
    e.preventDefault();
    if (newOrgName.value.trim()) {
      addOrganization(newOrgName.value.trim(), newOrgDesc.value.trim(), newOrgCountry.value);
      newOrgName.value = "";
      newOrgDesc.value = "";
    }
  };

  return (
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-6">Your Organizations</h2>
      
      {organizations.value.length === 0 ? (
        <p class="text-gray-500">No organizations yet. Create one below!</p>
      ) : (
        <div class="grid gap-4 md:grid-cols-2">
          {organizations.value.map(org => (
            <OrganizationCard key={org.id} org={org} onClick={() => selectOrganization(org.id)} />
          ))}
        </div>
      )}

      {/* Enhanced Add Form */}
      <form onSubmit={handleAdd} class="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm max-w-md">
        <h3 class="text-lg font-bold mb-4">Add New Organization</h3>
        
        <input 
          type="text" required placeholder="Organization Name" 
          value={newOrgName.value} onInput={(e) => newOrgName.value = (e.target as HTMLInputElement).value}
          class="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        
        <input 
          type="text" placeholder="Description (Optional)" 
          value={newOrgDesc.value} onInput={(e) => newOrgDesc.value = (e.target as HTMLInputElement).value}
          class="w-full mb-3 p-2 border border-gray-300 rounded"
        />

        <select 
          value={newOrgCountry.value} 
          onChange={(e) => newOrgCountry.value = (e.target as HTMLSelectElement).value as CountryCode}
          class="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          {Object.entries(COUNTRY_NAMES).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>

        <button type="submit" class="w-full bg-green-700 text-white font-bold py-2 px-4 rounded hover:bg-green-800">
          Create Organization
        </button>
      </form>
    </div>
  );
}