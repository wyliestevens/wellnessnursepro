import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wellness Nurse Pro',
    short_name: 'WellnessNursePro',
    description: 'Your guide to holistic health through the Eight Laws of Health — NEWSTART lifestyle principles rooted in faith and science.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f6f0',
    theme_color: '#2d6a4f',
  }
}
