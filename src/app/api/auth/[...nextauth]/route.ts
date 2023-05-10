import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scope = 'user-top-read'

export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
          clientId: process.env.SPOTIFY_CLIENT_ID!,
          clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
          authorization: {
            params: { scope },
          },
        })
      ],
    secret: process.env.JWT_SECRET!,
    callbacks: {
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.refresh_token;
        }
        return token;
      },
      async session({ session, token }) {
        session.user = token;
        return session;
      },
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
