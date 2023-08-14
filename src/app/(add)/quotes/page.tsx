import { db } from '@/lib/db';
import { Hash } from 'lucide-react';
import Link from 'next/link';

export default async function QuotesPage() {
    const quotes = await db.quote.findMany({
        include: {
            dealer: true,
        },
    });

    return (
        <div className="flex items-center justify-center mt-20">
            <div className="w-1/2">
                <div className="flex items-center justify-between gap-6 flex-wrap w-full">
                    {quotes.map((quote) => (
                        <div
                            key={quote.id}
                            className="transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 p-6 rounded"
                        >
                            <Link href={`/quotes/${quote.id}`}>
                                <h1 className="text-2xl">
                                    {quote.dealer.storeName}
                                </h1>
                                <div className="flex items-center">
                                    <p>{quote.referenceNum}</p>
                                </div>
                                <p>{quote.createdAt.toLocaleDateString()}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
