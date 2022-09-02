import Card from "components/Card";
import Spinner from "components/Spinner";
import DashboardLayout from "layout/dashboard";
import { NextPageWithLayout } from "next";
import { useSession } from "next-auth/react";
import { ReactElement } from "react";

const Dashboard: NextPageWithLayout = () => {
    const { data: session, status } = useSession();

    if (status === "loading" || !session?.user) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <div>
                    <Spinner className="h-16 w-16" />
                </div>
            </div>
        );
    }
    
    return (
        <div className="flex-1 flex items-center justify-center">
            <Card title={`Welcome, ${session.user.discordName}.`}>
                &quot;we got your data now sod off ~ ash 2022&quot;
            </Card>
        </div>
    )
}

Dashboard.getLayout = (page) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
};

export default Dashboard;