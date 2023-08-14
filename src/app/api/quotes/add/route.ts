import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        // TODO: Make sure we are signed in

        const body = await req.json();
        const { id, refNum } = body;

        const dealerExists = await db.dealer.findFirst({
            where: {
                id,
            },
        });

        if (!dealerExists) {
            return new Response('Dealer not found', {
                status: 400,
            });
        }

        await db.quote.create({
            data: {
                dealerId: id,
                referenceNum: refNum,
            },
        });

        return new Response('OK');
    } catch (error) {
        return new Response('Unknown error', { status: 500 });
    }
}
