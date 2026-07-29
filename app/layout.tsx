import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegistrationModal from '@/components/RegistrationModal';
import AnalyticsTracker from '@/components/AnalyticsTracker';

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
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://Chartologic-solutions.vercel.app/#organization',
        'name': 'Chartologic',
        'url': 'https://Chartologic-solutions.vercel.app/',
        'description': 'Premium educational platform helping students learn trading through structured programs, mentorship, and community support in India.',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Mumbai',
          'addressRegion': 'MH',
          'addressCountry': 'IN'
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://Chartologic-solutions.vercel.app/#website',
        'url': 'https://Chartologic-solutions.vercel.app/',
        'name': 'Chartologic',
        'publisher': {
          '@id': 'https://Chartologic-solutions.vercel.app/#organization'
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://Chartologic-solutions.vercel.app/programs?search={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'ItemList',
        '@id': 'https://Chartologic-solutions.vercel.app/#sitelinks',
        'name': 'Site Navigation Links',
        'itemListElement': [
          {
            '@type': 'SiteNavigationElement',
            'position': 1,
            'name': 'Our Programs',
            'url': 'https://Chartologic-solutions.vercel.app/programs'
          },
          {
            '@type': 'SiteNavigationElement',
            'position': 2,
            'name': 'About Us',
            'url': 'https://Chartologic-solutions.vercel.app/about-us'
          },
          {
            '@type': 'SiteNavigationElement',
            'position': 3,
            'name': 'Careers',
            'url': 'https://Chartologic-solutions.vercel.app/careers'
          },
          {
            '@type': 'SiteNavigationElement',
            'position': 4,
            'name': 'Contact Us',
            'url': 'https://Chartologic-solutions.vercel.app/contact'
          },
          {
            '@type': 'SiteNavigationElement',
            'position': 5,
            'name': 'Privacy Policy',
            'url': 'https://Chartologic-solutions.vercel.app/privacy-policy'
          }
        ]
      }
    ]
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
        <AnalyticsTracker />
        <Header />
        {children}
        <Footer />
        <RegistrationModal />
      </body>
    </html>
  );
}


