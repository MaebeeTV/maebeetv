import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const userRouter = createRouter()
    .query("get_all", {
        async resolve({ ctx }) {
            if (!ctx.session?.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
            return await ctx.prisma.user.findMany({
                orderBy: {
                    discordName: "asc"
                }
            })
        }
    })
    .query("get_search", {
        input: z.object({
            query: z.string(),
            max_per_page: z.optional(z.number()),
            page: z.optional(z.number()),
        }),
        async resolve({ ctx, input }) {
            if (!ctx.session?.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
            
            if (!input.page) input.page = 1;
            if (!input.max_per_page) input.max_per_page = 20;
            
            return await ctx.prisma.user.findMany({
                skip: (input.page - 1) * input.max_per_page,
                take: input.max_per_page,
                orderBy: {
                    discordName: "asc"
                },
                where: {
                    discordName: {
                        contains: input.query
                    }
                }
            })
        }
    })
    .query("get_in_teams", {
        input: z.object({
            teamId: z.string().or(z.string().array()),
            max_per_page: z.optional(z.number()),
            page: z.optional(z.number()),
        }),
        async resolve({ ctx, input }) {
            if (!ctx.session?.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }

            if (!input.page) input.page = 1;
            if (!input.max_per_page) input.max_per_page = 20;

            if (!Array.isArray(input.teamId)) input.teamId = [input.teamId];

            try {
                const userIdsOnTeam = (await ctx.prisma.usersOnTeam.findMany({
                    where: {
                        teamId: {
                            in: input.teamId
                        }
                    }
                })).map(e => e.userId);

                return await ctx.prisma.user.findMany({
                    skip: (input.page - 1) * input.max_per_page,
                    take: input.max_per_page,
                    orderBy: {
                        discordName: "asc"
                    },
                    where: {
                        id: {
                            in: userIdsOnTeam
                        }
                    }
                })
            } catch (error) {
                console.log("error", error);
            }
        }
    });