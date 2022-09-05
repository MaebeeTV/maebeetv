import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const teamRouter = createRouter()
    .mutation("create", {
        input: z.object({
            name: z.string(),
            description: z.optional(z.string()),
            memberUserIds: z.optional(z.string().array())
        }),
        async resolve({ ctx, input }) {
            if (!ctx.session?.user || ctx.session.user.clearance === "User") {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
    
            try {
                const team = await ctx.prisma.team.create({
                    data: {
                        name: input.name,
                        description: input.description
                    },
                });
                let userIdsAddedToTeam = [{ userId: ctx.session.user.id, teamId: team.id }]
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
                        userId: ctx.session.user.id,
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
            if (!ctx.session?.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
    
            try {
                const adminRoleIdsOnTeam = (await ctx.prisma.role.findMany({
                    where: {
                        clearance: "Admin",
                        teamId: input.id
                    }
                })).map(e => e.id)
                const allowedUserWithRole = await ctx.prisma.usersWithRole.findFirst({
                    where: {
                        userId: ctx.session.user.id,
                        roleId: { in: adminRoleIdsOnTeam }
                    }
                })
                if (allowedUserWithRole) {
                    return await ctx.prisma.team.delete({
                        where: {
                            id: input.id
                        }
                    })
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
                        userId: ctx.session.user.id
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