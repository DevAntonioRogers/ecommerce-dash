"use client";

import { RegisterSchema } from "@/types/register-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AuthCard from "./auth-card";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { RegisterAccount } from "@/server/actions/register";
import FormError from "./form-error";
import Logo from "../navigation/logo";

export default function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  const [error, setError] = useState("");
  const [registerSuccess, setRegisterSuccess] =
    useState(false);

  const { execute } = useAction(RegisterAccount, {
    onSuccess(data) {
      if (data.data?.error) {
        setError(data.data.error);
      } else {
        setRegisterSuccess(true);
      }
    },
  });

  const onSubmit = (
    values: z.infer<typeof RegisterSchema>
  ) => {
    execute(values);
    setError("");
  };

  return (
    <>
      {registerSuccess ? (
        <div className="flex flex-col gap-8 justify-center items-start text-center">
          <div className="self-center">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold w-full">
            Thanks for your registration 👍
          </h1>
          <div className="flex flex-col gap-1">
            <span>
              You will be notified by email once your
              account is ready
            </span>
            <span>
              Please allow 2-3 business days for response
            </span>
          </div>
          <Button
            size={"sm"}
            variant={"link"}
            className="mb-5 self-center"
            onClick={() => setRegisterSuccess(false)}
          >
            Go back to registation
          </Button>
        </div>
      ) : (
        <AuthCard
          title="Register for an account"
          backButtonHref="/login"
          backButtonLabel="Already have an account?"
        >
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="DevAntonioRogers"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="JohnDoe@gmail.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="**********"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormError message={error} />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-6"
                >
                  Register
                </Button>
              </form>
            </Form>
          </div>
        </AuthCard>
      )}
    </>
  );
}
