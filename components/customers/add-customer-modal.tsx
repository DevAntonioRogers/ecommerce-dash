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
import { CustomersSchema } from "@/types/customer-schema";
import { addCustomer } from "@/server/actions/customer-actions";
import { useRef } from "react";

const AddCustomerModal = () => {
  const [imageUploading, setImageUploading] =
    useState(false);
  const form = useForm<z.infer<typeof CustomersSchema>>({
    resolver: zodResolver(CustomersSchema),
    defaultValues: {
      image: "",
      name: "",
      orders: 0,
    },
  });

  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const { execute, status } = useAction(addCustomer, {
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
    values: z.infer<typeof CustomersSchema>
  ) => {
    execute(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Customer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Change Image:</FormLabel>
                  <div className="flex sm:flex-row flex-col justify-center items-center gap-10">
                    {!form.getValues("image") && (
                      <Image
                        src="/fallbackimage.png"
                        width={120}
                        height={125}
                        alt="fallbackimage"
                        className="w-full h-[125px] object-contain max-sm:mt-3 bg-tertiary sm:mr-auto"
                      />
                    )}
                    {form.getValues("image") && (
                      <Image
                        src={form.getValues("image")!}
                        width={125}
                        height={125}
                        className="w-full h-[125px] object-contain max-sm:mt-3 bg-tertiary sm:mr-auto"
                        alt="User Image"
                      />
                    )}
                    <UploadButton
                      className="h-20 ut-button:ring-primary  ut-label:bg-red-50  ut-button:bg-primary  hover:ut-button:bg-primary/50 ut:button:transition-all ut-button:duration-500  ut-label:hidden ut-allowed-content:hidden"
                      endpoint="imageUploader"
                      onUploadBegin={() => {
                        setImageUploading(true);
                      }}
                      onUploadError={(error) => {
                        form.setError("image", {
                          type: "validate",
                          message: error.message,
                        });
                        return;
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue("image", res[0].url!);
                        setImageUploading(false);
                        return;
                      }}
                    />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="User Image"
                      type="hidden"
                      disabled={status === "executing"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
              name="orders"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orders</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Revenue"
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
                  disabled={
                    status === "executing" || imageUploading
                  }
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={
                  status === "executing" || imageUploading
                }
              >
                Add Customer
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

export default AddCustomerModal;
