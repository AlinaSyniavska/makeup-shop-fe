import React, { FC } from "react";

import style from "./SortComponent.module.css";
import { ratingEnum } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { productActions } from "../../redux";
import { useSearchParams } from "react-router-dom";
import { commonHelper } from "../../helpers";

const SortComponent: FC = () => {
  const { page, perPage, sortOrder, filterBy } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams(commonHelper.setupQuery(page, perPage, sortOrder, filterBy));

  const setSort = (event: any) => {
    setQuery(commonHelper.setupQuery(page, perPage, event.target.value, filterBy));
    dispatch(productActions.saveQueryParams(commonHelper.setupQueryToSave(query)));
  };

  return (
    <React.Fragment>
      <p className={style.sortDirection}>Sort by Rating</p>
      <div className={style.checkList}>
        <div className={style.checkBoxes}>
          <label>
            <input type={"radio"} checked={Number(sortOrder) === 5} value={ratingEnum.HIGH} name={"sortOrder"} onChange={setSort}/>
            High to Low
          </label>
        </div>

        <div className={style.checkBoxes}>
          <label>
            <input type={"radio"} checked={Number(sortOrder) === 1} value={ratingEnum.LOW} name={"sortOrder"} onChange={setSort}/>
            Low to High
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

export { SortComponent };
