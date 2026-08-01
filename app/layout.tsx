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
    url: 'https://www.chartologic.com/',
    siteName: 'Chartologic',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://www.chartologic.com/#organization',
        'name': 'Chartologic',
        'url': 'https://www.chartologic.com/',
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
        '@id': 'https://www.chartologic.com/#website',
        'url': 'https://www.chartologic.com/',
        'name': 'Chartologic',
        'publisher': {
          '@id': 'https://www.chartologic.com/#organization'
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://www.chartologic.com/programs?search={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'ItemList',
        '@id': 'https://www.chartologic.com/#sitelinks',
        'name': 'Site Navigation Links',
        'itemListElement': [
          {
            '@type': 'SiteNavigationElement',
            'position': 1,
            'name': 'Our Programs',
            'url': 'https://www.chartologic.com/programs'
          },
          {
            '@type': 'SiteNavigationElement',
            'position': 2,
            'name': 'About Us',
            'url': 'https://www.chartologic.com/about-us'
          },
          {
            '@type': 'SiteNavigationElement',
            'position': 3,
            'name': 'Careers',
            'url': 'https://www.chartologic.com/careers'
          },
          {
            '@type': 'SiteNavigationElement',
            'position': 4,
            'name': 'Contact Us',
            'url': 'https://www.chartologic.com/contact'
          },
          {
            '@type': 'SiteNavigationElement',
            'position': 5,
            'name': 'Privacy Policy',
            'url': 'https://www.chartologic.com/privacy-policy'
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


