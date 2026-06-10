import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "WellnessNursePro — God's Blueprint for Optimal Health | NEWSTART Lifestyle",
  description:
    "Discover the 8 laws of health rooted in the NEWSTART lifestyle. Evidence-based holistic wellness guided by a registered nurse — Nutrition, Exercise, Water, Sunlight, Temperance, Air, Rest, and Trust in God.",
  keywords:
    "NEWSTART, holistic health, wellness nurse, 8 laws of health, nutrition, exercise, water, sunlight, temperance, air, rest, trust in God, Ellen White, natural remedies",
  alternates: { canonical: "https://wellnessnursepro.com" },
};

const eightLaws = [
  {
    letter: "N",
    name: "Nutrition",
    emoji: "🥗",
    description:
      "Fuel your body with whole, plant-based foods that nourish every cell and prevent disease.",
  },
  {
    letter: "E",
    name: "Exercise",
    emoji: "🏃",
    description:
      "Regular physical activity strengthens the heart, clears the mind, and boosts energy.",
  },
  {
    letter: "W",
    name: "Water",
    emoji: "💧",
    description:
      "Pure water inside and out — hydration is the foundation of every bodily function.",
  },
  {
    letter: "S",
    name: "Sunlight",
    emoji: "☀️",
    description:
      "Moderate sunshine lifts mood, strengthens bones, and supports immune health.",
  },
  {
    letter: "T",
    name: "Temperance",
    emoji: "⚖️",
    description:
      "Balance in all things — avoid what is harmful, use wisely what is good.",
  },
  {
    letter: "A",
    name: "Air",
    emoji: "🌬️",
    description:
      "Fresh, clean air revitalizes the blood and sharpens every organ of the body.",
  },
  {
    letter: "R",
    name: "Rest",
    emoji: "😴",
    description:
      "Quality sleep and weekly rest restore the body, mind, and spirit.",
  },
  {
    letter: "T",
    name: "Trust in God",
    emoji: "🙏",
    description:
      "Peace of mind through faith — the ultimate remedy for anxiety and stress.",
  },
];

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center px-6 py-28 text-center sm:py-36"
        style={{ backgroundColor: "#2d6a4f" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-200">
            Evidence-Based Holistic Wellness
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Reclaim Your Health with the{" "}
            <span style={{ color: "#d4a574" }}>NEWSTART</span> Lifestyle
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-emerald-100 sm:text-xl">
            Discover God&apos;s original blueprint for optimal health — eight
            simple, powerful principles that have transformed lives for over a
            century.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/eight-laws-of-health"
              className="inline-flex items-center rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "#d4a574" }}
            >
              Explore the 8 Laws of Health
              <span className="ml-2" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Intro / About Section */}
      <section className="px-6 py-20" style={{ backgroundColor: "#f8f6f0" }}>
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "#2d6a4f" }}
          >
            What Is WellnessNursePro?
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-700">
            WellnessNursePro is your trusted guide to whole-person health.
            Grounded in the NEWSTART lifestyle and backed by a registered
            nurse&apos;s clinical expertise, we help you understand and apply the
            eight natural laws of health that God designed for your body, mind,
            and spirit.
          </p>
          <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl">🩺</div>
              <h3
                className="mt-3 text-lg font-semibold"
                style={{ color: "#2d6a4f" }}
              >
                Nurse-Led Guidance
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Health education rooted in clinical knowledge and compassionate
                care.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl">🌿</div>
              <h3
                className="mt-3 text-lg font-semibold"
                style={{ color: "#2d6a4f" }}
              >
                Natural Remedies
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Simple, God-given principles that work with your body, not
                against it.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl">📖</div>
              <h3
                className="mt-3 text-lg font-semibold"
                style={{ color: "#2d6a4f" }}
              >
                Faith & Science
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Where biblical health wisdom meets modern research and
                evidence-based practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Laws Preview Cards */}
      <section className="px-6 py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: "#2d6a4f" }}
            >
              The 8 Laws of Health
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Each letter in{" "}
              <strong style={{ color: "#d4a574" }}>NEWSTART</strong> represents a
              foundational principle for vibrant, God-honoring health.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {eightLaws.map((law, index) => (
              <Link
                key={index}
                href="/eight-laws-of-health"
                className="group rounded-2xl border border-gray-100 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: "#f8f6f0" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl" role="img" aria-label={law.name}>
                    {law.emoji}
                  </span>
                  <div>
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: "#d4a574" }}
                    >
                      {law.letter}
                    </span>
                    <h3
                      className="text-lg font-semibold transition-colors group-hover:underline"
                      style={{ color: "#2d6a4f" }}
                    >
                      {law.name}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {law.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/eight-laws-of-health"
              className="inline-flex items-center rounded-full px-8 py-3 text-base font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#40916c" }}
            >
              Dive Deeper into Each Law &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Ellen White Quote Section */}
      <section
        className="px-6 py-20"
        style={{
          background:
            "linear-gradient(135deg, #2d6a4f 0%, #40916c 50%, #2d6a4f 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-5xl" aria-hidden="true">
            &#8220;
          </div>
          <blockquote className="mt-2 text-xl font-medium leading-relaxed text-white sm:text-2xl">
            Pure air, sunlight, abstemiousness, rest, exercise, proper diet, the
            use of water, trust in divine power — these are the true remedies.
          </blockquote>
          <footer className="mt-6">
            <cite
              className="text-base font-semibold not-italic"
              style={{ color: "#d4a574" }}
            >
              — Ellen White, <em>The Ministry of Healing</em>, p. 127
            </cite>
          </footer>
        </div>
      </section>

      {/* Latest from the Blog */}
      <section className="px-6 py-20" style={{ backgroundColor: "#f8f6f0" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: "#2d6a4f" }}
            >
              Latest from the Blog
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Practical tips, recipes, and inspiration for your wellness journey.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className="flex h-40 items-center justify-center"
                  style={{ backgroundColor: "#40916c" }}
                >
                  <span className="text-sm font-semibold uppercase tracking-widest text-white/70">
                    {post.tags[0] || "Wellness"}
                  </span>
                </div>
                <div className="p-6">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#d4a574" }}
                  >
                    {post.tags[0] || "Wellness"}
                  </span>
                  <h3
                    className="mt-2 text-lg font-semibold leading-snug"
                    style={{ color: "#2d6a4f" }}
                  >
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-block text-sm font-semibold hover:underline"
                    style={{ color: "#40916c" }}
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-base font-semibold transition-colors hover:underline"
              style={{ color: "#2d6a4f" }}
            >
              View All Posts &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section className="px-6 py-20" style={{ backgroundColor: "#ffffff" }}>
        <div
          className="mx-auto max-w-3xl rounded-3xl px-8 py-16 text-center shadow-lg sm:px-16"
          style={{ backgroundColor: "#2d6a4f" }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Start Your Wellness Journey Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
            Join thousands who are discovering the power of God&apos;s health
            principles. Learn one law at a time — no overwhelm, just steady
            progress.
          </p>
          <div className="mt-8">
            <Link
              href="/eight-laws-of-health"
              className="inline-flex items-center rounded-full px-8 py-4 text-lg font-semibold shadow-lg transition-all hover:scale-105"
              style={{ backgroundColor: "#d4a574", color: "#2d6a4f" }}
            >
              Get Started with NEWSTART
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
