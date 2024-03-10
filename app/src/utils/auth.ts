import type { NextAuthOptions  } from "next-auth";
// pages/api/auth/[...nextauth].js
import Providers from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials' 
import { authenticate } from '@/actions/authetication'

export const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
            password: { label: "Password", type: "password" }
          },
          authorize: async (credentials) => {
            const { email, password } = credentials as { email: string, password: string };
            const user = await authenticate(email, password);
    
            if (user) {
              return user;
            } else {
              return null;
            }
          }
        })
     ],
     pages: {
        signIn: '/auth/login',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
     },

    
} satisfies NextAuthOptions;