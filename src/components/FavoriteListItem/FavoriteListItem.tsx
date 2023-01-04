import {FC, useEffect} from "react";

import {IProduct} from "../../interfaces";
import style from './FavoriteListItem.module.css';
import {userActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {localStorageItemsEnum} from "../../constants";

interface IProps {
    item: IProduct
}

const FavoriteListItem: FC<IProps> = ({item}) => {

    const {_id: itemId, name, price, priceSign, imageLink} = item;
    const {userFavoriteList} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const deleteFavoriteListItem = () => {
        if (itemId) {
            const index = userFavoriteList.findIndex(item => item === itemId);
            dispatch(userActions.addFavoriteItem({item: itemId, add: false, index}));
        }
    }

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
                <button onClick={deleteFavoriteListItem} className={style.btnDeleteItem}>DELETE</button>
            </div>
        </div>
    );
};

export {FavoriteListItem};