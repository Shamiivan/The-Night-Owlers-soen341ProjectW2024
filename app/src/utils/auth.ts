// pages/api/auth/[...nextauth].js
import Providers from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticate } from "@/actions/authetication";
import User from "@/models/user";
import printError from "@/utils/print";
import { connectToDatabase } from "@/utils/connectDb";
import { getUserByEmail } from "@/utils/userRepository";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Passwords", type: "password" },
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        await connectToDatabase();
        const user = await User?.findOne({ email: email });

        if (!user || user.password !== password) {
          printError(user);
          printError(password);
          printError("Invalid credentials");
          return null;
        }

        const res = {
          id: user?._id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          role: user?.role,
        };
        return res;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token, user }) => {
      const res = await getUserByEmail(session?.user?.email as string);
      if (res.success) {
        const userDetails = res.value;

        session.user = {
          ...session.user,
          id: userDetails?._id.toString(),
          firstName: userDetails?.firstName,
          lastName: userDetails?.lastName,
          role: userDetails?.role,
        } as any;
      }
      return session;
    },
  },
} satisfies NextAuthOptions

export const { handlers, auth, signIn, SignOut } = NextAuth(authOptions);
export { authOptions };
