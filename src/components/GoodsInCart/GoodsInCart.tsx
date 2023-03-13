import { FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import style from "./GoodsInCart.module.css";
import { IProduct } from "../../interfaces";
import { SingleGoods } from "../SingleGoods/SingleGoods";
import { localStorageItemsEnum } from "../../constants";
import { cartActions } from "../../redux";
import { localStorageHelper, productHelper } from "../../helpers";

const GoodsInCart: FC = () => {
  const { goods } = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const [cartOfGoods, setCartOfGoods] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const cart = localStorageHelper.getArrayFromLocalStorage(localStorageItemsEnum.CART);
    setCartOfGoods(cart);
  }, [goods]);

  const makeOrder = async () => {
    const order = localStorageHelper.getArrayFromLocalStorage(localStorageItemsEnum.ORDER);
    const orderForDB = productHelper.prepareOrderForDB(order, total);

    await dispatch(cartActions.sendOrderToDB({ orderForDB }));
  };

  return (
    <div>
      <div className={style.goodsContainer}>
        {cartOfGoods.map((item, index) => (
          <SingleGoods key={item._id} item={item} index={index} setTotal={setTotal}/>
        ))}
      </div>

      <div className={style.order}>
        <div className={style.totalCost}>
          Total Cost: <span>{total.toFixed(2)}</span>
        </div>
        <button className={style.totalCost} onClick={makeOrder}>
          ORDER
        </button>
      </div>
    </div>
  );
};

export { GoodsInCart };
