import NextAuth from "next-auth"
import GoogleProviders from "next-auth/providers/google"
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from "../../../lib/mongodb";


const isDev = process.env.NEXT_PUBLIC_APP_ENV === 'dev';
const NEXTAUTH_URL_DASHBOARD = isDev ? process.env.DEV_NEXTAUTH_URL_DASHBOARD : process.env.NGROK_NEXTAUTH_URL_DASHBOARD;

export const authOptions = {
  url: NEXTAUTH_URL_DASHBOARD,
  secret: process.env.AUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return NEXTAUTH_URL_DASHBOARD
    },
    debug: process.env.NODE_ENV === "development",
  }
}
export default NextAuth(authOptions)