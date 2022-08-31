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
    const { data: messages, isLoading } = trpc.useQuery(["team.get_all"]);
    const createTeam = trpc.useMutation(["team.create"]);

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
                <Button>Create Team</Button>
            </div>
                {
                    messages.map(e => 
                        (
                            <Card key={e.id} title={e.name}>
                                {e.description}
                            </Card>
                        )
                    )
                }
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