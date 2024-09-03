"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import Image from "next/image";
import { UploadButton } from "@/app/api/uploadthing/upload";
import { useState } from "react";
import { OrderSchema } from "@/types/orders-schema";
import { addOrder } from "@/server/actions/orders-actions";
import { useRef } from "react";

const AddOrder = () => {
  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      customerName: "",
      address: "",
      orderNumber: 0,
      totalAmount: 0,
    },
  });
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const { execute, status } = useAction(addOrder, {
    onSuccess(data) {
      if (data.data?.success) {
        toast.success(data.data.success);
        form.reset();
        dialogCloseRef.current?.click();
      } else if (data.data?.error) {
        toast.error(data.data.error);
      }
    },
  });

  const onSubmit = (
    values: z.infer<typeof OrderSchema>
  ) => {
    execute(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="123 Dev Way"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Ammount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1234"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1900"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  disabled={status === "executing"}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={status === "executing"}
              >
                Create Order
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="hidden"
                  ref={dialogCloseRef}
                >
                  Hidden Close
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrder;
