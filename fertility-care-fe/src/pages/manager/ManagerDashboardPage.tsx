import { Outlet } from "react-router-dom";
import ManagerSidebar from "../../components/dashboard/manager/ManagerSidebar";

export const ManagerDashboardPage = () => {
  return (
    <>
        <ManagerSidebar />
        <Outlet />
    </>
  );
};
