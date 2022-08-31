import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const teamRouter = createRouter()
.mutation("create", {
  input: z.object({
    teamId: z.string(),
    name: z.string(),
    description: z.optional(z.string()),
  }),
  async resolve({ ctx, input }) {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    try {
      return await ctx.prisma.role.create({
        data: {
          name: input.name,
          description: input.description,
          teamId: input.teamId,
        },
      })
    } catch (error) {
      console.log(error);
    }
  },
})
.query("get_all", {
  async resolve({ ctx }) {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    try {
      const teamIds = (await ctx.prisma.usersOnTeam.findMany({
        where: {
          userId: ctx.session.user.id
        }
      })).map(e => e.teamId);
      await ctx.prisma.team.findMany({
        where: {
          id: { in: teamIds }
        }
      })
    } catch (error) {
      console.log("error", error);
    }
    return
  }
});