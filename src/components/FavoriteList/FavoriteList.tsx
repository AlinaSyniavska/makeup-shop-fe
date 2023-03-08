import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { userActions } from "../../redux";
import { localStorageItemsEnum } from "../../constants";
import { FavoriteListItem } from "../FavoriteListItem/FavoriteListItem";
import style from "./FavoriteList.module.css";

const FavoriteList: FC = () => {
  const { userFavoriteProductList } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) !== null) {
      dispatch(userActions.getPopulatedUserById({
          id: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER)!,
        })
      );
    }
  }, [dispatch]);

  return (
    <div>
      <div className={style.favoriteList}>
        {userFavoriteProductList.length
            ? (userFavoriteProductList.map((item) => (<FavoriteListItem key={item._id} item={item} />)))
            : (<div className={style.text}>Your Favorite List is Empty...</div>)
        }
      </div>
    </div>
  );
};

export { FavoriteList };
