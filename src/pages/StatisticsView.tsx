import { useSignal, useComputed } from '@preact/signals';
import { organizations } from '../store';
import { MODULE_CATALOG } from '../data/moduleCatalog';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { t } from '../i18n';

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
      return sum + (def ? def.calculateCO2(mod.value, mod.submoduleValues, org.country) : 0);
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
      if (def) dataMap[mod.defId].org1 += def.calculateCO2(mod.value, mod.submoduleValues, org1.country);
    });

    org2?.modules.forEach(mod => {
      const def = MODULE_CATALOG[mod.defId];
      if (def) dataMap[mod.defId].org2 += def.calculateCO2(mod.value, mod.submoduleValues, org2.country);
    });

    // Only return modules that actually have data
    return Object.values(dataMap).filter(d => d.org1 > 0 || d.org2 > 0);
  });

  return (
    <div class="p-4">
      <h2 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">{t('analyticsComparison')}</h2>

      {/* --- CONTROL PANEL --- */}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
        <div>
          <label class="block text-xs sm:text-sm font-bold mb-2 text-gray-700">{t('baselineOrganization')}</label>
          <select value={compareOrg1.value} onChange={(e) => compareOrg1.value = (e.target as HTMLSelectElement).value} class="w-full p-2 border border-gray-300 rounded text-sm">
            <option value="">{t('selectOrganization')}</option>
            {organizations.value.map(org => <option key={org.id} value={org.id}>{org.name}</option>)}
          </select>
        </div>
        <div>
          <label class="block text-xs sm:text-sm font-bold mb-2 text-gray-700">{t('compareWith')}</label>
          <select value={compareOrg2.value} onChange={(e) => compareOrg2.value = (e.target as HTMLSelectElement).value} class="w-full p-2 border border-gray-300 rounded text-sm">
            <option value="">{t('singleView')}</option>
            {organizations.value.map(org => <option key={org.id} value={org.id}>{org.name}</option>)}
          </select>
        </div>
      </div>

      {/* --- KPI INDICATORS --- */}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
        <div class="p-4 sm:p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <p class="m-0 text-xs sm:text-sm text-blue-700 font-bold">{t('baselineTotalCO2')}</p>
          <h3 class="m-0 mt-2 text-lg sm:text-2xl text-blue-900 font-bold">{total1.value.toLocaleString()} kg</h3>
        </div>
        
        {compareOrg2.value && (
          <div class="p-4 sm:p-6 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
            <p class="m-0 text-xs sm:text-sm text-purple-700 font-bold">{t('comparisonTotalCO2')}</p>
            <h3 class="m-0 mt-2 text-lg sm:text-2xl text-purple-900 font-bold">{total2.value.toLocaleString()} kg</h3>
          </div>
        )}
      </div>

      {/* --- COLORFUL DIAGRAM (Recharts) --- */}
      <div class="h-64 sm:h-96 mb-6 sm:mb-8 bg-white p-3 sm:p-4 border border-gray-200 rounded-lg overflow-x-auto">
        <h3 class="mt-0 mb-3 sm:mb-4 text-sm sm:text-base font-bold">{t('emissionsByModule')}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData.value} margin={{ top: 5, right: 10, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="org1" name={t('baselineOrg')} fill="#3b82f6" radius={[4, 4, 0, 0]} />
            {compareOrg2.value && <Bar dataKey="org2" name={t('comparisonOrg')} fill="#d946ef" radius={[4, 4, 0, 0]} />}
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