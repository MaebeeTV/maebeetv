import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

import axios from "axios";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
    // Include user.id on session
    callbacks: {
        async signIn({ account, profile, user }) {
            if (account.provider === "discord" && process.env.DISCORD_ALLOWED_GUILD) {
                const guilds: {id: string}[] = (await axios.get("https://discord.com/api/users/@me/guilds", 
                    {
                        headers: {
                            Authorization: `Bearer ${account.access_token}`
                        }
                    }
                )).data;
                const guild_ids = guilds.flatMap(e => e.id);

                try {
                    await prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            discordName: getDiscordName(profile)
                        }
                    })
                }
                catch {}

                return guild_ids.includes(process.env.DISCORD_ALLOWED_GUILD);
            }
            return false;
        },
        async session({ session, user }) {
            if (session.user) {
                Object.assign(session.user, user)
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
            profile(profile) {
                if (profile.avatar === null) {
                    const defaultAvatarNumber = parseInt(profile.discriminator) % 5
                    profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
                } else {
                    const format = profile.avatar.startsWith("a_") ? "gif" : "png"
                    profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
                }
                return {
                    id: profile.id,
                    name: profile.username,
                    discordName: getDiscordName(profile),
                    email: profile.email,
                    image: profile.image_url,
                } as User
            },
        }),
    // ...add more providers here
    ],
};

function getDiscordName(profile: any) {
    return `${profile.username}#${profile.discriminator}`;
}

export default NextAuth(authOptions);
