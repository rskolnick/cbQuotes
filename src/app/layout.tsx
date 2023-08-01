import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/components/Providers';

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
        <html
            lang="en"
            className={cn(
                inter.className,
                'bg-white text-gray-900 antialiased'
            )}
        >
            <body className="min-h-screen pt-12 bg-slate-50 antialiased">
                <Providers>
                    <Navbar />
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
