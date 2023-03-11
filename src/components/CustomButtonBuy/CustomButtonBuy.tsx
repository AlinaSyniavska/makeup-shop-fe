import React, { useEffect, useState } from "react";
import { FC } from "react";

import { cartActions } from "../../redux";
import { IProduct } from "../../interfaces";
import { useAppDispatch } from "../../hooks";
import { productHelper } from "../../helpers";

interface IProps {
  singleProduct: IProduct;
}

const CustomButtonBuy: FC<IProps> = ({ singleProduct }) => {
  const dispatch = useAppDispatch();
  const [isProductAvailable, setIsProductAvailable] = useState(true);

  useEffect(() => {
    setIsProductAvailable(
      productHelper.checkIsProductAvailable(singleProduct.total)
    );
  }, [singleProduct.total]);

  const addToCart = (): void => {
    dispatch(cartActions.addToCart({ goods: singleProduct }));
  };

  return (
    <React.Fragment>
      <button className={'btnBuy'} disabled={!isProductAvailable} onClick={addToCart}>
        Buy
      </button>
    </React.Fragment>
  );
};

export { CustomButtonBuy };
