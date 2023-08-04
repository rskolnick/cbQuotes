import { z } from 'zod';
import { ProductPostValidator } from '@/lib/validators/post';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        // TODO: check if poster is logged in, if not throw error
        const body = await req.json();
        const { productName, msrp } = ProductPostValidator.parse(body);
        const productExists = await db.product.findFirst({
            where: {
                productName,
            },
        });

        if (productExists) {
            return new Response('Product already exists in database', {
                status: 409,
            });
        }

        await db.product.create({
            data: {
                productName,
                msrp,
            },
        });

        return new Response('OK');
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 });
        }
        return new Response('Could not submit the product. Try again later.', {
            status: 500,
        });
    }
}
