"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession, signIn } from "next-auth/react";
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from "react-dom";
import { autheticateUser } from "@/actions/authetication"
import Link from 'next/link';
import { toast } from "react-toastify";


const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Submit
    </Button>
  );
}


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function UserAuthForm({ className }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) router.push("/");
  }, [session, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async ({ email, password } : any) => {
    try {
      console.log("Are  even getting here?");
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log("Are  even getting here?");
      console.log(result);
      if (result?.error) toast.error(result.error);
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
console.log(res);
      if (!res) {
        setError("Invalid Credentials");
        return;
      }

  

      // router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={handleLogin}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>

          < div className="grid gap-1" >
            <Label className="sr-only" htmlFor="password" >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <SubmitButton />

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or <Button asChild variant="link">
              <Link href="/signup"> Sign Up</Link>
            </Button>
          </span>
        </div>
      </div>
      {/* <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
      <p className="text-center text-muted-foreground">
      </p>

    </div>

  )
}
