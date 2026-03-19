import type { ModuleDef } from '../types';

export const MODULE_CATALOG: Record<string, ModuleDef> = {
  pizza: {
    id: 'pizza',
    title: 'Dietary Impact',
    description: 'Pizzas consumed per month',
    calculateCO2: (value) => value * 2.5, // e.g., 2.5kg CO2 per pizza
  },
  electricity: {
    id: 'electricity',
    title: 'Electricity Mix',
    description: 'Monthly electricity usage (kWh)',
    submodules: [
      { id: 'wind', title: 'Wind Power (kWh)' },
      { id: 'coal', title: 'Coal Power (kWh)' },
      { id: 'nuclear', title: 'Nuclear Power (kWh)' }
    ],
    calculateCO2: (totalKwh, subVals) => {
      if (!subVals) return totalKwh * 0.5; // fallback average
      const windCO2 = (subVals.wind || 0) * 0.01;
      const coalCO2 = (subVals.coal || 0) * 1.0;
      const nuclearCO2 = (subVals.nuclear || 0) * 0.05;
      return windCO2 + coalCO2 + nuclearCO2;
    }
  }
};