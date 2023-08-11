'use client';

import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from './ui/command';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type Option = {
    id: string;
    storeName: string;
};

export const SelectSearch = ({ ...props }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const { options } = props;
    const router = useRouter();

    const { mutate: createQuote, isLoading } = useMutation({
        mutationFn: async () => {
            const id = options.find(
                (option: Option) =>
                    name.toUpperCase() === option.storeName.toUpperCase()
            )?.id;

            if (!id) {
                return toast({
                    title: 'Store not found',
                    description: 'Store not found in database',
                    variant: 'destructive',
                });
            }

            const payload = {
                id,
            };

            const { data } = await axios.post('/api/quotes/add', payload);

            return data as string;
        },
        onError: (err) => {
            toast({
                title: 'Error Creating Quote',
                description: 'Unknown error, try again later',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            router.push('/quotes');
            router.refresh();
            toast({
                title: 'Started Quote',
                description: 'You started your quote! Now add some products!',
            });
        },
    });

    return (
        <div className="flex flex-col gap-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between"
                    >
                        {name
                            ? options.find(
                                  (option: Option) =>
                                      option.storeName.toUpperCase() ===
                                      name.toUpperCase()
                              )?.storeName
                            : 'Select framework...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[22rem] sm:w-[30rem]">
                    <Command>
                        <CommandInput placeholder="Search dealers..." />
                        <CommandEmpty>No Dealer Found</CommandEmpty>
                        <CommandGroup>
                            {options.map(
                                (option: { id: string; storeName: string }) => (
                                    <CommandItem
                                        key={option.storeName}
                                        onSelect={(currentName) => {
                                            setName(
                                                currentName === name
                                                    ? ''
                                                    : currentName
                                            );
                                            setOpen(false);
                                            // console.log(name);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                name === option.storeName
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                        {option.storeName}
                                    </CommandItem>
                                )
                            )}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            <Button isLoading={isLoading} onClick={() => createQuote()}>
                Start Quote
            </Button>
        </div>
    );
};
