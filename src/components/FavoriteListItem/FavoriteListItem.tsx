import React, {FC, useEffect, useState} from "react";

import {IProduct} from "../../interfaces";
import style from './FavoriteListItem.module.css';
import {cartActions, userActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {localStorageItemsEnum} from "../../constants";

interface IProps {
    item: IProduct
}

const FavoriteListItem: FC<IProps> = ({item}) => {

    const {_id: itemId, name, price, priceSign, imageLink, total} = item;
    const {userFavoriteList} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();



    useEffect(() => {
        if (localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) !== null) {
            (async () => {
                await dispatch(userActions.updateById({
                    id: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER)!,
                    user: {favoriteList: Array.from(new Set(userFavoriteList))}
                }));

                await dispatch(userActions.getPopulatedUserById({id: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER)!}));
            })();
        }
    }, [userFavoriteList])

    const [isProductAvailable, setIsProductAvailable] = useState(true);

    useEffect(() => {
        setIsProductAvailable(checkIsProductAvailable(total));
    }, [total])

    const checkIsProductAvailable = (totalNumber: number): boolean => {
        return totalNumber > 0;
    }

    const deleteFavoriteListItem = (): void => {
        if (itemId) {
            const index = userFavoriteList.findIndex(item => item === itemId);
            dispatch(userActions.addFavoriteItem({item: itemId, add: false, index}));
        }
    }

    const addToCart = (): void => {
        dispatch(cartActions.addToCart({goods: item}));
    }

    return (
        <div>
            <div className={style.favoriteListItem}>
                <div className={style.itemImage}>
                    <img src={imageLink} alt={name}/>
                </div>
                <div className={style.itemInfo}>
                    <p>{name}</p>
                    <p>{price} {priceSign}</p>
                </div>
                <button onClick={deleteFavoriteListItem}>
                    DELETE
                </button>
                <button id={'btnBuy'} disabled={!isProductAvailable} onClick={addToCart}>
                    BUY
                </button>
            </div>
        </div>
    );
};

export {FavoriteListItem};