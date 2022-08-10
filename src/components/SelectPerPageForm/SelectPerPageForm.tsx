import {ChangeEvent, FC} from "react";

import './SelectPerPage.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";

const SelectPerPageForm: FC = () => {
    const {perPage} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        dispatch(userActions.setPerPage({perPage: e.target.value}));
    }

    return (
        <div>
            <div className={'selectContainer'}>
                <label>Select count
                    <select onChange={onChangeSelect} id={'perPage'} name={'perPage'} value={perPage}>
                        <option value={"3"}>3</option>
                        <option value={"5"}>5</option>
                        <option value={"10"}>10</option>
                        <option value={"20"}>20</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export {SelectPerPageForm};