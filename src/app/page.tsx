import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-16">
            <div className="h-full w-11/12">
                <h1 className="text-4xl font-semibold dark:text-white/90 text-center pb-10">
                    Looking To Get a Quote On a Casa Bella Island?
                </h1>
                <p className="dark:text-white/90 text-lg">Email us at:</p>
            </div>
        </main>
    );
}
