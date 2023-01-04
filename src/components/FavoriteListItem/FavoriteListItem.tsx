import {FC} from "react";

import {IProduct} from "../../interfaces";
import style from './FavoriteListItem.module.css';

interface IProps {
    item: IProduct
}

const FavoriteListItem: FC<IProps> = ({item}) => {

    const {name, price, priceSign, imageLink} = item;

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
                <button className={style.btnDeleteItem}>DELETE</button>
            </div>
        </div>
    );
};

export {FavoriteListItem};