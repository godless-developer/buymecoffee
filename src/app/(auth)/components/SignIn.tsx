"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputForm } from "../components/InputForm";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";

const formSchema = z.object({
  email: z.string().email().min(12, {
    message: "Email must be at least 12 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const SignIn = () => {
  const { login, error, loading, clearError } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await login(values.email, values.password);
  }

  return (
    <div className="w-full md:min-h-screen flex justify-center items-center px-4 sm:px-8">
      <Link href="/sign-up" className="absolute top-6 right-6 sm:right-20">
        <Button variant="outline">Sign up</Button>
      </Link>
      <div className="w-full max-w-md sm:max-w-lg px-4 py-6 sm:px-6 shadow-md rounded-md bg-white">
        <h3 className="text-2xl sm:text-3xl mb-6 font-bold text-center">
          Welcome back
        </h3>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InputForm
              name="email"
              placeholder="Enter email here"
              label="Email"
              form={form}
              type="email"
              onChange={() => error && clearError()}
            />
            <InputForm
              name="password"
              label="Password"
              placeholder="Enter password here"
              form={form}
              type="password"
              onChange={() => error && clearError()}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
