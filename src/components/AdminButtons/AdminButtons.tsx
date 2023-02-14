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

    return (
        <React.Fragment>
            <button onClick={() => {
                dispatch(productActions.setProductForUpdate({product}));
                commonHelper.scrollToUp();
            }}>
                Update
            </button>

            <button onClick={() => dispatch(productActions.deleteById({id: product._id as String}))}>
                Delete
            </button>
        </React.Fragment>
    );
};

export {AdminButtons};
