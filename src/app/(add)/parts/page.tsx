import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import Link from 'next/link';

export default async function page() {
    const parts = await db.part.findMany();

    return (
        <div className="flex justify-center items-center gap-x-6 flex-wrap h-[91.4vh]">
            {parts.map((part) => (
                <Link key={part.id} href={`/parts/${part.name}`}>
                    <div className="flex bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500 flex-col items-center rounded-lg w-48 h-80">
                        <div className="h-full w-full flex flex-col items-center justify-around relative">
                            <h1 className="text-2xl md:text-3xl font-medium">
                                {part.name}
                            </h1>
                            <Separator className="bg-slate-500 absolute top-44 w-3/4" />
                            <p className="text-lg md:text-xl font-extralight">
                                ${part.cost}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
