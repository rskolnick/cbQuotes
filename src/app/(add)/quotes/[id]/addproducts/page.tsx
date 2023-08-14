import { db } from '@/lib/db';

type Props = {
    params: {
        id: string;
    };
};
export default async function page({ params }: Props) {
    const { id } = params;
    const products = await db.product.findMany();

    return (
        <div className="mx-10 md:mx-20 lg:mx-[20rem]">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="flex items-center justify-between flex-wrap"
                >
                    <p className="text-2xl">{product.productName}</p>
                    <p className="text-xl text-slate-400">${product.msrp}</p>
                </div>
            ))}
        </div>
    );
}
