import React, { FC } from "react";

import style from "./SortComponent.module.css";
import { ratingEnum } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { productActions } from "../../redux";
import { useSearchParams } from "react-router-dom";

const SortComponent: FC = () => {
  const { page, perPage, sortOrder, filterBy } = useAppSelector(
    (state) => state.productReducer
  );
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams({
    page: `${page}`,
    perPage: `${perPage}`,
    sortOrder: `${sortOrder}`,
    filterBy: `${filterBy.join(";")}`,
  });

  const setSort = (event: any) => {
    setQuery({
      page: `${page}`,
      perPage: `${perPage}`,
      sortOrder: event.target.value,
      filterBy: `${filterBy.join(";")}`,
    });
    dispatch(
      productActions.saveQueryParams({
        page: query.get("page"),
        perPage: query.get("perPage"),
        sortOrder: query.get("sortOrder"),
        filterBy: query.get("filterBy")?.split(";"),
      })
    );
  };

  return (
    <div>
      <p className={style.sortDirection}>Sort by Rating</p>
      <div className={style.checkList}>
        <div className={style.checkBoxes}>
          <label>
            <input
              type={"radio"}
              checked={Number(sortOrder) === 5}
              value={ratingEnum.HIGH}
              name={"sortOrder"}
              onChange={setSort}
            />
            High to Low
          </label>
        </div>

        <div className={style.checkBoxes}>
          <label>
            <input
              type={"radio"}
              checked={Number(sortOrder) === 1}
              value={ratingEnum.LOW}
              name={"sortOrder"}
              onChange={setSort}
            />
            Low to High
          </label>
        </div>
      </div>
    </div>
  );
};

export { SortComponent };
