import {FC} from "react";
import {CreateProductForm, Products} from "../../components";

const ProductPage: FC = () => {
    return (
        <div>
            <CreateProductForm/>
            <hr/>
            <Products/>
        </div>
    );
};

export {ProductPage};