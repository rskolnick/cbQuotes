import { Button, buttonVariants } from '@/components/ui/button';
import { db } from '@/lib/db';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
    params: {
        slug: string;
    };
};

const getTotalProfit = (num1: number, num2: number) => {
    return num1 - num2;
};

export default async function page({ params }: Props) {
    const { slug } = params;
    const product = await db.product.findFirst({
        where: {
            productName: slug,
        },
        include: {
            parts: true,
        },
    });
    let totalCost = 0;
    product?.parts.map((part) => {
        totalCost = totalCost + part.cost;
        return totalCost;
    });

    if (product) {
        const totalProfit = getTotalProfit(product!.msrp, totalCost);
        return (
            <div className="flex flex-col items-start pl-10">
                <Link href="/products" className="flex py-4">
                    <ArrowLeft />
                    Return to Products
                </Link>
                <h1 className="text-3xl">{product?.productName}</h1>
                <h2 className="text-xl">${product?.msrp}</h2>
                <p>Includes {product?.parts.length} parts:</p>
                <ul>
                    {product?.parts.map((part) => (
                        <li key={part.id}>
                            {part.name}: ${part.cost}
                        </li>
                    ))}
                </ul>
                <p className="text-xl">MSRP minus Cost: ${totalProfit}</p>
                <div>
                    {product?.parts.length ? (
                        <Link
                            href={`/products/${product!.productName}/parts`}
                            className={buttonVariants()}
                        >
                            Edit Parts
                        </Link>
                    ) : (
                        <Link
                            href={`/products/${product!.productName}/parts`}
                            className={buttonVariants()}
                        >
                            Add Parts
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            <Link href="/products" className="flex py-4">
                <ArrowLeft />
                Return to Products
            </Link>
            <h1 className="text-3xl">No Product named {slug.toUpperCase()}</h1>
        </div>
    );
}
