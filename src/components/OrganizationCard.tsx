// src/components/OrganizationCard.tsx
import type { Organization } from '../types';

interface Props {
  org: Organization;
  onClick: () => void;
}

export function OrganizationCard({ org, onClick }: Props) {
  return (
    <div 
      onClick={onClick}
      style={{ 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px', 
        padding: '1.5rem', 
        cursor: 'pointer',
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '1rem',
        transition: 'transform 0.1s ease-in-out'
      }}
    >
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>{org.name}</h3>
      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
        {org.modules.length} active module{org.modules.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}