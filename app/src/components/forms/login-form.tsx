import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState("");
  const router = useRouter();

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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log(result);
    if (result?.error) {
      setError(true);
      setResult("Invalid Credentials");
    } else {
      // Redirect to the dashboard or home page after successful login
      console.log(result);
      setError(false);
      setResult("Sign in successful");

      router.push("/vehicles");
    }
  };
  return (
    <div className="flex items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl text-center font-bold">Login</h1>
          <p className="text-gray-700 text-center mb-4">
                Sign in to access your account and explore cars!
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
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <input
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link className="ml-auto inline-block text-sm underline" href="#">
                Forgot your password?
              </Link>
            </div>
            <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
          <Button className="w-full" variant="outline">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline" href="/signup">
            Sign up
          </Link>
        </div>
        </form>
      </div>
    </div>
  )
}
