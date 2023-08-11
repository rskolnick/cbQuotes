import { db } from '@/lib/db';

export default async function QuotesPage() {
    const quotes = await db.quote.findMany({
        include: {
            dealer: true,
        },
    });

    return <div>{quotes.map((quote) => quote.dealer.storeName)}</div>;
}
