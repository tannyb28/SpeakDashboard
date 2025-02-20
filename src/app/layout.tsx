// src/app/layout.tsx
'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import MainNavbar from '@/components/MainNavbar';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation'; // Import the hook to detect current route

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Conditionally check if the path is within the dashboard
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Render MainNavbar and Footer only if it's NOT the dashboard */}
        {!isDashboard && <MainNavbar />}
        <div>{children}</div>
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}
