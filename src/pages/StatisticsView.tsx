import { useSignal, useComputed } from '@preact/signals';
import { organizations } from '../store';
import { MODULE_CATALOG } from '../data/moduleCatalog';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

export function StatisticsView() {
  // 1. Local UI State for comparisons
  const compareOrg1 = useSignal<string>(organizations.value[0]?.id || "");
  const compareOrg2 = useSignal<string>("");

  // 2. Helper to calculate total CO2 for an organization
  const getOrgTotal = (orgId: string) => {
    const org = organizations.value.find(o => o.id === orgId);
    if (!org) return 0;
    return org.modules.reduce((sum, mod) => {
      const def = MODULE_CATALOG[mod.defId];
      return sum + (def ? def.calculateCO2(mod.value, mod.submoduleValues) : 0);
    }, 0);
  };

  // 3. Computed Totals for our colored indicators
  const total1 = useComputed(() => getOrgTotal(compareOrg1.value));
  const total2 = useComputed(() => getOrgTotal(compareOrg2.value));

  // 4. Transform data for Recharts
  const chartData = useComputed(() => {
    // We group by module definition (e.g., 'pizza', 'electricity')
    const dataMap: Record<string, { name: string; org1: number; org2: number }> = {};
    
    Object.values(MODULE_CATALOG).forEach(def => {
      dataMap[def.id] = { name: def.title, org1: 0, org2: 0 };
    });

    const org1 = organizations.value.find(o => o.id === compareOrg1.value);
    const org2 = organizations.value.find(o => o.id === compareOrg2.value);

    org1?.modules.forEach(mod => {
      const def = MODULE_CATALOG[mod.defId];
      if (def) dataMap[mod.defId].org1 += def.calculateCO2(mod.value, mod.submoduleValues);
    });

    org2?.modules.forEach(mod => {
      const def = MODULE_CATALOG[mod.defId];
      if (def) dataMap[mod.defId].org2 += def.calculateCO2(mod.value, mod.submoduleValues);
    });

    // Only return modules that actually have data
    return Object.values(dataMap).filter(d => d.org1 > 0 || d.org2 > 0);
  });

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Analytics & Comparison</h2>

      {/* --- CONTROL PANEL --- */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', background: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#4b5563' }}>Baseline Organization</label>
          <select value={compareOrg1.value} onChange={(e) => compareOrg1.value = (e.target as HTMLSelectElement).value} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}>
            <option value="">Select an organization...</option>
            {organizations.value.map(org => <option key={org.id} value={org.id}>{org.name}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#4b5563' }}>Compare With</label>
          <select value={compareOrg2.value} onChange={(e) => compareOrg2.value = (e.target as HTMLSelectElement).value} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}>
            <option value="">None (Single View)</option>
            {organizations.value.map(org => <option key={org.id} value={org.id}>{org.name}</option>)}
          </select>
        </div>
      </div>

      {/* --- KPI INDICATORS --- */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1, padding: '1.5rem', background: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '0 8px 8px 0' }}>
          <p style={{ margin: 0, color: '#1d4ed8', fontWeight: 'bold' }}>Baseline Total CO2</p>
          <h3 style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', color: '#1e3a8a' }}>{total1.value.toLocaleString()} kg</h3>
        </div>
        
        {compareOrg2.value && (
          <div style={{ flex: 1, padding: '1.5rem', background: '#fdf4ff', borderLeft: '4px solid #d946ef', borderRadius: '0 8px 8px 0' }}>
            <p style={{ margin: 0, color: '#a21caf', fontWeight: 'bold' }}>Comparison Total CO2</p>
            <h3 style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', color: '#701a75' }}>{total2.value.toLocaleString()} kg</h3>
          </div>
        )}
      </div>

      {/* --- COLORFUL DIAGRAM (Recharts) --- */}
      <div style={{ height: '400px', marginBottom: '3rem', background: 'white', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.1rem' }}>Emissions by Module Type</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData.value} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} />
            <Legend />
            <Bar dataKey="org1" name="Baseline Org" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            {compareOrg2.value && <Bar dataKey="org2" name="Comparison Org" fill="#d946ef" radius={[4, 4, 0, 0]} />}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* --- DETAILED DATA TABLE --- */}
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Detailed Breakdown</h3>
        <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                <th style={{ padding: '0.75rem 1rem', color: '#4b5563', fontWeight: 'bold' }}>Module Source</th>
                <th style={{ padding: '0.75rem 1rem', color: '#4b5563', fontWeight: 'bold' }}>Baseline (kg)</th>
                {compareOrg2.value && <th style={{ padding: '0.75rem 1rem', color: '#4b5563', fontWeight: 'bold' }}>Comparison (kg)</th>}
                {compareOrg2.value && <th style={{ padding: '0.75rem 1rem', color: '#4b5563', fontWeight: 'bold' }}>Difference</th>}
              </tr>
            </thead>
            <tbody>
              {chartData.value.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>No data available to display.</td></tr>
              ) : (
                chartData.value.map((row, idx) => {
                  const diff = row.org1 - row.org2;
                  const diffColor = diff > 0 ? '#166534' : diff < 0 ? '#991b1b' : '#374151'; // Green if baseline is higher, Red if lower
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '0.75rem 1rem' }}>{row.name}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#1d4ed8' }}>{row.org1.toLocaleString()}</td>
                      {compareOrg2.value && <td style={{ padding: '0.75rem 1rem', color: '#a21caf' }}>{row.org2.toLocaleString()}</td>}
                      {compareOrg2.value && (
                        <td style={{ padding: '0.75rem 1rem', color: diffColor, fontWeight: 'bold' }}>
                          {diff > 0 ? '+' : ''}{diff.toLocaleString()}
                        </td>
                      )}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}