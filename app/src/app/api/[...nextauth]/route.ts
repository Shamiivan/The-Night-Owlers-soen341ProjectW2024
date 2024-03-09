import { connectToDatabase } from "@/utils/connectDb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


// Define the shape of the credentials object
interface Credentials {
 email: string;
 password: string;
}

// Define the shape of the user object returned by the authorize function
interface UserObject {
 email: string;
 password: string;
}

export const authOptions = {
 providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: Record<string, any>): Promise<UserObject | null> {
        const { email, password } = credentials;

        try {
          await connectToDatabase();
          const user = await User?.findOne({ email });

          if (!user) {
            return null;
          }
          if(password === user.password) {
            return null;
        }
          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null; // Return null in case of an error
        }
      },
    }),
 ],
 session: {
    strategy: "jwt",
 },
 secret: process.env.NEXT_AUTH_SECRET,
 pages: {
    signIn: "/",
 },
};

const handler = NextAuth({authOptions});

export { handler as GET, handler as POST };
