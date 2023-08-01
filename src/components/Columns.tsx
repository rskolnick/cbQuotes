'use client';
import { ColumnDef } from '@tanstack/react-table';

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
];
