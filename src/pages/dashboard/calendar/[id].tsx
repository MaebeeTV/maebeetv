import DashboardLayout from "layout/dashboard";
import { NextPageWithLayout } from "next";

const TeamInfoPage: NextPageWithLayout = () => {
    return <></>
}

TeamInfoPage.getLayout = (page) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
};


export default TeamInfoPage;