import { NextPageWithLayout } from "next";
import React, { FC, ReactElement } from "react";

import DashboardLayout from "layout/dashboard";
import { trpc } from "utils/trpc";
import Spinner from "components/Spinner";
import Button from "components/Button";

const Card: FC<{children: React.ReactNode, title?: string, className?: string}> = ({ children, title, className }) => {
    return (
        <div className={`block p-6 rounded-lg shadow-lg dark:backdrop-brightness-200 max-w-sm ${className}`}>
            <h5 className="text-gray-900 dark:text-gray-200 text-xl leading-tight font-medium mb-2">{title}</h5>
            <p className="text-gray-700 dark:text-gray-400 text-base mb-4">
                {children}
            </p>
        </div>
    )
}

const Dashboard: NextPageWithLayout = () => {
    const ctx = trpc.useContext();
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

    if (isLoading || !messages) {
        return (
          <div className="flex-1 flex justify-center items-center">
            <div>
              <Spinner className="h-16 w-16" />
            </div>
          </div>
        );
    }

    return (
        <div className="flex-1 m-6 relative">
            <div className="absolute top-0 left-0">
                <Button onClick={() => createTeam.mutate({ name: "New Team", description: "New Team Description" })}>Create Team</Button>
            </div>
            <div className="my-16 flex justify-center gap-6 flex-wrap">
                {
                    messages.map(e => 
                        (
                            <Card key={e.id} title={e.name} className="w-96 flex-1 md:flex-none min-w-max">
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