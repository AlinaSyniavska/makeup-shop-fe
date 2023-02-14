import React, {FC, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

import {IProduct} from "../../interfaces";
import './Product.css';
import {cartActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {StarRating} from "../StarRating/StarRating";
import {Favorite} from "../Favorite/Favorite";
import {commonHelper, productHelper} from "../../helpers";
import {ratingColorEnum} from "../../constants";
import {AdminButtons} from "../AdminButtons/AdminButtons";

interface IProps {
    product: IProduct,
}

const Product: FC<IProps> = ({product}) => {
    const [isProductCreate, setIsProductCreate] = useState(true);
    const [isProductAvailable, setIsProductAvailable] = useState(true);
    const {pathname} = useLocation();

    const dispatch = useAppDispatch();
    const {isAuth} = useAppSelector(state => state.authReducer);

    useEffect(() => {
        pathname === '/admin/product' ? setIsProductCreate(true) : setIsProductCreate(false)
    }, [pathname])

    useEffect(() => {
        setIsProductAvailable(productHelper.checkIsProductAvailable(product.total));
    }, [product.total])


    const addToCart = () => {
        dispatch(cartActions.addToCart({goods: product}));
    }

    const preventDefaultLinkAction = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const btnBuyList = document.getElementsByClassName('btnBuy');
        const btnFavoriteList = document.querySelectorAll('.Favorite_btnFavorite__RDx0q>svg,.Favorite_btnFavorite__RDx0q>svg>path');

        const btnBuy = productHelper.searchPressedButton(btnBuyList, event.target);
        const btnFavorite = productHelper.searchPressedButton(btnFavoriteList, event.target);

        if (isProductCreate || event.target === btnBuy || event.target === btnFavorite) {
            event.preventDefault();
        }
    }

    return (
        <div>
            <Link to={`/home/product/${product._id}`} target="_blank" onClick={preventDefaultLinkAction}>
                <div aria-disabled={!isProductAvailable} className={'product_wrap'}>
                    <div className={'product'}>
                        <div className={'product_img'}>
                            <img src={product.imageLink} alt={product.name}/>
                        </div>
                        <Favorite product={product}/>
                        <StarRating ratingProps={commonHelper.makeRatingProps(product.rating, ratingColorEnum.MAIN_RATING_COLOR)}/>
                        <p className={'product_name'}>{product.name}</p>
                        <p className={'product_brand'}>{product.brand}</p>
                        <p className={'product_price'}>{product.price} {product.priceSign}</p>
                    </div>

                    {
                        (!isProductCreate && isAuth) &&
                        <button className={'btnBuy'} disabled={!isProductAvailable} onClick={addToCart}>
                            Buy
                        </button>
                    }

                    {
                        isProductCreate && <AdminButtons product={product}/>
                    }
                </div>
            </Link>

        </div>
    );
};

export {Product};