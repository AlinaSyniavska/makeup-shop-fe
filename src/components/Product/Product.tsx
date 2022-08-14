import {FC, useEffect, useState} from "react";

import {IProduct} from "../../interfaces";
import './Product.css';
import {useLocation} from "react-router-dom";
import {productActions} from "../../redux";
import {useAppDispatch} from "../../hooks";

interface IProps {
    product: IProduct,
}

const Product: FC<IProps> = ({product}) => {

    const [isProductCreate, setIsProductCreate] = useState(true);
    const [isProductAvailable, setIsProductAvailable] = useState(true);
    const {pathname} = useLocation();
    const dispatch = useAppDispatch();

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

    return (
        <div>
            <div aria-disabled={true} className={'product_wrap'}>
                <div aria-disabled={true} className={'product'}>
                    <div className={'product_img'}>
                        <img src={product.imageLink} alt={product.name}/>
                    </div>
                    <p className={'product_rating'}>{product.rating}</p>
                    <p className={'product_name'}>{product.name}</p>
                    <p className={'product_brand'}>{product.brand}</p>
                    <p className={'product_price'}>{product.price} {product.priceSign}</p>
                </div>

                {
                    isProductCreate &&
                    <button onClick={() => {
                        dispatch(productActions.setProductForUpdate({product}));
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
                    <button onClick={addToCart}>
                        Buy
                    </button>
                }
            </div>
        </div>
    );
};

export {Product};