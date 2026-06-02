import { getAllPages, getPageBySlug } from '@/lib/page-data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return { title: 'Not Found' };
  return {
    title: page.title + ' | Wellness Nurse Pro',
    description: page.metaDescription || undefined,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page || !page.published) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      <h1
        className="text-4xl font-bold mb-8"
        style={{ fontFamily: 'Lora, serif', color: '#2d6a4f' }}
      >
        {page.title}
      </h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </article>
  );
}
