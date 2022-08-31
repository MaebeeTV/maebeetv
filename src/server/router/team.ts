import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const teamRouter = createRouter()
.mutation("create", {
  input: z.object({
    id: z.optional(z.string()),
    name: z.string(),
    description: z.optional(z.string()),
  }),
  async resolve({ ctx, input }) {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    
    try {
      const team = await ctx.prisma.team.create({
        data: {
          name: input.name,
          description: input.description
        },
      })
      await ctx.prisma.usersOnTeam.create({
        data: {
          userId: ctx.session.user.id,
          teamId: team.id
        }
      })

      const role = await ctx.prisma.role.create({
        data: {
          name: "Creator",
          description: "Creator of the Team",
          teamId: team.id
        }
      });
      await ctx.prisma.usersWithRole.create({
        data: {
          userId: ctx.session.user.id,
          roleId: role.id,
        }
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