'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export const AddButton = ({ productId }: { productId: string }) => {
    const router = useRouter();
    const params = useParams();

    const { mutate: addProdFromQuote } = useMutation({
        mutationFn: async () => {
            const payload = {
                quoteId: params.id,
                productId,
            };

            console.log(payload.quoteId);

            const { data } = await axios.patch(
                '/api/quotes/add/product',
                payload
            );
            return data as string;
        },
        onError: (err) => {
            toast({
                title: 'Oops!',
                description: `${err}`,
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            router.refresh();
            toast({
                title: 'Success!',
                description: 'Successfully added the product',
            });
        },
    });

    return (
        <Button className="my-2" size="sm" onClick={() => addProdFromQuote()}>
            <Plus className="h-4" size="icon" />
        </Button>
    );
};
