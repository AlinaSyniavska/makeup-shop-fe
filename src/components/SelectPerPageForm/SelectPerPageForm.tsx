import React, { ChangeEvent, FC } from "react";

import style from "./SelectPerPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { productActions } from "../../redux";
import { commonHelper } from "../../helpers";

const SelectPerPageForm: FC = () => {
  const { perPage } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    dispatch(productActions.setPerPage({ perPage: e.target.value }));
    commonHelper.scrollToUp();
  };

  return (
    <React.Fragment>
      <div className={style.selectContainer}>
        <label>
          The number of units
          <select onChange={onChangeSelect} id={"perPage"} name={"perPage"} value={perPage}>
            <option value={"10"}>10</option>
            <option value={"20"}>20</option>
            <option value={"50"}>50</option>
          </select>
        </label>
      </div>
    </React.Fragment>
  );
};

export { SelectPerPageForm };
