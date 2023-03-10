import React from "react";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import style from "./FilterComponent.module.css";
import { tags } from "../../constants";
import { productActions } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {commonHelper} from "../../helpers";

const FilterComponent: FC = () => {
  const { page, perPage, sortOrder, filterBy } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState<string[]>(filterBy);
/*  const [query, setQuery] = useSearchParams({
    page: `${page}`,
    perPage: `${perPage}`,
    sortOrder: `${sortOrder}`,
    filterBy: `${filterBy.join(";")}`,
  });*/



  const [query, setQuery] = useSearchParams(commonHelper.setupQuery(page, perPage, sortOrder, filterBy));

  useEffect(() => {
    const filterByCollection = document.querySelectorAll(
      "input[type=checkbox]"
    ) as NodeListOf<HTMLInputElement>;
    const checkedTags = [] as Array<HTMLInputElement>;

    Array.from(filterByCollection, (item) => (item.checked = false));
    Array.from(filterByCollection, (item) =>
      filterBy.forEach((tag) => {
        if (item.value === tag) {
          checkedTags.push(item);
        }
      })
    );

    checkedTags.forEach((item) => (item.checked = true));

    setChecked(filterBy);
  }, [filterBy]);

  const checkFilterTags = (event: any) => {
    let updatedList = [...checked];

    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }

    setChecked(updatedList);
  };

  function submitForm() {
    const indexEmpty = checked.findIndex((item) => item === "");
    if (indexEmpty !== -1) {
      checked.splice(indexEmpty, 1);
    }

/*    setQuery({
      page: `${page}`,
      perPage: `${perPage}`,
      sortOrder: `${sortOrder}`,
      filterBy: checked.join(";"),
    });*/

    setQuery(commonHelper.setupQuery(page, perPage, sortOrder, checked));

    dispatch(
      productActions.saveQueryParams({
        page: query.get("page"),
        perPage: query.get("perPage"),
        sortOrder: query.get("sortOrder"),
        filterBy: query.get("filterBy")?.split(";"),
      })
    );
  }

  return (
    <React.Fragment>
      <div className={style.checkList}>
        {tags.map((item, index) => (
          <div className={style.checkBoxes} key={index}>
            <label>
              <input value={item} type="checkbox" onChange={checkFilterTags} />
              {item}
            </label>
          </div>
        ))}

        <button className={style.btnSearch} onClick={submitForm}>
          Search
        </button>
      </div>
    </React.Fragment>
  );
};

export { FilterComponent };
