import { ProductPartsTable } from '@/components/ProductsPartsAdder';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
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
            <h1 className="text-3xl">{product.productName}</h1>
            <ProductPartsTable productId={id} partsList={partsList} />
        </div>
    );
}
