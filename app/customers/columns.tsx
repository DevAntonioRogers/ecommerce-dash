"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { z } from "zod";
import { CustomersSchema } from "@/types/customer-schema";
import { useState } from "react";
import DeleteCustomerModal from "@/components/customers/delete-customer-modal";

// export type Customers = {
//   id: string;
//   name: string;
//   email: string;
//   orders: number;
//   image: string;
// };

export const columns: ColumnDef<
  z.infer<typeof CustomersSchema>
>[] = [
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
  {
    id: "actions",
    cell: ({ row }) => {
      const [openDeletemodal, setOpenDeleteModal] =
        useState(false);
      const customers = row.original;
      const customerId = customers.id;

      if (!customerId) {
        return;
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setOpenDeleteModal(true)}
              >
                Delete Customer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden">
            <DeleteCustomerModal
              id={customerId}
              open={openDeletemodal}
              onOpenChange={setOpenDeleteModal}
            />
          </div>
        </>
      );
    },
  },
];
