import React, { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { IProduct } from "../../interfaces";
import style from "./Product.module.css";
import { useAppSelector } from "../../hooks";
import { StarRating } from "../StarRating/StarRating";
import { Favorite } from "../Favorite/Favorite";
import { commonHelper, productHelper } from "../../helpers";
import { ratingColorEnum } from "../../constants";
import { AdminButtons } from "../AdminButtons/AdminButtons";
import { CustomButtonBuy } from "../CustomButtonBuy/CustomButtonBuy";

interface IProps {
  product: IProduct;
}

const Product: FC<IProps> = ({ product }) => {
  const [isProductCreate, setIsProductCreate] = useState(true);
  const [isProductAvailable, setIsProductAvailable] = useState(true);
  const { pathname } = useLocation();
  const { isAuth } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    pathname === "/admin/product"
      ? setIsProductCreate(true)
      : setIsProductCreate(false);
  }, [pathname]);

  useEffect(() => {
    setIsProductAvailable(productHelper.checkIsProductAvailable(product.total));
  }, [product.total]);

  const preventDefaultLinkAction = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const btnBuyList = document.getElementsByClassName("btnBuy");
    const btnFavoriteList = document.querySelectorAll(".Favorite_btnFavorite__RDx0q>svg,.Favorite_btnFavorite__RDx0q>svg>path"
    );

    const btnBuy = productHelper.searchPressedButton(btnBuyList, event.target);
    const btnFavorite = productHelper.searchPressedButton(
      btnFavoriteList,
      event.target
    );

    if (
      isProductCreate ||
      event.target === btnBuy ||
      event.target === btnFavorite
    ) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <Link
        to={`/home/product/${product._id}`}
        target="_blank"
        onClick={preventDefaultLinkAction}
      >
        <div aria-disabled={!isProductAvailable} className={style.product_wrap}>
          <div className={style.product}>
            <div className={style.product_img}>
              <img src={product.imageLink} alt={product.name} />
            </div>
            <Favorite product={product} />
            <StarRating
              ratingProps={commonHelper.setupRatingProps(
                product.rating,
                ratingColorEnum.MAIN_RATING_COLOR
              )}
            />
            <p className={style.product_name}>{product.name}</p>
            <p className={style.product_brand}>{product.brand}</p>
            <p className={style.product_price}>
              {product.price} {product.priceSign}
            </p>
          </div>

          {!isProductCreate && isAuth && (
            <CustomButtonBuy singleProduct={product} />
          )}

          {isProductCreate && <AdminButtons product={product} />}
        </div>
      </Link>
    </div>
  );
};

export { Product };
