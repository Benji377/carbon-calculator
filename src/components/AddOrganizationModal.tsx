import { useState } from 'preact/hooks';
import { COUNTRY_NAMES, type CountryCode } from '../data/factors';

interface Props {
  onClose: () => void;
  onConfirm: (name: string, description: string, country: CountryCode) => void;
}

export function AddOrganizationModal({ onClose, onConfirm }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState<CountryCode>("it");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm(name.trim(), description.trim(), country);
      setName("");
      setDescription("");
      setCountry("it");
    }
  };

  return (
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <h2 class="text-xl font-bold mb-4">➕ Add New Organization</h2>
        
        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="block text-sm font-bold mb-2">Organization Name *</label>
            <input 
              type="text" 
              required 
              placeholder="e.g., Acme Corporation" 
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-bold mb-2">Description</label>
            <input 
              type="text" 
              placeholder="e.g., Manufacturing facility in Milan" 
              value={description}
              onInput={(e) => setDescription((e.target as HTMLInputElement).value)}
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-bold mb-2">Country</label>
            <select 
              value={country}
              onChange={(e) => setCountry((e.target as HTMLSelectElement).value as CountryCode)}
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            >
              {Object.entries(COUNTRY_NAMES).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button 
              type="button"
              onClick={onClose} 
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-green-700 text-white font-bold rounded hover:bg-green-800"
            >
              Create Organization
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
