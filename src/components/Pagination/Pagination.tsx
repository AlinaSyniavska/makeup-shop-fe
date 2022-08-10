import {FC} from "react";

import {SelectPerPageForm} from "../SelectPerPageForm/SelectPerPageForm";
import {Pages} from "../Pages/Pages";
import './Pagination.css'

const Pagination: FC = () => {
    return (
        <div>
            <div className={'pgnContainer'}>
                <SelectPerPageForm/>
                <Pages/>
            </div>
        </div>
    );
};

export {Pagination};