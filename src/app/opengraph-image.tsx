import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Wellness Nurse Pro — God\'s Blueprint for Optimal Health'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #2d6a4f 0%, #40916c 50%, #2d6a4f 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            marginBottom: '20px',
          }}
        >
          🌿
        </div>
        <div
          style={{
            fontSize: '52px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}
        >
          Wellness Nurse Pro
        </div>
        <div
          style={{
            fontSize: '28px',
            color: '#d4a574',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          {"God's Blueprint for Optimal Health"}
        </div>
        <div
          style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.5,
          }}
        >
          NEWSTART Lifestyle • Nutrition • Exercise • Water • Sunlight • Temperance • Air • Rest • Trust in God
        </div>
      </div>
    ),
    { ...size }
  )
}
