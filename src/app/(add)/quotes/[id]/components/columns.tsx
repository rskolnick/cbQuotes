"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
	id: string;
	productName: string;
	msrp: number;
};

export const columns: ColumnDef<Products>[] = [
	{
		accessorKey: "productName",
		header: "Product Name",
	},
	{
		accessorKey: "msrp",
		header: "MSRP",
	},
];
