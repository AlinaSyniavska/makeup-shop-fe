import {FC, useEffect} from "react";
import {useLocation} from "react-router-dom";

import {ProductDetails} from "../../components";
import {IProduct} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";

const ProductDetailsPage: FC = () => {
    const {state, pathname} = useLocation();
    let singleProduct = state as IProduct

    const {productDetails} = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!singleProduct) {
            const path = pathname.split('/');

            dispatch(productActions.getById({id: path[path.length-1]}))
        }
    }, [singleProduct])

    useEffect(() => {
        singleProduct = Object.assign({}, productDetails) as IProduct;
    }, [productDetails])

    return (
        <div>
            <ProductDetails singleProduct={singleProduct}/>
        </div>
    );
};

export {ProductDetailsPage};