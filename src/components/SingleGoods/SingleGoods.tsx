import {FC, MouseEvent, useEffect, useState} from "react";

import {IProduct, IProductOrdered} from "../../interfaces";
import style from './SingleGoods.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {cartActions} from "../../redux";

interface IProps {
    item: IProduct,
    index: number,
    setTotal: Function
}

const SingleGoods: FC<IProps> = ({item, index, setTotal}) => {

    const [countGoods, setCountGoods] = useState<number>(1);
    const {goods, userOrder} = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const order = localStorage.getItem('order');
        let orderFromLocalStorage = order !== null ? JSON.parse(order) : [];

        const singleGoods = orderFromLocalStorage.find((i: IProductOrdered) => i.productId === item._id);
        setCountGoods(singleGoods.count);

        let initialValue = 0;
        setTotal(orderFromLocalStorage.reduce(
            (accumulator: number, currentValue: any) => {
                console.log(accumulator)
                console.log(currentValue.count * item.price)
                console.log('**********')
                return accumulator + currentValue.count * item.price
            },
            initialValue
        ));
    }, [goods, userOrder])


    const changeCountInc = () => {
        let curCount = countGoods;

        curCount++;
        if (curCount > item.total) {
            curCount = countGoods;
            alert("You cannot order more goods. \nThis quantity is not available.");
        }

        setCountGoods(curCount);
        dispatch(cartActions.changeOrder({data: {itemId: item._id, curCount}}));
    }

    const changeCountDec = () => {
        let curCount = countGoods;

        curCount--;
        if (curCount <= 0) {
            curCount = countGoods;
        }

        setCountGoods(curCount);
        dispatch(cartActions.changeOrder({data: {itemId: item._id, curCount}}));
    }

    return (
        <div>

            <div className={style.singleGoodsContainer}>
                <div className={style.goodsName}>
                    <p>{index + 1}.</p>
                    <p>
                        {item.name}
                        <br/>
                        {item.brand} - {item.total}
                    </p>
                </div>

                <div className={style.orderInfo}>
                    <div className={style.goodsQuantity}>
                        <button className={style.btnChangeCount} id={'inc'} onClick={changeCountInc}>&#11014;</button>
                        <div className={style.countGoods}>{countGoods}</div>
                        <button className={style.btnChangeCount} onClick={changeCountDec}>&#11015;</button>
                    </div>

                    <div className={style.goodsPrice}>{item.price}</div>

                    <div className={style.goodsTotalCost}>{item.price * countGoods} {item.priceSign}</div>
                </div>
            </div>
            {/*                {
                    (!isProductCreate && isAuth) &&
                    <button disabled={!isProductAvailable} onClick={addToCart}>
                        Buy
                    </button>
                }*/}


            {/*                {
                    isProductCreate &&
                    <button onClick={() => {
                        dispatch(productActions.deleteById({id: product._id as String}));
                    }}>
                        Delete
                    </button>
                }*/}
        </div>
    );
};

export {SingleGoods};