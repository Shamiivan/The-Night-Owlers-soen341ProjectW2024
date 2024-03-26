'use client';
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

export function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState("");
  const router = useRouter();


  // error handling

  // Telephone validation function
  const validatePhone = (phone) => {
    const regex = /^[0-9]+$/; // Basic pattern to check for digits
    return regex.test(phone);
  };

  // Address validation function
  const validateAddress = (address) => {
    return address.length > 0; // Check if address is not empty
  };

  // use effect to display error messages when the user enters invalid data
  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(false);
        setResult("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error]);
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setError(true);
      setResult("Please enter a valid phone number.");
      return;
    }
    if (!validateAddress(address)) {
      setError(true);
      setResult("Please enter a valid address.");
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/users/`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password, address, phone }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setResult("User created successfully");
        // Wait for a short time before redirecting to give the user time to see the success message
        setTimeout(() => {
          setResult("");

          window.location.reload();
        }, 2000);

        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        router.push("/vehicles");
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="relative overflow-hidden bg-gray-100 rounded-t-md dark:bg-gray-800">
        <img
          alt="Image"
          className="object-cover"
          height="320"
          src="/placeholder.svg"
          style={{
            aspectRatio: "1440/170",
            objectFit: "cover",
          }}
          width="1440"
        />
        <div className="inset-0 absolute bg-gradient-to-b from-gray-100 via-gray-100 to-transparent pointer-events-none rounded-t-lg dark:from-gray-800 dark:via-gray-800" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="grid gap-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl/none text-gray-900 dark:text-gray-100">
              Rent the car of your dreams
            </h1>
            <p className="mx-auto max-w-[900px] text-gray-500 dark:text-gray-400">
              Experience luxury on the open road. Sign up now to get started.
            </p>
          </div>
        </div>
      </div>
      <div className="grid max-w-6xl grid-cols-2 mx-auto items-center gap-10 p-6 lg:gap-20">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl/none">Create an account</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link className="underline" href="/signin">
              Sign in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {result && (
            <div
              className={`mb-4 rounded-md p-2 justify-center ${error ? "bg-red-500" : "bg-green-500"}`}
            >
              <p className="italic m-2 text-primary-foreground">{result}</p>
            </div>
          )}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your name"
                  required />
              </div>
              <div className="flex-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"

                required />
            </div>


            <Button className="w-full">Sign up</Button>
          </div>
        </form>
      </div>

    </div>
  )
}
