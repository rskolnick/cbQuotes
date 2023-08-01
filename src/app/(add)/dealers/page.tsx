import { db } from '@/lib/db';
import { columns } from '@/components/Columns';
import { DataTable } from '@/components/DataTable';

async function getData() {
    const dealerList = await db.dealer.findMany();

    return dealerList;
}

export default async function page() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
