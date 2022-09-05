import { TRPCError } from "@trpc/server";
import { ClearanceOrder } from "modules/trpc-helper";
import { z } from "zod";
import { createRouter } from "./context";

export const teamRouter = createRouter()
    .middleware(async ({ ctx, next }) => {
        if (!ctx.session?.user) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return next({ctx: {...ctx, user: ctx.session.user}})
    })
    .mutation("create", {
        input: z.object({
            name: z.string(),
            description: z.optional(z.string()),
            memberUserIds: z.optional(z.string().array())
        }),
        async resolve({ ctx, input }) {
            try {
                if (ClearanceOrder.indexOf(ctx.user.clearance) < ClearanceOrder.indexOf("Staff")) throw new TRPCError({ code: "UNAUTHORIZED" });
            
                const team = await ctx.prisma.team.create({
                    data: {
                        name: input.name,
                        description: input.description
                    },
                });
                let userIdsAddedToTeam = [{ userId: ctx.user.id, teamId: team.id }]
                if (input.memberUserIds && input.memberUserIds.length !== 0) {
                    userIdsAddedToTeam = userIdsAddedToTeam.concat(
                        (
                            await ctx.prisma.user.findMany({
                                where: {
                                    id: { in: input.memberUserIds }
                                }
                            })
                        ).map(e => { return { userId: e.id, teamId: team.id } })
                    );
                }
                userIdsAddedToTeam = userIdsAddedToTeam.filter((value, index, self) =>
                    index === self.findIndex((t) => (
                        t.userId === value.userId
                    ))
                )
                await ctx.prisma.usersOnTeam.createMany({
                    data: userIdsAddedToTeam,
                    skipDuplicates: true
                });
                const role = await ctx.prisma.role.create({
                    data: {
                        name: "Creator",
                        description: "Creator of the Team",
                        teamId: team.id,
                        clearance: "Admin"
                    }
                });
                await ctx.prisma.usersWithRole.create({
                    data: {
                        userId: ctx.user.id,
                        roleId: role.id,
                    }
                });
                return team;
            } catch (error) {
                console.log(error);
            }
        },
    })
    .mutation("delete", {
        input: z.object({
            id: z.optional(z.string())
        }),
        async resolve({ ctx, input }) {
            try {
                const overridePermsWithClearance = ClearanceOrder.indexOf(ctx.user.clearance) > ClearanceOrder.indexOf("Staff");
                const adminRoleIdsOnTeam = (await ctx.prisma.role.findMany({
                    where: {
                        clearance: "Admin",
                        teamId: input.id
                    }
                })).map(e => e.id)
                const allowedUserWithRole = await ctx.prisma.usersWithRole.findFirst({
                    where: {
                        userId: ctx.user.id,
                        roleId: { in: adminRoleIdsOnTeam }
                    }
                })
                if (allowedUserWithRole || overridePermsWithClearance) {
                    return await ctx.prisma.team.delete({
                        where: {
                            id: input.id
                        }
                    })
                }
                else {
                    throw new TRPCError({ code: "UNAUTHORIZED" });
                }
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
                        userId: ctx.user.id
                    }
                })).map(e => e.teamId);
                return await ctx.prisma.team.findMany({
                    where: {
                        id: { in: teamIds }
                    }
                })
            } catch (error) {
                console.log("error", error);
            }
        }
    });