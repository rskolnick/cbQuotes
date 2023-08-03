import { db } from '@/lib/db';

export default async function page() {
    const parts = await db.part.findMany();

    return (
        <div className="flex justify-center col-span-2">
            {parts.map((part) => (
                <div key={part.id}>
                    <h1>{part.name}</h1>
                </div>
            ))}
        </div>
    );
}
