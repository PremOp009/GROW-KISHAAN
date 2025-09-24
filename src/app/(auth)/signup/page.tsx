'use client';

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignupPage() {
  const [role, setRole] = useState("farmer");

  async function signupAction() {
    "use server";
    // In a real app, you would handle user creation here based on the role.
    // For now, we just redirect to the appropriate page.
    if (role === 'farmer') {
      redirect("/dashboard");
    } else {
      redirect("/");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-12">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            Create an Account
          </CardTitle>
          <CardDescription>
            Join our community as a farmer or a customer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signupAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label>I am a...</Label>
              <RadioGroup
                defaultValue="farmer"
                onValueChange={setRole}
                className="grid grid-cols-2 gap-4"
              >
                <Label
                  htmlFor="farmer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value="farmer" id="farmer" className="sr-only" />
                  Farmer
                </Label>
                <Label
                  htmlFor="customer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem
                    value="customer"
                    id="customer"
                    className="sr-only"
                  />
                  Customer
                </Label>
              </RadioGroup>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Rajesh Kumar" required />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                required
              />
            </div>

            {role === 'customer' && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
              </>
            )}

            {role === 'farmer' && (
                <div className="grid gap-2">
                    <Label htmlFor="otp">One-Time Password (OTP)</Label>
                    <Input id="otp" type="text" placeholder="Enter OTP" required />
                </div>
            )}

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
