"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { z } from "zod";
import { OrderSchema } from "@/types/orders-schema";
import { useState } from "react";
import DeleteOrder from "@/components/orders/delete-order-modal";
import ViewOrderModal from "@/components/orders/view-order-modal";

// export type Orders = {
//   id: string | number;
//   orderNumber: string;
//   totalAmount: number;
//   date: number;
// };

export const columns: ColumnDef<
  z.infer<typeof OrderSchema>
>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const totalAmount = row.getValue(
        "totalAmount"
      ) as number;

      return <>{formatPrice(totalAmount)}</>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const dateTimeStamp = row.getValue("date") as number;
      const dateObject = new Date(dateTimeStamp);
      return (
        <span className="text-nowrap">
          {formatDate(dateObject)}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const orderId = order.id;
      const [viewModalOpen, setViewModalOpen] =
        useState(false);
      const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

      if (!orderId) {
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
                onClick={() => setViewModalOpen(true)}
              >
                View Order Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden">
            <DeleteOrder
              id={orderId}
              open={deleteModalOpen}
              onOpenChange={setDeleteModalOpen}
            />

            <ViewOrderModal
              order={order}
              open={viewModalOpen}
              onOpenChange={setViewModalOpen}
            />
          </div>
        </>
      );
    },
  },
];
