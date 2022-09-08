import {FC, useEffect, useState} from "react";

import style from "./Cart.module.css";
import {useAppSelector} from "../../hooks";
import {NavLink} from "react-router-dom";
import {localStorageItemsEnum} from "../../constants/localStorageItems";


const Cart: FC = () => {
    const {isAuth} = useAppSelector(state => state.authReducer);
    const {goods, userOrder} = useAppSelector(state => state.cartReducer);

    const [quantityGoods, setQuantityGoods] = useState<number>(0);

    useEffect(() => {
        const order = localStorage.getItem(localStorageItemsEnum.ORDER);
        let orderFromLocalStorage = order !== null ? JSON.parse(order) : [];
        let initialValue = 0;
        setQuantityGoods(orderFromLocalStorage.reduce(
            (accumulator: number, currentValue: any) => accumulator + currentValue.count,
            initialValue
        ));
    }, [goods, userOrder])

    return (
        <div>

            <NavLink to="cart">
                <div className={style.cartContainer}>
                    <div className={style.cart}>
                        <img src={require("./../../resource/shopping-cart.png")} alt={'avatar'}/>
                    </div>

                    {
                        isAuth && <div className={style.quantityGoods}>
                            <span>{quantityGoods}</span>
                        </div>
                    }
                </div>
            </NavLink>

        </div>
    );
};

export {Cart};