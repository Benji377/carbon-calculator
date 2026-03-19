import { useSignal } from '@preact/signals';
import { organizations, addOrganization, selectOrganization } from '../store';
import { OrganizationCard } from '../components/OrganizationCard';

export function OrganizationsView() {
  const newOrgName = useSignal("");

  const handleAdd = (e: Event) => {
    e.preventDefault();
    if (newOrgName.value.trim()) {
      addOrganization(newOrgName.value.trim());
      newOrgName.value = "";
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Your Organizations</h2>
      
      {organizations.value.length === 0 ? (
        <p>No organizations yet. Create one below!</p>
      ) : (
        <div>
          {organizations.value.map(org => (
            <OrganizationCard 
              key={org.id} 
              org={org} 
              onClick={() => selectOrganization(org.id)} 
            />
          ))}
        </div>
      )}

      {/* Add Org Form */}
      <form onSubmit={handleAdd} style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          value={newOrgName.value} 
          onInput={(e) => newOrgName.value = (e.target as HTMLInputElement).value}
          placeholder="New Organization Name..." 
          style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '4px' }}>Add</button>
      </form>
    </div>
  );
}