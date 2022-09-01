import Navbar from "components/Navbar";
import { dashboard_routes } from "modules/routes/dashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";

interface DashboardLayoutProps {
    children: React.ReactNode,
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    const { status } = useSession();
    const router = useRouter();
    if (status === "unauthenticated") router.push("/auth/login");
    return (
        <>
            <Navbar routes={dashboard_routes} />
            {children}
        </>
    );
}
export default DashboardLayout;