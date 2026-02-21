import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chartology — Master Trading & Financial Intelligence',
  description: 'A structured learning path to trading, risk management, and financial independence. Join Chartology and invest in yourself.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
