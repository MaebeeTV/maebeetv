import { NextPageWithLayout } from "next";
import React, { FC, ReactElement } from "react";

import DashboardLayout from "layout/dashboard";
import { trpc } from "utils/trpc";
import Spinner from "components/Spinner";
import Button from "components/Button";
import Card from "components/Card";
import { useSession } from "next-auth/react";

const Dashboard: NextPageWithLayout = () => {
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

    if (isLoading || status === "loading" || !messages) {
        return (
          <div className="flex-1 flex justify-center items-center">
            <div>
              <Spinner className="h-16 w-16" />
            </div>
          </div>
        );
    }
    console.log(session?.user)
    return (
        <div className="flex-1 m-6 relative">
            <div className="absolute top-0 left-0">
                { session?.user?.clearance !== "User" ?
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
    )
}

Dashboard.getLayout = (page: ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
};

export default Dashboard;