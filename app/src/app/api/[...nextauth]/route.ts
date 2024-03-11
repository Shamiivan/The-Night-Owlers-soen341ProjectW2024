// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials' 
import { autheticateUser, authenticate } from '@/actions/authetication'

export default NextAuth({
 // Configure one or more authentication providers
 providers: [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
      password: { label: "Password", type: "password" }
    },
    authorize: async (credentials) => {
      const user = await authenticate(credentials.email, credentials.password)

      if (user) {
        return Promise.resolve(user)
      } else {
        return Promise.resolve(null)
      }
    }
  })
],
 // A database is optional, but required to persist accounts in a database
 database: process.env.DATABASE_URL,

 // You can define custom pages to override the default ones
 pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: null // If set, new users will be directed here on first sign in
 },

 // Callbacks are asynchronous functions you can use to control what happens
 // when the user signs in, signs out, updates their profile, etc.
 callbacks: {
    async signIn(user, account, profile) {
      // You can add your own logic here to control the sign-in process
      // For example, you might check if the user is allowed to sign in
      return true
    },
    async redirect(url, baseUrl) {
      // You can add your own logic here to control the redirection processqQ
      // For example, you might redirect users to a different URL based on their role
      return baseUrl
    },
    async session(session, user) {
      // You can add your own logic here to control the session data
      // For example, you might add additional user information to the session
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      // You can add your own logic here to control the JWT token
      // For example, you might add additional user information to the token
      return token
    }
 },

 // Enable debug messages in the console if you are having problems
 debug: process.env.NODE_ENV === 'development',
})
