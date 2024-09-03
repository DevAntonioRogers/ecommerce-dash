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
import { deleteCustomer } from "@/server/actions/customer-actions";

const DeleteCustomerModal = ({
  id,
  open,
  onOpenChange,
}: {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const handleDeleteCustomer = () => {
    deleteCustomer({ id: id });
    toast.success(`Customer has been deleted`);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger>
          <Button>Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this customer?
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
                onClick={handleDeleteCustomer}
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

export default DeleteCustomerModal;
