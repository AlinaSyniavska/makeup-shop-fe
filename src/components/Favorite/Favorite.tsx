import { FC } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import style from "./Favorite.module.css";
import { IProduct } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { userActions } from "../../redux";

interface IProps {
  product: IProduct;
}

const Favorite: FC<IProps> = ({ product }) => {
  const { _id: itemId } = product;

  const { userFavoriteList } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const addFavorite = (): void => {
    if (itemId) {
      let updatedFavorite = Array.from(new Set(userFavoriteList));
      if (!updatedFavorite.includes(itemId)) {
        dispatch(userActions.addFavoriteItem({ item: itemId, add: true, index: null }));
      } else {
        const index = updatedFavorite.findIndex((item) => item === itemId);
        dispatch(userActions.addFavoriteItem({ item: itemId, add: false, index }));
      }
    }
  };

  return (
    <div className={style.favorite}>
      <div className={style.btnFavorite}>
        {itemId &&
          (userFavoriteList?.includes(itemId)
              ? (<FavoriteIcon onClick={addFavorite} />)
              : (<FavoriteBorderIcon onClick={addFavorite} />)
          )
        }
      </div>
    </div>
  );
};

export { Favorite };
