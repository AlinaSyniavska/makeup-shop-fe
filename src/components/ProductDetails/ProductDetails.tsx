import React, {FC, useEffect, useState} from "react";

import {IProduct} from "../../interfaces";
import style from './ProductDetails.module.css';
import {StarRating} from "../StarRating/StarRating";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {cartActions, userActions} from "../../redux";
import {Favorite} from "../Favorite/Favorite";
import {localStorageItemsEnum, ratingColorEnum} from "../../constants";
import {commonHelper, productHelper} from "../../helpers";

interface IProps {
    singleProduct: IProduct,
}

const ProductDetails: FC<IProps> = ({singleProduct}) => {
    const {name, brand, productType, total, price, priceSign, rating, imageLink, tagList, description} = singleProduct;
    const {isAuth} = useAppSelector(state => state.authReducer);
    const {userFavoriteList} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const [isProductAvailable, setIsProductAvailable] = useState(true);

    const addToCart = (): void => {
        dispatch(cartActions.addToCart({goods: singleProduct}));
    }

    useEffect(() => {
        setIsProductAvailable(productHelper.checkIsProductAvailable(total));
    }, [total])

    useEffect(() => {
        if (localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) !== null && isAuth) {
            dispatch(userActions.getFavoriteListById({id: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER)!}));
        }
    }, [isAuth])

    useEffect(() => {
        if (localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) !== null && isAuth) {
            dispatch(userActions.updateById({
                id: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER)!,
                user: {favoriteList: Array.from(new Set(userFavoriteList))}
            }));
        }
    }, [userFavoriteList, isAuth])

    return (
        <div>

            <div className={style.singleProductContainer}>
                <div className={style.sectionInfo}>
                    <div className={style.headerContainer}>
                        <p className={`${style.smallText} ${style.colorText}`}>{brand}
                            <span className={style.greyText}> / {productType}</span>
                        </p>
                        <p className={style.largeText}>{name}</p>
                        <StarRating ratingProps={commonHelper.makeRatingProps(rating, ratingColorEnum.MAIN_RATING_COLOR)}/>
                    </div>
                    <div className={style.mainContainer}>
                        <p className={style.regularText}>
                            <span className={style.boldText}>Description: </span>
                            {description}
                        </p>
                        <p className={style.regularText}>
                            <span className={style.boldText}>Classification: </span>
                            {tagList?.join(', ')}
                        </p>
                    </div>
                </div>

                <div className={style.sectionImg}>
                    <img src={imageLink} alt={name}/>
                    <div className={'singleFavorite'}>
                        <Favorite product={singleProduct}/>
                    </div>
                </div>


                <div className={style.sectionPrice}>
                    <div className={style.headerContainer}>
                        <p className={`${style.largePlusText} ${style.colorText} ${style.boldText}`}>{price} {priceSign}</p>
                        <p className={`${style.largeText} ${style.boldText}`}>Total: {total}</p>
                    </div>
                    <div className={style.mainContainer}>
                        {
                            isAuth &&
                            <button disabled={!isProductAvailable} onClick={addToCart}>
                                Buy
                            </button>
                        }
                    </div>
                </div>

            </div>

        </div>
    );
};

export {ProductDetails};