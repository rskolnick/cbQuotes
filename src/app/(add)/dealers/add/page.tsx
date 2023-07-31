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

export default function AddDealerPage() {
    const router = useRouter();
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
                                    className="bg-slate-200 rounded-[8px] placeholder:text-slate-500"
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
                                    className="bg-slate-200 rounded-[8px] placeholder:text-slate-500"
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
                                    className="bg-slate-200 rounded-[8px] placeholder:text-slate-500"
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
                                    defaultValue={0.5}
                                    className="bg-slate-200 rounded-[8px] placeholder:text-slate-500"
                                ></Input>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    {/* TODO: set up onClick to send form info to API point /api/dealer */}
                    <Button
                        className="bg-slate-800 rounded-[8px] w-full text-lg text-slate-100 py-6 hover:bg-slate-800/80"
                        onClick={() => {
                            return toast({
                                title: 'Cannot post at this time',
                                description: 'Please try again later.',
                                variant: 'destructive',
                            });
                        }}
                    >
                        Create Dealer
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
