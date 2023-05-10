import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
          clientId: process.env.SPOTIFY_CLIENT_ID!,
          clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
        })
      ],
    secret: process.env.SECRET,
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
