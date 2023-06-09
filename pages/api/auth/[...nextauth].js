import NextAuth from "next-auth"
import GoogleProviders from "next-auth/providers/google"
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from "../../../lib/mongodb";



export const authOptions = {
  url: process.env.NEXTAUTH_URL_DASHBOARD,
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
      return process.env.NEXTAUTH_URL_DASHBOARD
    },
    debug: process.env.NODE_ENV === "development",
  }
}
export default NextAuth(authOptions)