import { SelectSearch } from '@/components/SelectSearch';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';

export default async function AddQuotePage() {
    const dealers = await db.dealer.findMany({
        select: {
            id: true,
            storeName: true,
        },
    });

    return (
        <div className="flex items-center justify-center flex-wrap mt-[12rem]">
            <div className="flex justify-center gap-4 w-[80%] md:max-w-[60%] lg:w-[40%] flex-wrap">
                <div className="w-full mt-10">
                    <Card className="bg-slate-700 border-none shadow-xl text-slate-200">
                        <CardHeader>
                            <CardTitle className="tracking-normal">
                                Start a New Quote
                            </CardTitle>
                            <CardDescription className="text-slate-400 pb-5">
                                Add a new quote, then add products to it.
                            </CardDescription>
                            <Separator className="bg-slate-500" />
                            {/* Need to select a dealer */}
                            <br />
                            <SelectSearch options={dealers} />
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    );
}
