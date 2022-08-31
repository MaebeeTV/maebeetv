import Navbar from "components/Navbar";
import { FC } from "react";

interface MainLayoutProps {
    children: React.ReactNode,
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
export default MainLayout;