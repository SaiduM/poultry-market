import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Poultry Marketplace - Bid & Buy Fresh Poultry Products',
  description: 'A modern marketplace for bidding and buying fresh poultry products including hens, chickens, and eggs. Real-time auctions with secure payments.',
  keywords: 'poultry, marketplace, bidding, chickens, hens, eggs, auction, fresh food',
  authors: [{ name: 'Poultry Marketplace Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Poultry Marketplace - Bid & Buy Fresh Poultry Products',
    description: 'A modern marketplace for bidding and buying fresh poultry products including hens, chickens, and eggs.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poultry Marketplace - Bid & Buy Fresh Poultry Products',
    description: 'A modern marketplace for bidding and buying fresh poultry products.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
} 