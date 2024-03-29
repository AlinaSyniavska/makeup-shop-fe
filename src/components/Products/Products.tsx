import React, { FC, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import style from "./Products.module.css";
import { IQueryParams } from "../../interfaces";
import { Product } from "../Product/Product";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { productActions, userActions } from "../../redux";
import { localStorageItemsEnum, ratingEnum } from "../../constants";
import { commonHelper } from "../../helpers";

const Products: FC = () => {
  const { products, page, perPage, sortOrder, filterBy } = useAppSelector((state) => state.productReducer);
  const { userFavoriteList } = useAppSelector((state) => state.userReducer);
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams(commonHelper.setupQuery(page, perPage, sortOrder, filterBy));
  const [isCategoryPath, setIsCategoryPath] = useState<boolean>(false);
  const { state, pathname } = useLocation();

  useEffect(() => {
    pathname.includes("/category")
      ? setIsCategoryPath(true)
      : setIsCategoryPath(false);
  }, [pathname]);

  useEffect(() => {
    setQuery(commonHelper.setupQuery(page, perPage, sortOrder, filterBy));
  }, [page, perPage, sortOrder, filterBy]);

  useEffect(() => {
    dispatch(productActions.saveQueryParams(commonHelper.setupQueryToSave(query)));
  }, [dispatch, query, isCategoryPath, pathname]);

  useEffect(() => {
    !isCategoryPath
      ? dispatch(productActions.getAll({ params: fillingQueryParams(query) }))
      : dispatch(productActions.getAtUrl({
            params: fillingQueryParams(query),
            url: pathname,
          })
        );
  }, [state, isCategoryPath, pathname, query]);

  useEffect(() => {
    if (localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) !== null && isAuth) {
      dispatch(userActions.getFavoriteListById({
          id: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER)!,
        })
      );
    }
  }, [state, isCategoryPath, pathname]);

  useEffect(() => {
    if (localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) !== null && isAuth) {
      dispatch(userActions.updateById({
          id: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER)!,
          user: { favoriteList: Array.from(new Set(userFavoriteList)) },
        })
      );
    }
  }, [userFavoriteList]);

  return (
    <React.Fragment>
      <div className={style.bodyWrap}>
        <div className={style.productContainer}>
          {products.length
              ? (products.map((product) => (
                  <Product key={product._id} product={product} />)))
              : (<div className={style.text}>
                  Sorry we couldn't find any matches for your request tags :(
                </div>)}
        </div>
      </div>
    </React.Fragment>
  );
};

function fillingQueryParams(query: URLSearchParams): IQueryParams {
  return {
    page: query.get("page") || "1",
    perPage: query.get("perPage") || "20",
    sortOrder: query.get("sortOrder") || ratingEnum.HIGH,
    filterBy: query.get("filterBy") || "",
  };
}

export { Products };
