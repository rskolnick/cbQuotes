import { ProductPartsTable } from '@/components/ProductsPartsAdder';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { Separator } from '@/components/ui/separator';
import { notFound } from 'next/navigation';

type Props = {
    params: {
        slug: string;
    };
};
export default async function ProductPartsPage({ params }: Props) {
    const { slug } = params;

    const product = await db.product.findFirst({
        where: {
            productName: slug,
        },
    });

    if (!product) {
        return notFound();
    }

    const id = product.id;

    const partsList = await db.part.findMany({
        select: {
            id: true,
            name: true,
            cost: true,
            products: {
                select: {
                    id: true,
                },
            },
        },
    });

    return (
        <div className="bg-slate-700 rounded-lg md:w-3/4 max-w-[80rem] p-10 m-auto mt-[5rem]">
            <h1 className="text-3xl ml-7 pb-4">{product.productName}</h1>
            <Separator className="bg-slate-500" />
            {/* Need to sort the product parts table, and add pagination */}
            <ProductPartsTable productId={id} partsList={partsList} />
        </div>
    );
}
