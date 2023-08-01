import { db } from '@/lib/db';

export default async function page() {
    const dealers = await db.dealer.count();
    const dealer = await db.dealer.findFirst();

    return (
        <div>
            <h1>Number of Dealers: {dealers}</h1>
            <p>{dealer?.storeName}</p>
            <p>{dealer?.address}</p>
            <p>{dealer?.email}</p>
            <p>{dealer?.discount}</p>
        </div>
    );
}
