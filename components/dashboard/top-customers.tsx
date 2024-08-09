"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTable } from "../ui/data-table";
import AnalyticsCard from "./analytics-card";

type TopCustomerProps = {
  data: Customers[];
};

export type Customers = {
  id: string;
  name: string;
  email: string;
  orders: number;
  image: string;
};

export const topCustomerColumns: ColumnDef<Customers>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "orders",
    header: "Orders",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;

      return (
        <Image
          src={imageUrl}
          width={50}
          height={50}
          alt={`Product Image`}
          className="border-2 border-primary"
        />
      );
    },
  },
];

export const TopCustomers = ({
  data,
}: TopCustomerProps) => {
  return (
    <AnalyticsCard
      title="Top Customers"
      subTitle="Showing customers with most orders"
    >
      <DataTable columns={topCustomerColumns} data={data} />
    </AnalyticsCard>
  );
};
