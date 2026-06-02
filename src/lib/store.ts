import { put, list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

// Keys for our data blobs
const BLOG_KEY = 'data/blog-posts.json';
const PAGES_KEY = 'data/pages.json';
const THEME_KEY = 'data/theme.json';

// Local fallback directory (when BLOB_READ_WRITE_TOKEN is not set)
const LOCAL_DIR = '/tmp/wellnessnursepro';

// Types
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  coverImage?: string;
  tags: string[];
};

export type SitePage = {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML content
  metaDescription?: string;
  published: boolean;
  showInNav?: boolean;
  navOrder?: number;
  createdAt: string;
  updatedAt: string;
};

export type ThemeConfig = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  logoText: string;
  tagline: string;
  logo?: string;
  favicon?: string;
};

// ─── Defaults ────────────────────────────────────────────────

const defaultTheme: ThemeConfig = {
  primaryColor: '#2d6a4f',
  secondaryColor: '#40916c',
  accentColor: '#d4a574',
  backgroundColor: '#f8f6f0',
  textColor: '#1a1a2e',
  headingFont: 'Lora',
  bodyFont: 'Inter',
  logoText: 'WellnessNursePro',
  tagline: 'Your Guide to Holistic Health',
};

const seedBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Power of Plant-Based Nutrition',
    slug: 'the-power-of-plant-based-nutrition',
    excerpt:
      "Discover how returning to God's original diet of fruits, vegetables, grains, and nuts can transform your health and prevent chronic disease.",
    content: `In the beginning, God gave humanity the perfect diet. Genesis 1:29 tells us, "I give you every seed-bearing plant on the face of the whole earth and every tree that has fruit with seed in it. They will be yours for food."

This original plant-based diet was designed to fuel our bodies with everything we need — vitamins, minerals, fiber, antioxidants, and phytonutrients that modern science is only beginning to understand.

## Why Plant-Based?

Research consistently shows that those who follow a predominantly plant-based diet experience:

- **Lower rates of heart disease** — the #1 killer in America
- **Reduced risk of type 2 diabetes** — plant foods improve insulin sensitivity
- **Lower cancer rates** — particularly colorectal, breast, and prostate cancers
- **Healthier body weight** — plant foods are naturally lower in calories and higher in fiber
- **Better gut health** — fiber feeds beneficial bacteria that protect our immune system

## Getting Started

You don't have to overhaul your entire diet overnight. Start with these simple steps:

1. **Add before you subtract.** Begin by adding more fruits and vegetables to every meal.
2. **Try one new plant food each week.** Explore the incredible variety God created — from quinoa to kale to dragon fruit.
3. **Make beans your best friend.** Lentils, chickpeas, and black beans are affordable, versatile, and packed with protein and fiber.
4. **Choose whole grains.** Swap white rice for brown rice, white bread for whole grain bread.
5. **Snack on nuts and seeds.** A small handful of almonds or walnuts provides healthy fats and protein.

## The Science Behind the Creator's Design

Studies from Loma Linda University — home to one of the world's Blue Zones where people regularly live past 100 — have shown that Seventh-day Adventists who follow a vegetarian diet live an average of 7-10 years longer than the general population.

The nutrients found in plant foods work synergistically in ways that supplements simply cannot replicate. Each fruit, vegetable, and grain contains hundreds of compounds that work together to protect and heal the body.

## A Word of Encouragement

Changing your eating habits is a journey, not a destination. Every plant-based meal you choose is a step toward better health. God designed these foods to nourish and heal us — trust His design, and your body will thank you.`,
    author: 'Wellness Nurse Pro',
    publishedAt: '2026-05-15T10:00:00Z',
    tags: ['nutrition', 'plant-based', 'prevention', 'wellness'],
  },
  {
    id: '2',
    title: 'Why Rest Is Not Optional',
    slug: 'why-rest-is-not-optional',
    excerpt:
      'In a culture that glorifies hustle, biblical rest and quality sleep are radical acts of faith — and essential medicine for your body and mind.',
    content: `We live in a world that celebrates busyness. "I'll sleep when I'm dead" has become a cultural mantra. But God, in His infinite wisdom, modeled rest from the very beginning of creation. He worked six days and rested on the seventh — not because He was tired, but because rest is essential to the rhythm of life.

## The Sabbath Principle

The Sabbath rest is more than a religious observance — it's a health prescription. Weekly rest provides:

- **Mental restoration** — a break from the constant demands of work and responsibility
- **Emotional healing** — time to reconnect with family, community, and God
- **Physical recovery** — the body needs regular periods of reduced activity to repair and regenerate
- **Spiritual renewal** — a reminder that our worth is not defined by our productivity

## The Science of Sleep

Modern sleep research confirms what Scripture has taught for millennia: rest is not optional. During sleep, your body:

- **Repairs damaged cells and tissues** — growth hormone is released primarily during deep sleep
- **Consolidates memories** — the brain processes and stores information from the day
- **Regulates hormones** — including those that control appetite, stress, and mood
- **Strengthens the immune system** — sleep-deprived individuals are 3x more likely to catch a cold
- **Detoxifies the brain** — the glymphatic system clears waste products during sleep

## How Much Sleep Do You Need?

Most adults need 7-9 hours of quality sleep per night. Yet the CDC reports that 1 in 3 American adults don't get enough sleep. This chronic sleep debt contributes to:

- Heart disease and stroke
- Obesity and diabetes
- Depression and anxiety
- Impaired judgment and increased accident risk

## Practical Steps for Better Rest

1. **Keep a consistent sleep schedule.** Go to bed and wake up at the same time every day — even weekends.
2. **Create a restful environment.** Dark, cool (65-68°F), and quiet.
3. **Limit screens before bed.** Blue light suppresses melatonin production. Stop screens 1 hour before sleep.
4. **Practice a wind-down routine.** Read Scripture, pray, journal, or take a warm bath.
5. **Avoid caffeine after noon.** Its effects can last 8+ hours.
6. **Honor the Sabbath.** Set aside one full day each week for rest, worship, and connection.

## Rest as Trust

Choosing to rest is an act of faith. It says, "God, I trust You to handle what I cannot." In a world that demands constant output, rest is a radical declaration that we are more than what we produce. Your body was designed for rhythms of work and rest. Honor that design, and watch your health flourish.`,
    author: 'Wellness Nurse Pro',
    publishedAt: '2026-05-22T10:00:00Z',
    tags: ['rest', 'sleep', 'sabbath', 'mental-health'],
  },
  {
    id: '3',
    title: "Water: Nature's Greatest Medicine",
    slug: 'water-natures-greatest-medicine',
    excerpt:
      "From daily hydration to the healing power of hydrotherapy, water is one of God's most powerful and accessible health remedies.",
    content: `Water is life. Our bodies are roughly 60% water, our brains about 75%, and our blood about 90%. Every cell, tissue, and organ depends on water to function properly. Yet most Americans walk around chronically dehydrated without even knowing it.

## Why Hydration Matters

Proper hydration is essential for:

- **Circulation** — water is the primary component of blood, carrying oxygen and nutrients to every cell
- **Digestion** — adequate water intake prevents constipation and supports nutrient absorption
- **Kidney function** — your kidneys filter about 200 quarts of fluid daily, and they need water to do it
- **Joint health** — cartilage is about 80% water; dehydration increases joint pain
- **Temperature regulation** — sweating is your body's cooling system
- **Brain function** — even mild dehydration (1-2%) impairs concentration, mood, and memory

## How Much Water Do You Need?

A general guideline is to drink half your body weight in ounces daily. For example, if you weigh 160 pounds, aim for 80 ounces (about 10 cups) of water per day. Increase this amount if you:

- Exercise regularly
- Live in a hot or dry climate
- Are pregnant or breastfeeding
- Are recovering from illness

## Signs of Dehydration

Watch for these warning signs:

- Dark yellow urine (aim for pale straw color)
- Headaches and fatigue
- Dry mouth and skin
- Dizziness or lightheadedness
- Muscle cramps
- Constipation

## The Healing Power of Hydrotherapy

Water isn't just for drinking. Hydrotherapy — the therapeutic use of water — has been used for centuries to treat a wide range of conditions:

### Hot Water Applications
- **Warm baths** relax muscles, reduce stress, and improve sleep
- **Hot compresses** increase blood flow to sore areas, speeding healing
- **Steam inhalation** opens airways and relieves congestion

### Cold Water Applications
- **Cold compresses** reduce inflammation and swelling
- **Cold showers** boost circulation, alertness, and immune function
- **Ice packs** manage acute injuries and pain

### Contrast Hydrotherapy
Alternating hot and cold water applications creates a "vascular pump" that:
- Dramatically increases circulation
- Speeds healing of injuries
- Boosts immune cell activity
- Reduces chronic pain

## Practical Tips

1. **Start your day with water.** Drink 16 ounces first thing in the morning to rehydrate after sleep.
2. **Carry a water bottle.** Having water visible and accessible makes you more likely to drink it.
3. **Eat water-rich foods.** Cucumbers, watermelon, oranges, and lettuce are 90%+ water.
4. **Set reminders.** If you forget to drink, set hourly reminders on your phone.
5. **Try hydrotherapy at home.** End your shower with 30 seconds of cold water to invigorate your circulation.
6. **Drink between meals.** Avoid large amounts of water during meals, which can dilute digestive enzymes.

## A Gift from the Creator

Water is one of God's simplest yet most powerful gifts. It cleanses, heals, refreshes, and sustains. Jesus Himself said, "Whoever drinks the water I give them will never thirst" (John 4:14). Let both physical and spiritual water flow freely in your life.`,
    author: 'Wellness Nurse Pro',
    publishedAt: '2026-05-29T10:00:00Z',
    tags: ['water', 'hydration', 'hydrotherapy', 'natural-remedies'],
  },
];

const seedPages: SitePage[] = [
  {
    id: '1',
    title: 'About',
    slug: 'about',
    content: 'Welcome to WellnessNursePro. We provide faith-based wellness coaching rooted in natural health principles.',
    metaDescription: 'About WellnessNursePro - faith-based wellness coaching',
    published: true,
    createdAt: '2026-05-01T10:00:00Z',
    updatedAt: '2026-05-01T10:00:00Z',
  },
  {
    id: '2',
    title: 'Contact',
    slug: 'contact',
    content: 'Get in touch with us to start your wellness journey.',
    metaDescription: 'Contact WellnessNursePro',
    published: true,
    createdAt: '2026-05-01T10:00:00Z',
    updatedAt: '2026-05-01T10:00:00Z',
  },
];

// ─── Helpers ─────────────────────────────────────────────────

function useBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

function localPath(key: string): string {
  return path.join(LOCAL_DIR, key.replace(/\//g, '-'));
}

function ensureLocalDir(): void {
  if (!fs.existsSync(LOCAL_DIR)) {
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
  }
}

async function getBlob<T>(key: string, fallback: T): Promise<T> {
  if (!useBlob()) {
    // Local file fallback
    ensureLocalDir();
    const fp = localPath(key);
    try {
      if (fs.existsSync(fp)) {
        const raw = fs.readFileSync(fp, 'utf-8');
        return JSON.parse(raw) as T;
      }
    } catch {
      // corrupted file, return fallback
    }
    return fallback;
  }

  try {
    const { blobs } = await list({ prefix: key });
    if (blobs.length === 0) {
      return fallback;
    }
    // Fetch the blob content by its URL
    const response = await fetch(blobs[0].url);
    if (!response.ok) {
      return fallback;
    }
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

async function putBlob<T>(key: string, data: T): Promise<void> {
  if (!useBlob()) {
    // Local file fallback
    ensureLocalDir();
    const fp = localPath(key);
    fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf-8');
    return;
  }

  await put(key, JSON.stringify(data, null, 2), {
    access: 'public',
    addRandomSuffix: false,
  });
}

// ─── Blog Posts ──────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await getBlob<BlogPost[]>(BLOG_KEY, []);
  if (posts.length === 0) {
    // Seed default posts
    await putBlob(BLOG_KEY, seedBlogPosts);
    return [...seedBlogPosts];
  }
  return posts;
}

export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  await putBlob(BLOG_KEY, posts);
}

// ─── Pages ───────────────────────────────────────────────────

export async function getPages(): Promise<SitePage[]> {
  const pages = await getBlob<SitePage[]>(PAGES_KEY, []);
  if (pages.length === 0) {
    await putBlob(PAGES_KEY, seedPages);
    return [...seedPages];
  }
  return pages;
}

export async function savePages(pages: SitePage[]): Promise<void> {
  await putBlob(PAGES_KEY, pages);
}

// ─── Theme ───────────────────────────────────────────────────

export async function getTheme(): Promise<ThemeConfig> {
  return getBlob<ThemeConfig>(THEME_KEY, defaultTheme);
}

export async function saveTheme(theme: ThemeConfig): Promise<void> {
  await putBlob(THEME_KEY, theme);
}
