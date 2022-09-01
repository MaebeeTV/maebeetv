import Navbar from "components/Navbar";
import { FC } from "react";

interface DashboardLayoutProps {
    children: React.ReactNode,
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
export default DashboardLayout;