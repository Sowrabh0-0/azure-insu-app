"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast-provider";
import { authApi } from "@/lib/api";
import { type RegisterInput, registerSchema } from "@/lib/validation/auth";

export function RegisterForm() {
  const { toast } = useToast();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterInput) {
    try {
      await authApi.register(values);
      toast({
        title: "Account created",
        description: "You can now sign in with your credentials.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Registration is not connected yet",
        description:
          error instanceof Error ? error.message : "Please try again once the API is available.",
        variant: "error",
      });
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          aria-invalid={Boolean(errors.name)}
          autoComplete="name"
          id="name"
          placeholder="Aarav Sharma"
          {...register("name")}
        />
        {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          id="email"
          placeholder="you@example.com"
          type="email"
          {...register("email")}
        />
        {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          aria-invalid={Boolean(errors.password)}
          autoComplete="new-password"
          id="password"
          placeholder="Create a secure password"
          type="password"
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Use 8+ characters with uppercase, lowercase, and a number.
          </p>
        )}
      </div>
      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Create account
        <ArrowRight className="h-4 w-4" />
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/login">
          Sign in
        </Link>
      </p>
    </form>
  );
}
