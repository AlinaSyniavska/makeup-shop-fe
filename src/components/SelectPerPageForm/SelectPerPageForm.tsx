import {ChangeEvent, FC} from "react";

import './SelectPerPage.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";

const SelectPerPageForm: FC = () => {
    const {perPage} = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();

    const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        dispatch(productActions.setPerPage({perPage: e.target.value}));
    }

    return (
        <div>
            <div className={'selectContainer'}>
                <label>Select count
                    <select onChange={onChangeSelect} id={'perPage'} name={'perPage'} value={perPage}>
                        <option value={"10"}>10</option>
                        <option value={"20"}>20</option>
                        <option value={"50"}>50</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export {SelectPerPageForm};