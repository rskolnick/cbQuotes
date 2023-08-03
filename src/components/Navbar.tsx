import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 flex items-center justify-between h-20 border-b border-gray-400 dark:border-slate-400 dark:text-white/90 px-4 bg-sky-500/60">
            <div className="">
                <Link href="/" className="text-2xl sm:text-3xl">
                    Casa Bella Quotes
                </Link>
            </div>
            <div className="flex justify-between items-center h-full">
                <Link
                    href="/"
                    className=" text-lg sm:text-xl px-1 hover:bg-slate-200 h-full flex items-center"
                >
                    Contact Us
                </Link>
                <Link href="/" className=" text-lg sm:text-xl px-1">
                    Get a Quote
                </Link>
                <Link
                    href="/dealers/add"
                    className=" text-lg sm:text-xl px-1 hidden sm:block"
                >
                    Add a Dealer
                </Link>
            </div>
        </nav>
    );
}
