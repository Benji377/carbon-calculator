import { signal, computed, effect } from "@preact/signals";
import type { Organization } from "./types";

// 1. Load from LocalStorage
const savedData = localStorage.getItem("carbon-app-data");
const initialOrgs: Organization[] = savedData ? JSON.parse(savedData) : [];

// 2. Define Signals
export const organizations = signal<Organization[]>(initialOrgs);
export const activeOrgId = signal<string | null>(null);
export const currentView = signal<"orgs" | "dashboard" | "settings" | "stats">("orgs");

// 3. Auto-save to LocalStorage whenever 'organizations' changes
effect(() => {
  localStorage.setItem("carbon-app-data", JSON.stringify(organizations.value));
});

// 4. Computed Helpers
export const activeOrg = computed(() => 
  organizations.value.find(o => o.id === activeOrgId.value) || null
);

// 5. Actions
export function addOrganization(name: string) {
  const newOrg: Organization = { id: crypto.randomUUID(), name, modules: [] };
  organizations.value = [...organizations.value, newOrg];
}

export function selectOrganization(id: string | null) {
  activeOrgId.value = id;
  currentView.value = id ? "dashboard" : "orgs";
}