import React, { FC } from "react";

import style from "./Pagination.module.css";
import { SelectPerPageForm } from "../SelectPerPageForm/SelectPerPageForm";
import { Pages } from "../Pages/Pages";

const Pagination: FC = () => {
  return (
    <React.Fragment>
      <div className={style.pgnContainer}>
        <SelectPerPageForm />
        <Pages />
      </div>
    </React.Fragment>
  );
};

export { Pagination };
