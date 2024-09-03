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
import { deleteProduct } from "@/server/actions/product-actions";
import toast from "react-hot-toast";
import { deleteOrder } from "@/server/actions/orders-actions";

const DeleteOrder = ({
  id,
  open,
  onOpenChange,
}: {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const handleDeleteOrder = () => {
    deleteOrder({ id: id });
    toast.success(`Order has been deleted`);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger>
          <Button>Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this order?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={handleDeleteOrder}
              >
                Yes, Delete
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteOrder;