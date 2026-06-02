import { getPages, savePages, type SitePage } from './store';

export type { SitePage as Page };

export async function getAllPages(): Promise<SitePage[]> {
  const pages = await getPages();
  return pages.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export async function getPageById(id: string): Promise<SitePage | undefined> {
  const pages = await getPages();
  return pages.find((p) => p.id === id);
}

export async function getPageBySlug(slug: string): Promise<SitePage | undefined> {
  const pages = await getPages();
  return pages.find((p) => p.slug === slug);
}

export async function createPage(
  page: Omit<SitePage, 'id' | 'createdAt' | 'updatedAt'>
): Promise<SitePage> {
  const pages = await getPages();
  const newPage: SitePage = {
    ...page,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  pages.push(newPage);
  await savePages(pages);
  return newPage;
}

export async function updatePage(
  id: string,
  updates: Partial<Omit<SitePage, 'id' | 'createdAt'>>
): Promise<SitePage | null> {
  const pages = await getPages();
  const index = pages.findIndex((p) => p.id === id);
  if (index === -1) return null;
  pages[index] = { ...pages[index], ...updates, updatedAt: new Date().toISOString() };
  await savePages(pages);
  return pages[index];
}

export async function deletePage(id: string): Promise<boolean> {
  const pages = await getPages();
  const filtered = pages.filter((p) => p.id !== id);
  if (filtered.length === pages.length) return false;
  await savePages(filtered);
  return true;
}
