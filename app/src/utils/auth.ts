import type { NextAuthOptions  } from "next-auth";
// pages/api/auth/[...nextauth].js
import Providers from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials' 
import { authenticate } from '@/actions/authetication'
import User, { IUser } from "@/models/User";
import printError from "@/utils/print";

export const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
            password: { label: "Passwords", type: "password" }
          },
          authorize: async (credentials, req) => {
            const { email, password } = credentials as { email: string, password: string };
            const user = await User?.findOne({ email : email });
            
            

            if(!user || user.password !== password) { 
            printError("Invalid credentials");
            return null;}

            const res = { id : user?._id, firstName: user?.firstName, lastName: user?.lastName, email: user?.email, role: user?.role}
            console.log(res);
            return res

          }
        })
     ],
     pages: {
        signIn: '/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
     },
     secret: process.env.NEXTAUTH_SECRET,


    
} satisfies NextAuthOptions;