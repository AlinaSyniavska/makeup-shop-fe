import { FC } from "react";
import { NavLink } from "react-router-dom";

import style from './AdminHeader.module.css';

const AdminHeader: FC = () => {
  return (
    <div>
      <div className={style.headerContainer}>
        <NavLink to="product">Create Product</NavLink>
        <NavLink to="brand">Create Brand</NavLink>
        <NavLink to="category">Create Category</NavLink>
        <NavLink to="productType">Create Product Type</NavLink>
      </div>
    </div>
  );
};

export { AdminHeader };
