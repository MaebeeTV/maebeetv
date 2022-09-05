import { NextPageWithLayout } from "next";
import React, { FC, ReactElement, useState } from "react";

import DashboardLayout from "layout/dashboard";
import { trpc } from "utils/trpc";
import Spinner from "components/Spinner";
import Button from "components/Button";
import Card from "components/Card";
import { useSession } from "next-auth/react";
import { Dialog } from "@headlessui/react";

import { OptimisticRefreshDefault } from "modules/trpc-helper";
import Link from "next/link";

const TeamsPage: NextPageWithLayout = () => {
    const ctx = trpc.useContext();
    const { data: session, status } = useSession();
    const { data: messages, isLoading } = trpc.useQuery(["team.get_all"]);
    const createTeam = trpc.useMutation("team.create", OptimisticRefreshDefault(ctx, ["team.get_all"]) as any);
    const deleteTeam = trpc.useMutation("team.delete", OptimisticRefreshDefault(ctx, ["team.get_all"]) as any);

    const [newTeamOpen, setNewTeamOpen] = useState(false);

    if (isLoading || !messages || status === "loading" || !session) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <div>
                    <Spinner className="h-16 w-16" />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex-1 m-6 relative">
                <Dialog className="p-3 absolute top-0 left-0 flex items-center justify-center w-full h-full" open={newTeamOpen} onClose={() => setNewTeamOpen(false)}>
                    <Dialog.Panel>
                        <Card title="Create Team" className="dark:backdrop-filter-none dark:bg-black bg-white max-w-none">
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    const target = event.target as unknown as { [key: string]: { value?: string, name?: string } };
                                    const value_map = Object.assign({}, 
                                        ...(
                                            Object.keys(event.target).map(e => {
                                                const target_e = target[e];
                                                if (target_e && target_e.name) {
                                                    return { [target_e.name]: (target_e?.value ? target_e.value : undefined) }
                                                }
                                            }).filter(e => e)
                                        )
                                    );
                                    console.log(value_map);
                                    createTeam.mutate(value_map);
                                    setNewTeamOpen(false);
                                }}
                            >
                                <input name="name" className="my-2 text_input" placeholder="Name" required />
                                <textarea name="description" className="my-2 text_input md:min-w-[50vw] min-w-[80vw]" placeholder="Description" />

                                <Button type="submit" className="my-2 mr-3">Create</Button>
                                <Button className="my-2" onClick={() => setNewTeamOpen(false)}>Cancel</Button>
                            </form>
                        </Card>
                    </Dialog.Panel>
                </Dialog>

                <div className="absolute top-0 left-0">
                    {session?.user?.clearance !== "User" ?
                        <Button onClick={() => setNewTeamOpen(true)}>Create Team</Button>
                        : <></>
                    }
                </div>
                <div className="my-16 flex justify-center gap-6 flex-wrap">
                    {
                        messages.map(e =>
                            (
                                <Card key={e.id} title={e.name} className="w-full flex-1 md:flex-none min-w-max">
                                    {e.description}<br/>
                                    <Button onClick={() => deleteTeam.mutate({ id: e.id })} className="mr-3 mt-2">Delete</Button>
                                    <Button className="mt-2">
                                        <Link href={`/dashboard/team/${e.id}`}>
                                            <a>View</a>
                                        </Link>
                                    </Button>
                                </Card>
                            )
                        )
                    }
                </div>
            </div>
        </>
    )
}

TeamsPage.getLayout = (page) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
};

export default TeamsPage;