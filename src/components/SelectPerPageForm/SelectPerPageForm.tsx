import { ChangeEvent, FC } from "react";

import style from "./SelectPerPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { productActions } from "../../redux";

const SelectPerPageForm: FC = () => {

  // insert commonHelper.scrollToUp();

  const { perPage } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    dispatch(productActions.setPerPage({ perPage: e.target.value }));
  };

  return (
    <div>
      <div className={style.selectContainer}>
        <label>
          Select count
          <select
            onChange={onChangeSelect}
            id={"perPage"}
            name={"perPage"}
            value={perPage}
          >
            <option value={"10"}>10</option>
            <option value={"20"}>20</option>
            <option value={"50"}>50</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export { SelectPerPageForm };
