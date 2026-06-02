import { getTheme as getStoreTheme, saveTheme, type ThemeConfig } from './store';

export type { ThemeConfig };

export async function getTheme(): Promise<ThemeConfig> {
  return getStoreTheme();
}

export async function updateTheme(updates: Partial<ThemeConfig>): Promise<ThemeConfig> {
  const current = await getStoreTheme();
  const updated = { ...current, ...updates };
  await saveTheme(updated);
  return updated;
}
