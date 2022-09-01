import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const userRouter = createRouter()
    .query("get_all_in_teams", {
        input: z.object({
            teamId: z.string().or(z.string().array())
        }),
        async resolve({ ctx, input }) {
            if (!ctx.session?.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }

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