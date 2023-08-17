import { db } from '@/lib/db';

export async function PATCH(req: Request) {
    try {
        // TODO: Make sure we are signed in

        const body = await req.json();
        const { quoteId } = body[0];

        const quoteExists = await db.quote.findUnique({
            where: {
                id: quoteId,
            },
        });

        if (!quoteExists) {
            return new Response('Quote not found', {
                status: 400,
            });
        }

        body.slice(1).map(async (item: any) => {
            await db.productsOnQuote.upsert({
                where: {
                    quoteId_productId: {
                        quoteId,
                        productId: item.id,
                    },
                },
                update: {
                    quantity: {
                        increment: 1,
                    },
                },
                create: {
                    quoteId,
                    productId: item.id,
                    quantity: 1,
                },
            });
        });

        return new Response('OK');
    } catch (error) {
        return new Response('Unknown error', { status: 500 });
    }
}
