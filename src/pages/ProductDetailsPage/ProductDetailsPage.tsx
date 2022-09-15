import {FC} from "react";
import {useLocation} from "react-router-dom";

import {ProductDetails} from "../../components";
import {IProduct} from "../../interfaces";

const ProductDetailsPage: FC = () => {
    const {state} = useLocation();

    const singleProduct = state as IProduct

    return (
        <div>
            <ProductDetails singleProduct={singleProduct}/>
        </div>
    );
};

export {ProductDetailsPage};