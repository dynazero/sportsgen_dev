import NextAuth from "next-auth"
import GoogleProviders from "next-auth/providers/google"
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from "../../../lib/mongodb";



const NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

let NEXTAUTH_URL_DASHBOARD;

switch (NEXT_PUBLIC_APP_ENV) {
  case 'dev':
    NEXTAUTH_URL_DASHBOARD = process.env.DEV_NEXTAUTH_URL_DASHBOARD;
    break;
  case 'test':
    NEXTAUTH_URL_DASHBOARD = process.env.NGROK_NEXTAUTH_URL_DASHBOARD;
    break;
  case 'production':
    NEXTAUTH_URL_DASHBOARD = process.env.NEXTAUTH_URL_DASHBOARD;
    break;
  default:
    console.error('Invalid environment specified in NEXT_PUBLIC_APP_ENV');
    break;
}

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
      if (url === "/") {
        // If user is logging in from the homepage, redirect to dashboard
        return `${baseUrl}/dashboard`;
      } else if (url.startsWith("/")) {
        // For other relative URLs, return the URL as is
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        // If the URL is on the same origin, return the URL as is
        return url;
      } else {
        // In all other cases, return the base URL
        return baseUrl;
      }
    },
    debug: NEXT_PUBLIC_APP_ENV === "dev",
  }
}
export default NextAuth(authOptions)