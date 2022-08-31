import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const roleRouter = createRouter()
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
      return await ctx.prisma.role.findMany({
        where: {
          teamId: {
            in: input.teamId
          }
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }
});