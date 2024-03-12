'use client'
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { set } from 'mongoose';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [result, setResult] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
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
    }
  };

  return (
    
    <div className="flex items-center justify-center bg-blue-100">
    <div className="flex flex-col md:flex-row w-full md:max-w-screen-xl">
      <div className="w-full md:w-1/2 p-8">
        <div className="bg-white shadow-md rounded px-8 py-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Have an Account?</h2>
          <p className="text-gray-700 text-center mb-4">
            Sign in to access your account and explore cars!
          </p>
          
        </div>
      </div>
      <div className="flex-grow w-full md:w-1/2  shadow-md rounded px-8 py-6 ml-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Login to your Profile</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {result && (
            <div className={`mb-4 rounded-md p-2 justify-center ${error ? 'bg-red-500' : 'bg-green-500'}`}>
              <p className="italic m-2 text-primary-foreground">{result}</p>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-700">
              Email
            </label>
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
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-bold mb-2 text-gray-700">
              Password
            </label>
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
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  
  
  
  );
}
