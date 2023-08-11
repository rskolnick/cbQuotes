import { db } from '@/lib/db';
import { z } from 'zod';

export async function PATCH(req: Request) {
    try {
        // TODO: check if poster is logged in, if not throw error

        const body = await req.json();

        const { partId, productId } = body;

        // console.log(productId);

        const productPartExists = await db.product.findFirst({
            where: {
                id: productId,
                parts: {
                    some: {
                        id: partId,
                    },
                },
            },
        });

        if (!productPartExists) {
            return new Response('Part does not exist on product', {
                status: 401,
            });
        }

        // console.log(productPartExists);

        await db.product.update({
            where: {
                id: productId,
            },
            data: {
                parts: {
                    disconnect: { id: partId },
                },
            },
            include: {
                parts: true,
            },
        });

        return new Response('Okay');
    } catch (error) {
        return new Response('Could not update the product. Try again later.', {
            status: 500,
        });
    }
}

export async function POST(req: Request) {
    try {
        // TODO: check if poster is logged in, if not throw error
        const body = await req.json();

        const { partId, productId } = body;

        const productPartExists = await db.product.findFirst({
            where: {
                id: productId,
                parts: {
                    some: {
                        id: partId,
                    },
                },
            },
        });

        if (productPartExists) {
            return new Response('Part exists on product already', {
                status: 409,
            });
        }

        await db.product.update({
            where: {
                id: productId,
            },
            data: {
                parts: {
                    connect: {
                        id: partId,
                    },
                },
            },
        });

        return new Response('Okay');
    } catch (error) {
        return new Response('Could not update the product. Try again later.', {
            status: 500,
        });
    }
}
