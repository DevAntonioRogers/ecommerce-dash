"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ProductSchema } from "@/types/product.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { UploadButton } from "@/app/api/uploadthing/upload";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import {
  addProduct,
  editProduct,
} from "@/server/actions/product-actions";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "../ui/input";
import { useRef } from "react";

const EditProduct = ({
  id,
  open,
  onOpenChange,
}: {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      id: id,
      image: "",
      name: "",
      revenue: 0,
      price: 0,
    },
  });

  const [imageUploading, setImageUploading] =
    useState(false);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const { execute, status } = useAction(editProduct, {
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
    values: z.infer<typeof ProductSchema>
  ) => {
    execute(values);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
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
                        src={"/fallbackimage.png"}
                        width={120}
                        height={120}
                        alt="image of product"
                        className="w-full h-[125px] object-contain max-sm:mt-3 bg-tertiary sm:mr-auto"
                      />
                    )}
                    {form.getValues("image") && (
                      <Image
                        src={form.getValues("image")!}
                        width={125}
                        height={125}
                        className="w-full h-[125px] object-contain max-sm:mt-3 bg-tertiary sm:mr-auto"
                        alt="product image"
                      />
                    )}
                    <UploadButton
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
                      {...field}
                      placeholder="Product Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="revenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Revenue</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Revenue"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Price"
                      type="text"
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
                Save Product
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

export default EditProduct;
