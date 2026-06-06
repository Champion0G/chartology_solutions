import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Chartologic — Master Financial Markets & Trading Intelligence',
  description: 'We help students and working professionals understand financial markets through structured learning, mentorship, certifications, and practical exposure.',
  keywords: 'Financial Market Education, Learn Trading India, Trading Mentorship Program, Stock Market Course, Technical Analysis, Risk Management, Trading Certifications, Financial Literacy for Students',
  openGraph: {
    title: 'Chartologic — Master Financial Markets & Trading Intelligence',
    description: 'We help students and working professionals understand financial markets through structured learning, mentorship, certifications, and practical exposure.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://Chartologic-solutions.vercel.app/',
    siteName: 'Chartologic',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    'name': 'Chartologic',
    'url': 'https://Chartologic-solutions.vercel.app/',
    'description': 'Premium educational platform helping students learn trading through structured programs, mentorship, and community support in India.',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Mumbai',
      'addressRegion': 'MH',
      'addressCountry': 'IN'
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}


