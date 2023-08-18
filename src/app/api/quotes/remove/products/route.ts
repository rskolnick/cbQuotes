import { db } from '@/lib/db';

export async function PATCH(req: Request) {
    try {
        // TODO: Make sure we are signed in

        const body = await req.json();
        const { quoteId, productId } = body;

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

        const productOnQuoteExists = await db.productsOnQuote.findUnique({
            where: {
                quoteId_productId: {
                    quoteId,
                    productId,
                },
            },
        });

        if (!productOnQuoteExists) {
            return new Response('Product not on this quote', {
                status: 400,
            });
        }

        if (productOnQuoteExists.quantity <= 1) {
            await db.productsOnQuote.delete({
                where: {
                    quoteId_productId: {
                        quoteId,
                        productId,
                    },
                },
            });
        } else {
            await db.productsOnQuote.update({
                where: {
                    quoteId_productId: {
                        quoteId,
                        productId,
                    },
                },
                data: {
                    quantity: {
                        decrement: 1,
                    },
                },
            });
        }

        return new Response('OK');
    } catch (error) {
        return new Response('Unknown error', { status: 500 });
    }
}
