"use client";
import { Session } from "next-auth";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
  FormField,
} from "../ui/form";
import { Card } from "../ui/card";
import { useForm } from "react-hook-form";
import { OnboardingSchema } from "@/types/onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userAgent } from "next/server";
import { Input } from "../ui/input";
import Image from "next/image";
import { UploadDropzone } from "@/app/api/uploadthing/upload";
import { useState } from "react";
import FormError from "./form-error";
import { Button } from "../ui/button";
import { useRouter, redirect } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { Onboarding } from "@/server/actions/onboarding";

type OnboardingProps = {
  session: Session;
};

const OnboardingForm = (session: OnboardingProps) => {
  const user = session.session.user;
  const router = useRouter();
  const [imageUploading, setImageUploading] =
    useState(false);
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      image: "",
      location: "",
    },
  });

  if (user?.image !== "no-image") {
    redirect("/");
  }

  const { execute, status } = useAction(Onboarding, {
    onSuccess(data) {
      if (data.data?.error) {
        setError(data.data.error);
      } else {
        setError("");
      }
    },
  });

  const onSubmit = (
    values: z.infer<typeof OnboardingSchema>
  ) => {
    execute(values);
    setError("");
    if (status === "hasSucceeded") {
      router.replace("/");
    }
  };
  return (
    <Card className="p-6">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex justify-center flex-col items-center gap-2">
            <h1>Hey {user?.name}</h1>
            <span className="text-sm text-center flex justify-center mb-5">
              We need a little bit more information.
            </span>
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Please Provide Location:
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Albany, NY"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload an Image:</FormLabel>
                <div className="flex gap-4 sm:flex-row flex-col justify-center items-center">
                  {!form.getValues("image") && (
                    <Image
                      src="/fallbackimage.png"
                      width={125}
                      height={125}
                      alt="fallbackimage"
                      className="max-sm:mt-3 bg-tertiary"
                    />
                  )}
                  {form.getValues("image") && (
                    <Image
                      src={form.getValues("image")!}
                      width={125}
                      height={125}
                      className="rounded-full"
                      alt="User Image"
                    />
                  )}
                  <UploadDropzone
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <Button
            type="submit"
            disabled={
              status === "executing" || imageUploading
            }
          >
            Go to dashboard
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default OnboardingForm;
