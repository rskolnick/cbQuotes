import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 flex items-center justify-between h-20 border-b border-gray-400 dark:border-slate-400 dark:text-white/90 px-4">
            <div className="w-full bg-emerald-300">
                <Link href="/" className="text-xl sm:text-3xl">
                    Casa Bella Quotes
                </Link>
            </div>
            <div className="flex w-3/4 lg:w-1/3 justify-between h-full items-center">
                <Link href="/" className=" text-lg sm:text-xl">
                    Contact Us
                </Link>
                <Link href="/" className=" text-lg sm:text-xl">
                    Get a Quote
                </Link>
            </div>
        </nav>
    );
}
