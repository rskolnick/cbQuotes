import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(
    _req: Request,
    { params }: { params: { quoteId: string; productId: string } }
) {
    try {
        const quoteExists = await db.quote.findUnique({
            where: {
                id: params.quoteId,
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
                    quoteId: params.quoteId,
                    productId: params.productId,
                },
            },
        });

        if (!productOnQuoteExists) {
            return new Response('Product not on this quote', {
                status: 400,
            });
        }

        await db.productsOnQuote.delete({
            where: {
                quoteId_productId: {
                    quoteId: params.quoteId,
                    productId: params.productId,
                },
            },
        });

        return new NextResponse('OK');
    } catch (error) {
        return new Response('Unknown error', { status: 500 });
    }
}
