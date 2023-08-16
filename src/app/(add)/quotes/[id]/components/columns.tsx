"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
	id: string;
	productName: string;
	msrp: number;
};

export const columns: ColumnDef<Products>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "productName",
		header: "Product Name",
	},
	{
		accessorKey: "msrp",
		header: () => <div className='text-right'>MSRP</div>,
		cell: ({ row }) => {
			const msrp = parseFloat(row.getValue("msrp"));
			const formattedMsrp = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(msrp);

			return (
				<div className='text-right font-medium'>{formattedMsrp}</div>
			);
		},
	},
];
