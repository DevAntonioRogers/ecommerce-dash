"use client";

import { LoginSchema } from "@/types/login-schema";
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
import FormError from "./form-error";
import { LoginAccount } from "@/server/actions/login";

export default function LoginForm() {
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute } = useAction(LoginAccount, {
    onSuccess(data) {
      if (data.data?.error) {
        setError(data.data.error);
      }
    },
  });

  const onSubmit = (
    values: z.infer<typeof LoginSchema>
  ) => {
    execute(values);
    setError("");
  };

  return (
    <>
      <AuthCard
        title="Welcome Back!"
        backButtonHref="/register"
        backButtonLabel="Create a new account"
      >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Email"
                          type="email"
                          autoComplete="email"
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
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
              </div>
              <Button type="submit" className="w-full mt-6">
                Log In
              </Button>
            </form>
          </Form>
        </div>
      </AuthCard>
    </>
  );
}
