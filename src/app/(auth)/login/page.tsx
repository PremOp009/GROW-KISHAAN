import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  async function loginAction() {
    "use server";
    // In a real app, you would handle authentication here.
    // For now, we just redirect to the dashboard.
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                required
                defaultValue="+919876543210"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="otp">One-Time Password (OTP)</Label>
              <Input id="otp" type="text" placeholder="123456" required defaultValue="123456" />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Not a member yet?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
