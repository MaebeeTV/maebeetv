import DashboardLayout from "layout/dashboard";
import { NextPageWithLayout } from "next";
import { ReactElement } from "react";

const Dashboard: NextPageWithLayout = () => {
    return <></>
}

Dashboard.getLayout = (page) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
};

export default Dashboard;