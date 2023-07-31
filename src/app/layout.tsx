import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Casa Bella Quotes',
    description: 'Quote generator for Casa Bella Outdoor',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} dark:bg-slate-600`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
