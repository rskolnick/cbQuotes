import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';

export default async function page() {
    const parts = await db.part.findMany();

    return (
        <div className="flex justify-center items-center gap-x-6 flex-wrap h-[91.4vh]">
            {parts.map((part) => (
                <div
                    key={part.id}
                    className="flex bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500 flex-col items-center rounded-lg w-40 h-1/3"
                >
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
            ))}
        </div>
    );
}
