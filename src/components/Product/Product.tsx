import {FC, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {IProduct, IRating} from "../../interfaces";
import './Product.css';
import {productActions} from "../../redux";
import {useAppDispatch} from "../../hooks";
import {StarRating} from "../StarRating/StarRating";

interface IProps {
    product: IProduct,
}

const Product: FC<IProps> = ({product}) => {

    const [isProductCreate, setIsProductCreate] = useState(true);
    const [isProductAvailable, setIsProductAvailable] = useState(true);
    const {pathname} = useLocation();
    const dispatch = useAppDispatch();

    const rating: IRating = {
        ratingValue: Number(product.rating),
        iconsCount: 5,
        size:20,
        readonly: true,
        fillColor: 'lightpink',
        emptyColor: '#999999',
    }

    useEffect(() => {
        pathname === '/admin/product' ? setIsProductCreate(true) : setIsProductCreate(false)
    }, [pathname])

    useEffect(() => {
        if (product.total > 0) {
            setIsProductAvailable(true);
        } else {
            setIsProductAvailable(false);
        }
    }, [product.total])

    const addToCart = () => {

    }

    const toUp = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div>
            <div aria-disabled={!isProductAvailable} className={'product_wrap'}>
                <div className={'product'}>
                    <div className={'product_img'}>
                        <img src={product.imageLink} alt={product.name}/>
                    </div>
                    <StarRating ratingProps={rating}/>
                    <p className={'product_name'}>{product.name}</p>
                    <p className={'product_brand'}>{product.brand}</p>
                    <p className={'product_price'}>{product.price} {product.priceSign}</p>
                </div>

                {
                    isProductCreate &&
                    <button onClick={() => {
                        dispatch(productActions.setProductForUpdate({product}));
                        toUp();
                    }}>
                        Update
                    </button>
                }

                {
                    isProductCreate &&
                    <button onClick={() => {
                        dispatch(productActions.deleteById({id: product._id as String}));
                    }}>
                        Delete
                    </button>
                }

                {
                    !isProductCreate &&
                    <button disabled={!isProductAvailable} onClick={addToCart}>
                        Buy
                    </button>
                }
            </div>
        </div>
    );
};

export {Product};