import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Live Workshop — Chartology Cohort',
    description: 'Live interactive trading and financial markets workshop for Chartology cohort participants.',
    robots: {
        index: false,
        follow: false
    }
};

export default function WorkshopLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
