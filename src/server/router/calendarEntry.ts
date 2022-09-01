import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const calendarEntryRouter = createRouter()
    .mutation("create", {
        input: z.object({
            teamId: z.string(),
            name: z.string(),
            description: z.optional(z.string()),
            receiversUserIds: z.string().array(),
            endsAt: z.date()
        }),
        async resolve({ ctx, input }) {
            if (!ctx.session?.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
            try {
                return await ctx.prisma.calendarEntry.create({
                    data: {
                        name: input.name,
                        description: input.description,
                        endsAt: input.endsAt,
                        authorUserId: ctx.session.user.id
                    },
                })
            } catch (error) {
                console.log(error);
            }
        },
    })
    .query("get_all", {
        async resolve({ ctx }) {
            if (!ctx.session?.user && ctx.session?.user?.clearance !== "User") {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }

            try {
                const entryIds = (await ctx.prisma.usersReceivedCalendarEntry.findMany({
                    where: {
                        userId: ctx.session.user.id
                    }
                })).map(e => e.calendarEntryId);
                return await ctx.prisma.calendarEntry.findMany({
                    where: {
                        id: { in: entryIds }
                    }
                })
            } catch (error) {
                console.log("error", error);
            }
        }
    });