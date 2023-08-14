import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';

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
                    <div className="">
                        {/* {quote.products.map((productOnQuote) => (
                            <div key={productOnQuote.productId}>
                                <p>{productOnQuote.quantity}</p>
                                <p>
                                    {productOnQuote.product.productName}
                                </p>
                            </div>
                        ))} */}
                        <div>
                            <p>Sample Product</p>
                            <p>$299.00</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
