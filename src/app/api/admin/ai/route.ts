import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { verifyToken } from '@/lib/auth';
import { getAllPosts, createPost, updatePost, deletePost } from '@/lib/blog-data';
import { getAllPages, createPage, updatePage, deletePage } from '@/lib/page-data';
import { getTheme, updateTheme } from '@/lib/theme-data';

const GITHUB_REPO = 'wyliestevens/wellnessnursepro';

function getAuthEmail(request: NextRequest): string | null {
  const token = request.cookies.get('wnp-admin-token')?.value;
  if (!token) return null;
  const decoded = verifyToken(token);
  return decoded?.email ?? null;
}

// --- GitHub API helpers ---

async function githubReadFile(path: string): Promise<{ content: string; sha: string } | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!res.ok) return null;
  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { content, sha: data.sha };
}

async function githubWriteFile(
  path: string,
  content: string,
  message: string,
  sha?: string
): Promise<{ success: boolean; error?: string }> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return { success: false, error: 'GitHub token not configured' };

  // If no sha provided, try to get it (for updating existing files)
  let fileSha = sha;
  if (!fileSha) {
    const existing = await githubReadFile(path);
    if (existing) fileSha = existing.sha;
  }

  const body: Record<string, string> = {
    message,
    content: Buffer.from(content).toString('base64'),
  };
  if (fileSha) body.sha = fileSha;

  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    return { success: false, error: errData.message || `GitHub API error ${res.status}` };
  }

  return { success: true };
}

async function githubListFiles(path: string): Promise<string[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!res.ok) return [];
  const data = await res.json();
  if (!Array.isArray(data)) return [data.name];
  return data.map((f: { path: string }) => f.path);
}

// --- System prompt ---

async function buildSystemPrompt(): Promise<string> {
  const posts = await getAllPosts();
  const pages = await getAllPages();
  const theme = await getTheme();

  const postList = posts
    .map((p) => `- [id:${p.id}] "${p.title}" (slug: ${p.slug}, tags: ${p.tags.join(', ')})`)
    .join('\n');

  const pageList = pages
    .map((p) => `- [id:${p.id}] "${p.title}" (slug: ${p.slug}, showInNav: ${p.showInNav})`)
    .join('\n');

  const themeInfo = JSON.stringify(theme, null, 2);

  // Get file structure for context
  const srcFiles = await githubListFiles('src/app');
  const componentFiles = await githubListFiles('src/components');
  const fileList = [...srcFiles, ...componentFiles].join('\n');

  return `You are the AI admin assistant for WellnessNursePro, a faith-based wellness website built with Next.js 16, TypeScript, and Tailwind CSS. You have FULL control over the entire website. You can edit ANY file in the codebase.

## What You Can Do
- Create, edit, and delete blog posts (database)
- Create, edit, and delete dynamic pages (database)
- Change theme colors and fonts (database)
- **READ any source file** from the GitHub repo
- **EDIT any source file** — this commits directly to GitHub and Vercel auto-deploys
- **CREATE new files** in the repo
- Modify the homepage, Eight Laws page, layout, header, footer, styles — ANYTHING

## Current Site State

### Blog Posts
${postList || '(none)'}

### Dynamic Pages
${pageList || '(none)'}

### Current Theme
${themeInfo}

### Key Source Files
${fileList || '(file list unavailable)'}

### Important File Paths
- Homepage: src/app/page.tsx
- Eight Laws of Health: src/app/eight-laws-of-health/page.tsx
- Blog listing: src/app/blog/page.tsx
- Layout: src/app/layout.tsx
- Header: src/components/Header.tsx
- Footer: src/components/Footer.tsx
- Global CSS: src/app/globals.css
- Theme data: src/lib/theme-data.ts
- Blog data: src/lib/blog-data.ts

## How to Respond

Always respond with a helpful, conversational message. When you need to perform an action, include ONE JSON action block using this exact format:

\`\`\`json
{ "action": "ACTION_NAME", "data": { ... } }
\`\`\`

### Available Actions

**Source file operations (commits to GitHub, auto-deploys to Vercel):**
- \`read_file\` — data: { path } — Read a source file to see its current content
- \`edit_file\` — data: { path, content, commitMessage } — Replace a file's entire content. You MUST first read_file to get the current content, make your changes, then write the full updated content back.
- \`create_file\` — data: { path, content, commitMessage } — Create a new file in the repo

**Blog posts (database, instant):**
- \`create_blog\` — data: { title, slug, excerpt, content, tags[] }
- \`update_blog\` — data: { id, title?, slug?, excerpt?, content?, tags[]? }
- \`delete_blog\` — data: { id }

**Dynamic pages (database, instant):**
- \`create_page\` — data: { title, slug, content, metaDescription?, showInNav?, order? }
- \`update_page\` — data: { id, title?, slug?, content?, metaDescription?, showInNav?, order? }
- \`delete_page\` — data: { id }

**Theme (database, instant):**
- \`update_theme\` — data: { primaryColor?, secondaryColor?, accentColor?, backgroundColor?, textColor?, headingFont?, bodyFont?, logoText?, tagline? }

**No action needed:**
- \`none\` — just respond conversationally

## IMPORTANT RULES
1. For file edits: ALWAYS read the file first, then make targeted changes to the content, then write the complete updated file back. Never guess at file contents.
2. If a change requires reading a file first, tell the user "Let me read that file first" and use read_file. The system will automatically show you the content and you can then proceed with the edit in a follow-up.
3. When creating blog posts, generate a slug from the title (lowercase, hyphens, no special chars).
4. Always generate high-quality, faith-based wellness content that aligns with the site's mission.
5. For source file edits, the change will auto-deploy to Vercel in about 30 seconds after the commit.
6. Be confident and decisive. Execute the requested changes without hesitation.`;
}

// --- Action execution ---

type ActionResult = {
  type: string;
  result: unknown;
};

async function executeAction(action: string, data: Record<string, unknown>): Promise<ActionResult | null> {
  switch (action) {
    // --- File operations ---
    case 'read_file': {
      const file = await githubReadFile(data.path as string);
      if (!file) return { type: 'read_file', result: { error: `Could not read ${data.path}` } };
      return { type: 'read_file', result: { path: data.path, content: file.content } };
    }
    case 'edit_file': {
      const result = await githubWriteFile(
        data.path as string,
        data.content as string,
        (data.commitMessage as string) || `Update ${data.path} via AI admin`
      );
      return { type: 'edit_file', result: { path: data.path, ...result } };
    }
    case 'create_file': {
      const result = await githubWriteFile(
        data.path as string,
        data.content as string,
        (data.commitMessage as string) || `Create ${data.path} via AI admin`
      );
      return { type: 'create_file', result: { path: data.path, ...result } };
    }

    // --- Blog operations ---
    case 'create_blog': {
      const post = await createPost({
        title: data.title as string,
        slug: data.slug as string,
        excerpt: data.excerpt as string,
        content: data.content as string,
        author: 'Wellness Nurse Pro',
        tags: (data.tags as string[]) || [],
      });
      return { type: 'create_blog', result: { id: post.id, title: post.title, slug: post.slug } };
    }
    case 'update_blog': {
      const { id, ...updates } = data;
      const post = await updatePost(id as string, updates);
      if (!post) return { type: 'update_blog', result: { error: 'Post not found' } };
      return { type: 'update_blog', result: { id: post.id, title: post.title } };
    }
    case 'delete_blog': {
      const deleted = await deletePost(data.id as string);
      return { type: 'delete_blog', result: { success: deleted } };
    }

    // --- Page operations ---
    case 'create_page': {
      const slug = (data.slug as string) || (data.title as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      const page = await createPage({
        title: data.title as string,
        slug,
        content: data.content as string,
        metaDescription: (data.metaDescription as string) || '',
        published: (data.published as boolean) ?? true,
        showInNav: (data.showInNav as boolean) ?? true,
        navOrder: (data.order as number) ?? 0,
      });
      return { type: 'create_page', result: { id: page.id, title: page.title, slug: page.slug } };
    }
    case 'update_page': {
      const { id: pageId, ...pageUpdates } = data;
      const page = await updatePage(pageId as string, pageUpdates);
      if (!page) return { type: 'update_page', result: { error: 'Page not found' } };
      return { type: 'update_page', result: { id: page.id, title: page.title } };
    }
    case 'delete_page': {
      const pageDeleted = await deletePage(data.id as string);
      return { type: 'delete_page', result: { success: pageDeleted } };
    }

    // --- Theme ---
    case 'update_theme': {
      const theme = await updateTheme(data as Record<string, string>);
      return { type: 'update_theme', result: theme };
    }
    case 'upload_image': {
      return { type: 'upload_image', result: { message: 'Use the Media Library tab to upload images.' } };
    }
    case 'none':
      return null;
    default:
      return null;
  }
}

// --- Parse action from response ---

function parseActionFromResponse(text: string): { action: string; data: Record<string, unknown> } | null {
  const jsonBlockRegex = /```json\s*\n?([\s\S]*?)\n?```/;
  const match = text.match(jsonBlockRegex);
  if (!match) return null;

  try {
    const parsed = JSON.parse(match[1]);
    if (parsed.action && typeof parsed.action === 'string') {
      return { action: parsed.action, data: parsed.data || {} };
    }
  } catch {
    // Failed to parse JSON block
  }
  return null;
}

// --- Conversation history support ---

export async function POST(request: NextRequest) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY not configured. Add it in Vercel environment variables.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const client = new Anthropic({ apiKey });
    const systemPrompt = await buildSystemPrompt();

    // Build conversation messages with history
    const messages: Anthropic.MessageParam[] = [];

    // Add conversation history if provided
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: systemPrompt,
      messages,
    });

    const assistantText = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    // Parse and execute any action
    const parsedAction = parseActionFromResponse(assistantText);
    let actionResult: ActionResult | null = null;

    if (parsedAction) {
      actionResult = await executeAction(parsedAction.action, parsedAction.data);
    }

    // Clean the response message (remove the JSON block for cleaner display)
    const cleanMessage = assistantText
      .replace(/```json\s*\n?[\s\S]*?\n?```/g, '')
      .trim();

    // If it was a read_file action, automatically follow up to let AI process the content
    if (actionResult?.type === 'read_file' && actionResult.result) {
      const readResult = actionResult.result as { path: string; content?: string; error?: string };
      if (readResult.content) {
        // Send the file content back to Claude so it can proceed with the edit
        const followUpMessages: Anthropic.MessageParam[] = [
          ...messages,
          { role: 'assistant', content: assistantText },
          {
            role: 'user',
            content: `Here is the current content of ${readResult.path}:\n\n\`\`\`\n${readResult.content}\n\`\`\`\n\nNow please proceed with the requested change. Write the complete updated file content using the edit_file action.`,
          },
        ];

        const followUpResponse = await client.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 16384,
          system: systemPrompt,
          messages: followUpMessages,
        });

        const followUpText = followUpResponse.content
          .filter((block): block is Anthropic.TextBlock => block.type === 'text')
          .map((block) => block.text)
          .join('\n');

        const followUpAction = parseActionFromResponse(followUpText);
        if (followUpAction) {
          actionResult = await executeAction(followUpAction.action, followUpAction.data);
        }

        const finalMessage = followUpText
          .replace(/```json\s*\n?[\s\S]*?\n?```/g, '')
          .trim();

        return NextResponse.json({
          message: finalMessage || cleanMessage,
          action: actionResult || undefined,
        });
      }
    }

    return NextResponse.json({
      message: cleanMessage,
      action: actionResult || undefined,
    });
  } catch (error) {
    console.error('AI endpoint error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `AI request failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
