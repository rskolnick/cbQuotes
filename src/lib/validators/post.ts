import { z } from 'zod';

export const DealerPostValidator = z.object({
    storeName: z
        .string()
        .min(3, { message: 'Store name must be longer than 3 characters' })
        .max(128, {
            message: 'Store name cannot be longer than 128 characters',
        }),
    address: z
        .string()
        .min(3, { message: 'Address must be longer than 3 characters' })
        .max(128, { message: 'Address cannot be longer than 128 characters' }),
    email: z
        .string()
        .min(3, { message: 'Email must be longer than 3 characters' })
        .email({ message: 'Not a valid email address' }),
    discount: z
        .number()
        .nonnegative({ message: 'Discount cannot be negative' }),
});