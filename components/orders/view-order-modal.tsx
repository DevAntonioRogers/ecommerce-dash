"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { OrderSchema } from "@/types/orders-schema";
import { z } from "zod";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";

const ViewOrderModal = ({
  open,
  onOpenChange,
  order,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: z.infer<typeof OrderSchema>;
}) => {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full flex flex-col justify-center items-center gap-8">
          <DialogHeader>
            <DialogTitle>
              Order Number: #{order.orderNumber}
            </DialogTitle>
            <DialogDescription>
              Below are the order details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <p>
              <span className="font-bold text-primary">
                Customer Name:
              </span>{" "}
              {order.customerName}
            </p>
            <p>
              <span className="font-bold text-primary">
                Customer Address:
              </span>{" "}
              {order.address}
            </p>
            <p>
              <span className="font-bold text-primary">
                Order Date:
              </span>{" "}
              {formatDate(order.date as Date)}
            </p>
            <p>
              <span className="font-bold text-primary">
                Order Price:
              </span>{" "}
              {formatPrice(order.totalAmount)}
            </p>
          </div>
          <DialogClose asChild className="w-full">
            <Button className="w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewOrderModal;
