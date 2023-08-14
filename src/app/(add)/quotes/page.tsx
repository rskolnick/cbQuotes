import { db } from '@/lib/db';

export default async function QuotesPage() {
    const quotes = await db.quote.findMany({
        include: {
            dealer: true,
        },
    });

    return (
        <div>
            {quotes.map((quote) => (
                <div key={quote.id}>
                    <h1 className="text-2xl">{quote.dealer.storeName}</h1>
                    <p>Reference Number: {quote.referenceNum}</p>
                </div>
            ))}
        </div>
    );
}
