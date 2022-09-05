import { NextPageWithLayout } from "next";
import React, { FC, ReactElement, useState } from "react";

import DashboardLayout from "layout/dashboard";
import { trpc } from "utils/trpc";
import Spinner from "components/Spinner";
import Button from "components/Button";
import Card from "components/Card";
import { useSession } from "next-auth/react";
import { Combobox, Dialog } from "@headlessui/react";

import { OptimisticRefreshDefault } from "modules/trpc-helper";
import Link from "next/link";
import UserSearch from "components/Search/User";
import { User } from "@prisma/client";
import CreateTeamOrEdit from "components/Dashboard/Team/CreateOrEdit";

const TeamsPage: NextPageWithLayout = () => {
    const ctx = trpc.useContext();
    const { data: session, status } = useSession();
    const { data: messages, isLoading } = trpc.useQuery(["team.get_all"]);
    const createTeam = trpc.useMutation("team.create", OptimisticRefreshDefault(ctx, ["team.get_all"]) as any);
    const deleteTeam = trpc.useMutation("team.delete", OptimisticRefreshDefault(ctx, ["team.get_all"]) as any);
    
    const newTeamOpenState = useState(false),
        [newTeamOpen, setNewTeamOpen] = newTeamOpenState;

    const selectedUsersState = useState<User[]>([]),
        [selectedUsers] = selectedUsersState;

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
                <CreateTeamOrEdit openState={newTeamOpenState}></CreateTeamOrEdit>

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