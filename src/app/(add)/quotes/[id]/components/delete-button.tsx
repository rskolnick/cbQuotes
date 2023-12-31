'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Minus, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export const DeleteButton = ({ productId }: { productId: string }) => {
    const router = useRouter();
    const params = useParams();

    const { mutate: deleteProdFromQuote } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.delete(
                `/api/quotes/remove/${params.id}/${productId}`
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
                description: 'Successfully removed the product',
            });
        },
    });

    return (
        <Button
            variant="destructive"
            className="bg-red-600 my-2"
            size="sm"
            onClick={() => deleteProdFromQuote()}
        >
            <Trash className="h-4" size="icon" />
        </Button>
    );
};
