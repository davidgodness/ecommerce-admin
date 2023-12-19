"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  products: string;
  phone: string;
  address: string;
  totalPrice: string;
  paid: boolean;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "paid",
    header: "Paid",
    cell: ({ row }) => (row.original.paid ? "YES" : "NO"),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
