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

export default function SignupPage() {
  async function signupAction() {
    "use server";
    // In a real app, you would handle user creation here.
    // For now, we just redirect to the dashboard.
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            Farmer Sign Up
          </CardTitle>
          <CardDescription>
            Create your account to start listing your crops.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signupAction} className="grid gap-4">
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
            <div className="grid gap-2">
              <Label htmlFor="otp">One-Time Password (OTP)</Label>
              <Input id="otp" type="text" placeholder="Enter OTP" required />
            </div>
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
