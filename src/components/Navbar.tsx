import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 flex items-center justify-between h-20 border-b border-gray-400 dark:border-slate-400 dark:text-white/90 px-4 bg-blue-400/70 text-slate-700">
            <div className="font-semibold">
                <Link href="/" className="text-2xl sm:text-3xl">
                    Casa Bella Quotes
                </Link>
            </div>
            <div className="flex justify-between items-center h-full font-medium">
                <Link
                    href="/"
                    className=" text-lg sm:text-xl px-1 hover:bg-blue-400/50 hover:text-slate-100 h-full flex items-center"
                >
                    Contact Us
                </Link>
                <Link
                    href="/"
                    className=" text-lg sm:text-xl px-1 hover:bg-blue-400/50 hover:text-slate-100 h-full flex items-center"
                >
                    Get a Quote
                </Link>
                <Link
                    href="/dealers/add"
                    className=" text-lg sm:text-xl px-1 hidden hover:bg-blue-400/50 hover:text-slate-100 h-full sm:flex items-center"
                >
                    Add a Dealer
                </Link>
            </div>
        </nav>
    );
}
