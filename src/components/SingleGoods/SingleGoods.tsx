import React, { FC, useEffect, useState } from "react";

import style from "./SingleGoods.module.css";
import { IProduct, IProductOrdered } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { cartActions } from "../../redux";
import { localStorageHelper } from "../../helpers";
import { localStorageItemsEnum } from "../../constants";

interface IProps {
  item: IProduct;
  index: number;
  setTotal: Function;
}

const SingleGoods: FC<IProps> = ({ item, index, setTotal }) => {
  const { goods, userOrder } = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const [countGoods, setCountGoods] = useState<number>(1);
  const [deletedGoods, setDeletedGoods] = useState<boolean>(false);

  useEffect(() => {
    const order = localStorageHelper.getArrayFromLocalStorage(localStorageItemsEnum.ORDER);

    if (!deletedGoods) {
      const singleGoods = order.find((orderItem: IProductOrdered) => orderItem.productId === item._id);
      setCountGoods(singleGoods.count);
    }

    const totalCostArray = order.map((item: IProductOrdered) => item.count * item.cost);

    setTotal(
        totalCostArray.reduce((accumulator: number, currentValue: number): number => {
        return accumulator + currentValue;
      }, 0)
    );
  }, [goods, userOrder, deletedGoods]);

  const changeCountInc = () => {
    let curCount = countGoods;

    curCount++;
    if (curCount > item.total) {
      curCount = countGoods;
      alert("You cannot order more goods. \nThis quantity is not available.");
    }

    setCountGoods(curCount);
    dispatch(cartActions.changeOrder({ data: { itemId: item._id, curCount } }));
  };

  const changeCountDec = () => {
    let curCount = countGoods;

    curCount--;
    if (curCount <= 0) {
      curCount = countGoods;
    }

    setCountGoods(curCount);
    dispatch(cartActions.changeOrder({ data: { itemId: item._id, curCount } }));
  };

  const deleteItemFromCart = () => {
    setDeletedGoods(true);
    dispatch(cartActions.changeOrderAfterDeleteCartItem({ data: { itemId: item._id } }));
  };

  return (
    <React.Fragment>
      <div className={style.singleGoodsContainer}>
        <div className={style.goodsName}>
          <p>{index + 1}.</p>
          <p>
            {item.name}
            <br />
            {item.brand}
          </p>
        </div>

        <div className={style.orderInfo}>
          <div className={style.goodsQuantity}>
            <button className={style.btnChangeCount} id={"inc"} onClick={changeCountInc}>
              &#11014;
            </button>
            <div className={style.countGoods}>{countGoods}</div>
            <button className={style.btnChangeCount} onClick={changeCountDec}>
              &#11015;
            </button>
          </div>

          <div className={style.goodsPrice}>{item.price}</div>

          <div className={style.goodsTotalCost}>
            {(item.price * countGoods).toFixed(2)} {item.priceSign}
          </div>

          <button onClick={deleteItemFromCart}>DELETE</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export { SingleGoods };
