import { FC } from "react";

import { SelectPerPageForm } from "../SelectPerPageForm/SelectPerPageForm";

import "./Pagination.css";
import { Pages } from "../Pages/Pages";

const Pagination: FC = () => {
  return (
    <div>
      <div className={"pgnContainer"}>
        <SelectPerPageForm />
        <Pages />
      </div>
    </div>
  );
};

export { Pagination };
