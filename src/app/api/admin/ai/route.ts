import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { verifyToken } from '@/lib/auth';
import { getAllPosts, createPost, updatePost, deletePost } from '@/lib/blog-data';
import { getAllPages, createPage, updatePage, deletePage } from '@/lib/page-data';
import { getTheme, updateTheme } from '@/lib/theme-data';

function getAuthEmail(request: NextRequest): string | null {
  const token = request.cookies.get('wnp-admin-token')?.value;
  if (!token) return null;
  const decoded = verifyToken(token);
  return decoded?.email ?? null;
}

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

  return `You are the AI admin assistant for WellnessNursePro, a faith-based wellness website. You help the admin manage the site content and appearance.

## What You Can Do
- Create, edit, and delete blog posts
- Create, edit, and delete pages
- Change theme colors and fonts
- Manage images (provide guidance on uploads)

## Current Site State

### Blog Posts
${postList || '(none)'}

### Pages
${pageList || '(none)'}

### Current Theme
${themeInfo}

## How to Respond

Always respond with a helpful, conversational message. When you need to perform an action, include a JSON action block in your response using this exact format:

\`\`\`json
{ "action": "ACTION_NAME", "data": { ... } }
\`\`\`

### Available Actions

**Blog posts:**
- \`create_blog\` — data: { title, slug, excerpt, content, tags[] }
- \`update_blog\` — data: { id, title?, slug?, excerpt?, content?, tags[]? }
- \`delete_blog\` — data: { id }

**Pages:**
- \`create_page\` — data: { title, slug, content, metaDescription?, showInNav?, order? }
- \`update_page\` — data: { id, title?, slug?, content?, metaDescription?, showInNav?, order? }
- \`delete_page\` — data: { id }

**Theme:**
- \`update_theme\` — data: { primaryColor?, secondaryColor?, accentColor?, backgroundColor?, textColor?, headingFont?, bodyFont?, logoText?, tagline? }

**Images:**
- \`upload_image\` — data: { description } (tell the user to use the upload button; you cannot upload directly)

**No action needed:**
- \`none\` — just respond conversationally

When creating blog posts, generate a slug from the title (lowercase, hyphens, no special chars). Always generate high-quality, faith-based wellness content that aligns with the site's mission.`;
}

type ActionResult = {
  type: string;
  result: unknown;
};

async function executeAction(action: string, data: Record<string, unknown>): Promise<ActionResult | null> {
  switch (action) {
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
    case 'update_theme': {
      const theme = await updateTheme(data as Record<string, string>);
      return { type: 'update_theme', result: theme };
    }
    case 'upload_image': {
      return { type: 'upload_image', result: { message: 'User should use the upload button in the media library.' } };
    }
    case 'none':
      return null;
    default:
      return null;
  }
}

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

export async function POST(request: NextRequest) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'AI service not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { message, context } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const client = new Anthropic({ apiKey });

    const userMessage = context
      ? `Context: ${context}\n\nUser message: ${message}`
      : message;

    const systemPrompt = await buildSystemPrompt();

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
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

    const responseBody: { message: string; action?: ActionResult } = {
      message: cleanMessage,
    };

    if (actionResult) {
      responseBody.action = actionResult;
    }

    return NextResponse.json(responseBody);
  } catch (error) {
    console.error('AI endpoint error:', error);
    return NextResponse.json(
      { error: 'AI request failed' },
      { status: 500 }
    );
  }
}
