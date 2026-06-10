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
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://wellnessnursepro.com/blog?q={search_term_string}',
      },
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
    '@type': 'MedicalOrganization',
    name: 'Wellness Nurse Pro',
    url: 'https://wellnessnursepro.com',
    description:
      'Health and wellness resource dedicated to sharing the Eight Laws of Health — NEWSTART lifestyle principles rooted in faith and science.',
    medicalSpecialty: 'Preventive Medicine',
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
  type = 'Article',
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  image?: string
  type?: 'Article' | 'BlogPosting'
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    ...(image && { image }),
    author: {
      '@type': 'Person',
      name: 'Wellness Nurse Pro, RN',
      jobTitle: 'Registered Nurse',
      url: 'https://wellnessnursepro.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wellness Nurse Pro',
      url: 'https://wellnessnursepro.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
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

export function FAQSchema({
  questions,
}: {
  questions: { question: string; answer: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
