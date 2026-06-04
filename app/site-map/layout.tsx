import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sitemap — Chartologic',
    description: 'Visual index of all sections and subpages on the Chartologic trading education platform.',
};

export default function SitemapLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

