import { Button, buttonVariants } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { DecrementButton } from './components/decrement-button';
import { AddButton } from './components/add-button';
import { DeleteButton } from './components/delete-button';

type Props = {
    params: {
        id: string;
    };
};
export default async function page({ params }: Props) {
    const { id } = params;
    const quote = await db.quote.findFirst({
        where: {
            id,
        },
        include: {
            dealer: true,
            products: {
                select: {
                    productId: true,
                    quantity: true,
                    product: true,
                },
            },
        },
    });

    if (!quote) {
        return (
            <div>
                <h1 className="text-2xl">No Quote {id}</h1>
            </div>
        );
    }

    const products = await db.product.findMany();

    if (quote.products.length <= 0) {
        return (
            <div className="container">
                <div className="flex items-center justify-between flex-wrap">
                    <h1 className="text-2xl">{quote.referenceNum}</h1>
                    <section className="py-4">
                        <p>{quote.dealer.storeName}</p>
                        <p>{quote.dealer.address}</p>
                        <p>{quote.dealer.email}</p>
                    </section>
                    <Separator />
                    <section>
                        <div className="flex items-center justify-normal gap-6 flex-wrap text-lg">
                            <h3 className="text-xl">No Products</h3>
                        </div>
                    </section>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="mt-6">Add Products</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Products to Quote</DialogTitle>
                            <DialogDescription>
                                Add products to the quote.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <DataTable columns={columns} data={products} />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="flex items-center justify-between flex-wrap">
                <h1 className="text-2xl">{quote.referenceNum}</h1>
                <section className="py-4">
                    <p>{quote.dealer.storeName}</p>
                    <p>{quote.dealer.address}</p>
                    <p>{quote.dealer.email}</p>
                </section>
                <Separator />
                <section>
                    <div>
                        {quote.products.map((productOnQuote) => (
                            <div
                                key={productOnQuote.productId}
                                className="flex items-center justify-normal gap-6 flex-wrap text-lg"
                            >
                                <p className="font-semibold">
                                    {productOnQuote.product.productName}
                                </p>
                                <div className="flex items-center justify-center gap-6 text-slate-400">
                                    <p>${productOnQuote.product.msrp}</p>
                                    <p>x {productOnQuote.quantity}</p>
                                    <p className="text-white">
                                        $
                                        {productOnQuote.product.msrp *
                                            productOnQuote.quantity}
                                    </p>
                                </div>

                                <DecrementButton
                                    productId={productOnQuote.productId}
                                />
                                <AddButton
                                    productId={productOnQuote.productId}
                                />
                                <DeleteButton
                                    productId={productOnQuote.productId}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mt-6">Add Products</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Products to Quote</DialogTitle>
                        <DialogDescription>
                            Add products to the quote.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <DataTable columns={columns} data={products} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
