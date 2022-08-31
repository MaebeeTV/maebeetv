import { NextPageWithLayout } from "next";
import React, { FC, ReactElement, useState } from "react";

import DashboardLayout from "layout/dashboard";
import { trpc } from "utils/trpc";
import Spinner from "components/Spinner";
import Button from "components/Button";
import Card from "components/Card";
import { useSession } from "next-auth/react";
import { Dialog } from "@headlessui/react";

const TeamsPage: NextPageWithLayout = () => {
    const ctx = trpc.useContext();
    const { data: session, status } = useSession();
    const { data: messages, isLoading } = trpc.useQuery(["team.get_all"]);
    const createTeam = trpc.useMutation("team.create", {
        onMutate: () => {
            ctx.cancelQuery(["team.get_all"])
            const optimisticUpdate = ctx.getQueryData(["team.get_all"]);
            if (optimisticUpdate) {
                ctx.setQueryData(["team.get_all"], optimisticUpdate);
            }
        },
        onSettled: () => {
            ctx.invalidateQueries(["team.get_all"]);
        }
    });

    const [newTeamOpen, setNewTeamOpen] = useState(true);

    if (isLoading || !messages || status === "loading" || !session) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <div>
                    <Spinner className="h-16 w-16" />
                </div>
            </div>
        );
    }
    console.log(session.user)
    return (
        <>


            <div className="flex-1 m-6 relative">
                <Dialog className="p-3 absolute top-0 left-0 flex items-center justify-center w-full h-full" open={newTeamOpen} onClose={() => setNewTeamOpen(false)}>
                    <Dialog.Panel>
                        <Card title="Create Team" className="dark:backdrop-filter-none dark:bg-black bg-white">
                            <Dialog.Description>
                                This will permanently deactivate your account
                            </Dialog.Description>

                            <p>
                                Are you sure you want to deactivate your account? All of your data
                                will be permanently removed. This action cannot be undone.
                            </p>
                            <div className="mt-3 flex gap-3">
                                <Button onClick={() => setNewTeamOpen(false)}>Deactivate</Button>
                                <Button onClick={() => setNewTeamOpen(false)}>Cancel</Button>
                            </div>
                        </Card>
                    </Dialog.Panel>
                </Dialog>

                <div className="absolute top-0 left-0">
                    {session?.user?.clearance !== "User" ?
                        <Button onClick={() => createTeam.mutate({ name: "New Team", description: "New Team Description" })}>Create Team</Button>
                        : <></>
                    }
                </div>
                <div className="my-16 flex justify-center gap-6 flex-wrap">
                    {
                        messages.map(e =>
                        (
                            <Card key={e.id} title={e.name} className="w-full flex-1 md:flex-none min-w-max">
                                {e.description}
                            </Card>
                        )
                        )
                    }
                </div>
            </div>
        </>
    )
}

TeamsPage.getLayout = (page: ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
};

export default TeamsPage;