import { FC } from "react";

import { SelectPerPageForm } from "../SelectPerPageForm/SelectPerPageForm";

import style from "./Pagination.module.css";
import { Pages } from "../Pages/Pages";

const Pagination: FC = () => {
  return (
    <div>
      <div className={style.pgnContainer}>
        <SelectPerPageForm />
        <Pages />
      </div>
    </div>
  );
};

export { Pagination };
