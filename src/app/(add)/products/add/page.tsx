'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Separator } from '@radix-ui/react-separator';
import { ChangeEvent, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export default function AddProductsPage() {
    const [productName, setProductName] = useState('');
    const [msrp, setMSRP] = useState('0');

    const router = useRouter();

    const { mutate: createProduct, isLoading } = useMutation({
        mutationFn: async () => {
            const msrpIsNum = /^[0-9.]*$/.test(msrp);

            if (!msrpIsNum) {
                return toast({
                    title: 'MSRP Not a Number',
                    description:
                        'The value you entered for cost contains more than just a number and a period',
                    variant: 'destructive',
                });
            }

            const payload = {
                productName,
                msrp: parseFloat(msrp),
            };

            const { data } = await axios.post('/api/product', payload);

            return data as string;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 409) {
                    return toast({
                        title: 'Product Already Exists',
                        description: 'Product is already in the database!',
                        variant: 'destructive',
                    });
                }

                if (err.response?.status === 422) {
                    return toast({
                        title: 'Invalid Form Data',
                        description: 'Is your MSRP a number?',
                        variant: 'destructive',
                    });
                }

                // TODO: Write logic for if user is not logged in
            }
            toast({
                title: 'Error Creating Product',
                description: 'Unknown error, try again later',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            router.push('/products');
            router.refresh();
        },
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-blue-300 text-slate-800/90 w-[500px] rounded-xl">
                <CardHeader>
                    <CardTitle className="flex text-3xl justify-center">
                        Create a Product
                    </CardTitle>
                    <CardDescription className="text-slate-500 flex justify-center">
                        Add a new product, then add parts to it.
                    </CardDescription>
                </CardHeader>
                <div className="flex justify-center">
                    <Separator className="bg-slate-500 w-3/4" />
                </div>
                <CardContent className="pt-8">
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="productName"
                                    className="text-md font-semibold"
                                >
                                    Product Name
                                </Label>
                                <Input
                                    id="productName"
                                    placeholder="Name of Product"
                                    value={productName}
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
                                ></Input>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="msrp"
                                    className="text-md font-semibold"
                                >
                                    Product MSRP
                                </Label>

                                <Input
                                    id="msrp"
                                    placeholder="MSRP of Product"
                                    value={msrp}
                                    onChange={(e) => setMSRP(e.target.value)}
                                ></Input>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        isLoading={isLoading}
                        className="w-full text-xl"
                        onClick={() => {
                            createProduct();
                        }}
                    >
                        Add Product
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
