'use client'

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Wellness Nurse Pro',
    url: 'https://wellnessnursepro.com',
    description:
      'Your guide to holistic health through the NEWSTART lifestyle principles rooted in faith and science.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://wellnessnursepro.com/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Wellness Nurse Pro',
    url: 'https://wellnessnursepro.com',
    description:
      'Health and wellness resource dedicated to sharing the Eight Laws of Health — NEWSTART lifestyle principles rooted in faith and science.',
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  image?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    ...(image && { image }),
    author: {
      '@type': 'Organization',
      name: 'Wellness Nurse Pro',
      url: 'https://wellnessnursepro.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wellness Nurse Pro',
      url: 'https://wellnessnursepro.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
