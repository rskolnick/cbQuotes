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

export default function AddPartsPage() {
    const [partName, setPartName] = useState('');
    const [cost, setCost] = useState('0');
    const [hasColor, setHasColor] = useState(false);

    const router = useRouter();

    const { mutate: createPart, isLoading } = useMutation({
        mutationFn: async () => {
            const costIsNum = /^[0-9.]*$/.test(cost);

            if (!costIsNum) {
                return toast({
                    title: 'Cost Not a Number',
                    description:
                        'The value you entered for cost contains more than just a number and a period',
                    variant: 'destructive',
                });
            }

            const payload = {
                partName,
                cost: parseInt(cost),
                hasColor,
            };

            const { data } = await axios.post('/api/part', payload);

            return data as string;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 409) {
                    return toast({
                        title: 'Part Already Exists',
                        description: 'Part is already in the database!',
                        variant: 'destructive',
                    });
                }

                if (err.response?.status === 422) {
                    return toast({
                        title: 'Invalid Form Data',
                        description: 'Is your cost a number?',
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
            router.push('/parts');
            router.refresh();
        },
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-blue-300 text-slate-800/90 w-[500px] rounded-xl">
                <CardHeader>
                    <CardTitle className="flex text-3xl justify-center">
                        Create a Part
                    </CardTitle>
                    <CardDescription className="text-slate-500 flex justify-center">
                        Add a new part.
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
                                    htmlFor="partName"
                                    className="text-md font-semibold"
                                >
                                    Part Name
                                </Label>
                                <Input
                                    id="partName"
                                    placeholder="Name of Part"
                                    value={partName}
                                    onChange={(e) =>
                                        setPartName(e.target.value)
                                    }
                                ></Input>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="cost"
                                    className="text-md font-semibold"
                                >
                                    Part Cost
                                </Label>

                                <Input
                                    id="cost"
                                    placeholder="Cost of Part"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                ></Input>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="hasColor"
                                    className="text-md font-semibold"
                                >
                                    Color?
                                </Label>
                                <Checkbox
                                    className="bg-white"
                                    onClick={() => {
                                        if (hasColor === true) {
                                            setHasColor(false);
                                        }
                                        if (hasColor === false) {
                                            setHasColor(true);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        isLoading={isLoading}
                        className="w-full text-xl"
                        onClick={() => {
                            createPart();
                        }}
                    >
                        Add Part
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
