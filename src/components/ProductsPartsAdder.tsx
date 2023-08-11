'use client';

import axios, { AxiosError } from 'axios';

import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type Parts = {
    id: string;
    name: string;
    cost: number;
    products: {
        id: string;
    }[];
};

export function ProductPartsTable({ ...props }) {
    const { productId, partsList } = props;
    const router = useRouter();

    const { mutate: editParts, isLoading } = useMutation({
        mutationFn: async (variables: { action: string; partId: string }) => {
            const payload = {
                partId: variables.partId,
                productId,
            };

            console.log(payload);

            if (variables.action === 'remove') {
                const { data } = await axios.patch(
                    '/api/product/parts',
                    payload
                );

                return data as string;
            }

            const { data } = await axios.post('/api/product/parts', payload);

            return data as string;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 409) {
                    if (err.response?.status === 409) {
                        return toast({
                            title: 'Edit Existing Product',
                            description:
                                'You are trying to edit a product that does not exist.',
                            variant: 'destructive',
                        });
                    }
                }

                return toast({
                    title: 'Error updating product',
                    description: 'Error occured while updating product',
                    variant: 'destructive',
                });
            }
        },
        onSuccess: () => {
            router.refresh();
            toast({
                title: 'Success!',
                description: 'Successfully updated product!',
                variant: 'default',
            });
        },
    });

    return (
        <div className="pt-4">
            {partsList.map((part: Parts) => (
                <div key={part.id}>
                    <div className="flex gap-4 items-center">
                        {part.products.length > 0 ? (
                            <div className="w-full">
                                {part.products.map((product) => (
                                    <div key={product.id}>
                                        <div
                                            className={cn(
                                                'flex items-center gap-4 justify-between',
                                                product.id === productId
                                                    ? ''
                                                    : 'text-slate-400'
                                            )}
                                        >
                                            <p>{part.name}</p>
                                            <p>${part.cost}</p>
                                            {product.id === productId ? (
                                                <Button
                                                    isLoading={isLoading}
                                                    variant="destructive"
                                                    className="bg-red-600 hover:bg-red-500"
                                                    onClick={() =>
                                                        editParts({
                                                            action: 'remove',
                                                            partId: part.id,
                                                        })
                                                    }
                                                >
                                                    Remove Part
                                                </Button>
                                            ) : (
                                                <Button
                                                    isLoading={isLoading}
                                                    onClick={() =>
                                                        editParts({
                                                            action: 'add',
                                                            partId: part.id,
                                                        })
                                                    }
                                                >
                                                    Add Part
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between w-full gap-4 text-slate-400">
                                <p>{part.name}</p>
                                <p>${part.cost}</p>
                                <Button
                                    isLoading={isLoading}
                                    onClick={() =>
                                        editParts({
                                            action: 'add',
                                            partId: part.id,
                                        })
                                    }
                                >
                                    Add Part
                                </Button>
                            </div>
                        )}
                    </div>
                    <Separator className="my-2" />
                </div>
            ))}
        </div>
    );
}
