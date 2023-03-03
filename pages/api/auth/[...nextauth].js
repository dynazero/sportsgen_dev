import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export const authOptions = {
  // secret: process.env.AUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)