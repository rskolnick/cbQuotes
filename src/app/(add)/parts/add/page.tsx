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

export default function AddPartsPage() {
    const [partName, setPartName] = useState('');
    const [cost, setCost] = useState('0');
    const [hasColor, setHasColor] = useState(false);
    const [style, setStyle] = useState('NONE');

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-blue-300 text-slate-800/90 w-[500px] rounded-xl">
                <CardHeader>
                    <CardTitle className="flex text-3xl justify-center">
                        Add a Part
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
                                    value={}
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
                                <Input
                                    id="hasColor"
                                    placeholder="No"
                                    value={hasColor}
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
