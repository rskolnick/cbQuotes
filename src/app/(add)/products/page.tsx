import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function ProductsPage() {
    const products = await db.product.findMany();

    return (
        <div className="">
            <div className="flex items-center justify-end pr-5">
                <Link
                    className={cn(
                        buttonVariants(),
                        'bg-slate-200 text-slate-900 hover:text-slate-200'
                    )}
                    href="/products/add"
                >
                    Add a Product
                </Link>
            </div>

            <div className="flex justify-center pt-6 items-center gap-x-6 gap-y-6 flex-wrap h-full">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.productName}`}
                    >
                        <div className="flex bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500 flex-col items-center rounded-lg w-48 h-80">
                            <div className="h-full w-full flex flex-col items-center justify-around relative">
                                <h1 className="text-2xl md:text-3xl font-medium">
                                    {product.productName}
                                </h1>
                                <Separator className="bg-slate-500 absolute top-44 w-3/4" />
                                <p className="text-lg md:text-xl font-extralight">
                                    ${product.msrp}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
