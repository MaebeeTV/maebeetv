import { NextPageWithLayout } from "next";
import { ReactElement } from "react";

import DashboardLayout from "layout/dashboard";


const Dashboard: NextPageWithLayout = () => {
    return (
        <>
        </>
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