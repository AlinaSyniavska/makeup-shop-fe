import { FC } from "react";
import { Outlet } from "react-router-dom";

import { AdminHeader } from "../../components";

const AdminLayout: FC = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export { AdminLayout };
