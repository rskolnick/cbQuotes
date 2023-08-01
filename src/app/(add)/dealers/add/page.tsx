'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ChangeEvent, useState } from 'react';

export default function AddDealerPage() {
    const [storeName, setStoreName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [discount, setDiscount] = useState('0.5');

    const router = useRouter();

    const { mutate: createDealer, isLoading } = useMutation({
        mutationFn: async () => {
            const discountIsNum = /^[0-9.]*$/.test(discount);

            if (!discountIsNum) {
                return toast({
                    title: 'Discount Not a Number',
                    description:
                        'The value you entered for discount contains more than just a number and a period',
                    variant: 'destructive',
                });
            }

            const payload = {
                storeName,
                address,
                email,
                discount: parseFloat(discount),
            };

            const { data } = await axios.post('/api/dealer', payload);

            return data as string;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 409) {
                    return toast({
                        title: 'Dealer Already Exists',
                        description: 'Dealer is already in the database!',
                        variant: 'destructive',
                    });
                }

                if (err.response?.status === 422) {
                    return toast({
                        title: 'Invalid Form Data',
                        description: 'Is your dealer discount a number?',
                        variant: 'destructive',
                    });
                }

                // TODO: Write logic for if user is not logged in
            }
            toast({
                title: 'Error Creating Dealer',
                description: 'Unknown error, try again later',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            router.push('/dealers');
            router.refresh();
        },
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-blue-300 text-slate-800/90 w-[500px] rounded-xl">
                <CardHeader>
                    <CardTitle className="flex text-3xl justify-center">
                        Add a Dealer
                    </CardTitle>
                    <CardDescription className="text-slate-500 flex justify-center">
                        Add a new dealer before entering a quote
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
                                    htmlFor="storeName"
                                    className="text-md font-semibold"
                                >
                                    Store Name
                                </Label>
                                <Input
                                    id="storeName"
                                    placeholder="Name of Dealer"
                                    value={storeName}
                                    onChange={(e) =>
                                        setStoreName(e.target.value)
                                    }
                                ></Input>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="address"
                                    className="text-md font-semibold"
                                >
                                    Address
                                </Label>
                                <Input
                                    id="address"
                                    placeholder="Main Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                ></Input>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="email"
                                    className="text-md font-semibold"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Input>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="discount"
                                    className="text-md font-semibold"
                                >
                                    Dealer Discount
                                </Label>
                                <Input
                                    id="discount"
                                    value={discount}
                                    onChange={(e) =>
                                        setDiscount(e.target.value)
                                    }
                                ></Input>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    {/* TODO: set up onClick to send form info to API point /api/dealer */}
                    <Button
                        isLoading={isLoading}
                        className="w-full text-xl"
                        onClick={() => {
                            createDealer();
                        }}
                    >
                        Create Dealer
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
