import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { cn } from "@/lib/utils";

import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Casa Bella Quotes",
	description: "Quote generator for Casa Bella Outdoor",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={cn(outfit.className, "subpixel-antialiased")}
		>
			<body className='min-h-screen bg-gradient-to-tr from-black via-indigo-900 to-black subpixel-antialiased text-slate-100'>
				<Providers>
					<Navbar />
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
