import { getBlogPosts, saveBlogPosts, type BlogPost } from './store';

export type { BlogPost };

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getPostById(
  id: string
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.id === id);
}

export async function createPost(
  post: Omit<BlogPost, 'id' | 'publishedAt'>
): Promise<BlogPost> {
  const posts = await getBlogPosts();
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    publishedAt: new Date().toISOString(),
  };
  posts.push(newPost);
  await saveBlogPosts(posts);
  return newPost;
}

export async function updatePost(
  id: string,
  updates: Partial<Omit<BlogPost, 'id'>>
): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  posts[index] = { ...posts[index], ...updates };
  await saveBlogPosts(posts);
  return posts[index];
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getBlogPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  await saveBlogPosts(filtered);
  return true;
}
