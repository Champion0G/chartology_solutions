import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Chartologic — Master Trading & Financial Intelligence',
  description: 'Structured trading education, live cohorts, technical analysis mastery, risk management, and community learning. Start your trading journey today.',
  keywords: 'Trading Course India, Trading Mentorship Program, Stock Market Education, Trading Cohort, Technical Analysis Course, Trading Classes Online, Trading Community India',
  openGraph: {
    title: 'Chartologic — Master Trading & Financial Intelligence',
    description: 'Learn trading, risk management, and market psychology through live cohorts, structured mentorship, and community-led learning in India.',
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


