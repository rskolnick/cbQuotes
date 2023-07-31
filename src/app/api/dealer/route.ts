import { db } from '@/lib/db';
import { DealerPostValidator } from '@/lib/validators/post';
import { z } from 'zod';

export function GET() {}

export async function POST(req: Request) {
    try {
        // TODO: check if poster is logged in, if not throw error
        const body = await req.json();
        const { storeName, address, email, discount } =
            DealerPostValidator.parse(body);
        const dealerExists = await db.dealer.findFirst({
            where: {
                storeName,
            },
        });

        if (dealerExists) {
            return new Response('Dealer already exists in database', {
                status: 400,
            });
        }

        await db.dealer.create({
            data: {
                storeName,
                address,
                email,
                discount,
            },
        });

        return new Response('OK');
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 });
        }
        return new Response('Could not submit the dealer. Try again later.', {
            status: 500,
        });
    }
}
