// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials' 
import { authenticate } from '@/actions/authetication'
import { authOptions } from '@/utils/auth'

export default NextAuth(authOptions);
