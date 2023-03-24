import React, { FC } from "react";
import { Outlet } from "react-router-dom";

import { AdminHeader } from "../../components";

const AdminLayout: FC = () => {
  return (
    <React.Fragment>
      <AdminHeader />
      <Outlet />
    </React.Fragment>
  );
};

export { AdminLayout };
