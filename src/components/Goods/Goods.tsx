import {FC, useEffect, useState} from "react";

import {useAppSelector} from "../../hooks";
import style from './Goods.module.css';
import {IProduct} from "../../interfaces";
import {SingleGoods} from "../SingleGoods/SingleGoods";
import {localStorageItemsEnum} from "../../constants/localStorageItems";

const Goods: FC = () => {

    const {goods} = useAppSelector(state => state.cartReducer);

    const [cartGoods, setCartGoods] = useState<IProduct[]>([]);
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        const cart = localStorage.getItem(localStorageItemsEnum.CART);
        let cartFromLocalStorage = cart !== null ? JSON.parse(cart) : [];

        setCartGoods(cartFromLocalStorage);
    }, [goods])

    return (
        <div>
            <div className={style.goodsContainer}>
                {
                    cartGoods.map((item, index) => <SingleGoods
                        key={item._id}
                        item={item}
                        index={index}
                        setTotal={setTotal}
                    />)
                }
            </div>

            {total}
        </div>
    );
};

export {Goods};