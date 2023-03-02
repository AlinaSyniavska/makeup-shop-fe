import { FC } from "react";

import { Products, Sidebar } from "../../components";
import style from "../../components/Products/Products.module.css";

const CatalogProductPage: FC = () => {
  return (
    <div className={style.bodyWrap}>
      <Sidebar />
      <Products />
    </div>
  );
};

export { CatalogProductPage };
