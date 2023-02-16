import React from "react";
import {FC} from "react";

import {productActions} from "../../redux";
import {commonHelper} from "../../helpers";
import {useAppDispatch} from "../../hooks";
import {IProduct} from "../../interfaces";

interface IProps {
    product: IProduct,
}

const AdminButtons: FC<IProps> = ({product}) => {
    const dispatch = useAppDispatch();

    const updateProduct = () => {
        dispatch(productActions.setProductForUpdate({product}));
        commonHelper.scrollToUp();
    }

    const deleteProduct = () => {
        dispatch(productActions.deleteById({id: product._id as String}));
    }

    return (
        <React.Fragment>
            <button onClick={updateProduct}>Update</button>
            <button onClick={deleteProduct}>Delete</button>
        </React.Fragment>
    );
};

export {AdminButtons};
