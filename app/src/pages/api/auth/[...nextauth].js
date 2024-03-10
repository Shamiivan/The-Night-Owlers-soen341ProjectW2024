import NextAuth from "next-auth";
import {connectToDatabase } from "@/utils/connectDB";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log(credentials)
        connectToDatabase();
        const user = await User?.findOne({ email: credentials.email });
        
        if (user && credentials.password === user.password) {
          console.log(user);
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role : user.role,
          };
        }
        throw new Error("Invalid Email or Password");
      },
    }),
  ],
});
