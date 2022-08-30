import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

import axios from "axios";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async signIn({ account }) {
      if (account.provider === "discord") {
        const guilds: {id: string}[] = (await axios.get("https://discord.com/api/users/@me/guilds", 
          {
            headers: {
              Authorization: `Bearer ${account.access_token}`
            }
          }
        )).data;
        const guild_ids = guilds.flatMap(e => e.id);
        return (guild_ids.findIndex(e => e === process.env.DISCORD_ALLOWED_GUILD) !== -1);
      }
      return false;
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: 'identify guilds email' } },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
