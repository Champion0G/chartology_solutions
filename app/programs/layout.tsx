import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Programs — Chartologic',
  description: 'Explore our structured pathways and flagships, including The Chartologic Trading Residency, designed to train students and professionals to institutional standards.',
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
