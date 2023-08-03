import { z } from 'zod';
import { PartPostValidator } from '@/lib/validators/post';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        // TODO: check if poster is logged in, if not throw error
        const body = await req.json();
        const { partName, cost, hasColor } = PartPostValidator.parse(body);
        const partExists = await db.part.findFirst({
            where: {
                name: partName,
            },
        });

        if (partExists) {
            return new Response('Part already exists in database', {
                status: 409,
            });
        }

        await db.part.create({
            data: {
                name: partName,
                cost,
                hasColor,
            },
        });

        return new Response('OK');
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 });
        }
        return new Response('Could not submit the part. Try again later.', {
            status: 500,
        });
    }
}
