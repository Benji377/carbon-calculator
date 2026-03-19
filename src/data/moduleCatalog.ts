import type { ModuleDef } from '../types';
import { FACTORS } from './factors';

export const MODULE_CATALOG: Record<string, ModuleDef> = {
  pizza: {
    id: 'pizza',
    title: 'Dietary Impact (Pizza)',
    description: 'Pizzas consumed',
    calculateCO2: (value, sub, country) => value * FACTORS[country].pizza,
  },
  computer: {
    id: 'computer',
    title: 'Workstations (Computers)',
    description: 'Number of active computers',
    calculateCO2: (value, sub, country) => value * FACTORS[country].computer,
  },
  mobility: {
    id: 'mobility',
    title: 'Mobility & Travel',
    description: 'Distance traveled per transport type (km)',
    submodules: [
      { id: 'pkw', title: 'Car (PKW)' },
      { id: 'bus', title: 'Intercity Bus' },
      { id: 'train', title: 'Train' },
      { id: 'city_bus', title: 'City Bus' }
    ],
    calculateCO2: (val, sub, country) => {
      if (!sub) return 0;
      const factors = FACTORS[country];
      return (
        (sub.pkw || 0) * factors.mobility_pkw +
        (sub.bus || 0) * factors.mobility_bus +
        (sub.train || 0) * factors.mobility_train +
        (sub.city_bus || 0) * factors.mobility_city_bus
      );
    }
  },
  electricity: {
    id: 'electricity',
    title: 'Electricity Mix',
    description: 'Energy consumed per source (kWh)',
    submodules: [
      { id: 'wind', title: 'Wind Power' },
      { id: 'hydro', title: 'Hydro Power' },
      { id: 'gas', title: 'Natural Gas' },
      { id: 'oil', title: 'Oil' },
      { id: 'coal', title: 'Coal' }
    ],
    calculateCO2: (val, sub, country) => {
      if (!sub) return 0;
      const factors = FACTORS[country];
      return (
        (sub.wind || 0) * factors.electricity_wind +
        (sub.hydro || 0) * factors.electricity_hydro +
        (sub.gas || 0) * factors.electricity_gas +
        (sub.oil || 0) * factors.electricity_oil +
        (sub.coal || 0) * factors.electricity_coal
      );
    }
  }
  // You can easily add 'water', 'toner', etc. using the exact same 1-line formula as 'pizza'!
};