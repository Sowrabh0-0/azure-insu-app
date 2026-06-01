import Link from "next/link";
import { ArrowRight, BadgeCheck, FileText, ShieldCheck, WalletCards } from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Fast policy intake",
    description: "Capture customer and coverage details with clean, guided workflows.",
    icon: FileText,
  },
  {
    title: "Protected access",
    description: "Start with reliable auth screens before backend integration begins.",
    icon: ShieldCheck,
  },
  {
    title: "Claims-ready records",
    description: "Keep account and policy data structured for future insurance modules.",
    icon: WalletCards,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b bg-muted/40">
        <div className="mx-auto flex min-h-[92vh] w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between gap-4">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </span>
              Hermes Insurance
            </Link>
            <nav className="flex items-center gap-2">
              <Button asChild size="sm" variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Register</Link>
              </Button>
            </nav>
          </header>

          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_0.82fr]">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border bg-background px-3 py-1 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-primary" />
                Simple insurance application
              </div>
              <h1 className="text-4xl font-bold tracking-normal text-foreground sm:text-5xl lg:text-6xl">
                Insurance accounts that start clean.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                Hermes gives policyholders a clear entry point to register, sign in, and prepare
                for future policy and claims workflows.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/register">
                    Create account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/login">Sign in</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-5 shadow-sm">
              <div className="rounded-md border bg-background p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm font-medium">Policy snapshot</p>
                    <p className="text-sm text-muted-foreground">Family health cover</p>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-sm font-medium text-emerald-700">
                    Active
                  </span>
                </div>
                <div className="grid gap-3 py-4 sm:grid-cols-2">
                  <div className="rounded-md bg-muted p-4">
                    <p className="text-sm text-muted-foreground">Premium</p>
                    <p className="mt-1 text-2xl font-semibold">Rs. 18,400</p>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <p className="text-sm text-muted-foreground">Coverage</p>
                    <p className="mt-1 text-2xl font-semibold">Rs. 12L</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 rounded-full bg-muted">
                    <div className="h-3 w-3/4 rounded-full bg-primary" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-16 rounded-md border bg-card" />
                    <div className="h-16 rounded-md border bg-card" />
                    <div className="h-16 rounded-md border bg-card" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-lg border bg-card p-5">
            <feature.icon className="h-5 w-5 text-primary" />
            <h2 className="mt-4 text-base font-semibold">{feature.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
