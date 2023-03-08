import { FC, useEffect, useState } from "react";

import style from "./Cart.module.css";
import { useAppSelector } from "../../hooks";
import { NavLink } from "react-router-dom";
import { localStorageItemsEnum } from "../../constants";
import { IProductOrdered } from "../../interfaces";
import { localStorageService } from "../../services";

const Cart: FC = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const { goods, userOrder } = useAppSelector((state) => state.cartReducer);

  const [numberOfGoods, setQNumberOfGoods] = useState<number>(0);

  useEffect(() => {
    const order = localStorageService.getArrayFromLocalStorage(localStorageItemsEnum.ORDER) as IProductOrdered[];
    let initialValue = 0;
    setQNumberOfGoods(
      order.reduce((accumulator: number, currentValue: IProductOrdered) => accumulator + currentValue.count,
        initialValue
      )
    );
  }, [goods, userOrder]);

  return (
    <div>
      <NavLink to="cart">
        <div className={style.cartContainer}>
          <div className={style.cart}>
            <img
              src={require("./../../resource/shopping-cart.png")}
              alt={"avatar"}
            />
          </div>

          {isAuth && (
            <div className={style.numberOfGoods}>
              <span>{numberOfGoods}</span>
            </div>
          )}
        </div>
      </NavLink>
    </div>
  );
};

export { Cart };
