'use client';
import { ColumnDef } from '@tanstack/react-table';
import { buttonVariants } from './ui/button';
import { Ghost } from 'lucide-react';
import Link from 'next/link';

export const columns = [
    {
        accessorKey: 'storeName',
        header: 'Dealer Name',
    },
    {
        accessorKey: 'email',
        header: 'Email Address',
    },
    {
        accessorKey: 'discount',
        header: 'Discount Level',
    },
    {
        accessorKey: '_count.quotes',
        header: 'Quotes',
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }: any) => {
            const dealer = row.original;

            return (
                <Link
                    href={`/dealers/${dealer.id}`}
                    className={buttonVariants()}
                >
                    Edit
                </Link>
            );
        },
    },
];
