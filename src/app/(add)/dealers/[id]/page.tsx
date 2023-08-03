import EditDealer from '@/components/EditData';
import { db } from '@/lib/db';

type Props = {
    params: {
        id: string;
    };
};
export default async function page({ params }: Props) {
    const { id } = params;

    const dealer = await db.dealer.findFirst({
        where: {
            id,
        },
    });

    return (
        <div>
            <h1 className="text-3xl">{dealer?.storeName}</h1>
            <EditDealer
                dealer={dealer?.storeName}
                dealerAddress={dealer?.address}
                dealerEmail={dealer?.email}
                dealerDiscount={dealer?.discount}
            />
        </div>
    );
}
