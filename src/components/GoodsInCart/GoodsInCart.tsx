import { FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import style from "./GoodsInCart.module.css";
import { ICart, IProduct } from "../../interfaces";
import { SingleGoods } from "../SingleGoods/SingleGoods";
import { cartStatusEnum, localStorageItemsEnum } from "../../constants";
import { cartActions } from "../../redux";

const GoodsInCart: FC = () => {
  console.log('GoodsInCart')
  const { goods } = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();

  const [cartGoods, setCartGoods] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const cart = localStorage.getItem(localStorageItemsEnum.CART);
    let cartFromLocalStorage = cart !== null ? JSON.parse(cart) : [];

    setCartGoods(cartFromLocalStorage);
  }, [goods]);

  const makeOrder = async () => {
    // await dispatch(cartActions.cleanOrderStatus());
    const order = localStorage.getItem(localStorageItemsEnum.ORDER);
    let orderFromLocalStorage = order !== null ? JSON.parse(order) : [];

    const orderToDB = {
      products: orderFromLocalStorage,
      userId: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER),
      status: cartStatusEnum.IN_PROGRESS,
      sum: Number(total.toFixed(2)),
    } as ICart;

    // console.log(orderToDB);

    await dispatch(cartActions.sendOrderToDB({ orderToDB }));
  };

  return (
    <div>
      <div className={style.goodsContainer}>
        {cartGoods.map((item, index) => (
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
