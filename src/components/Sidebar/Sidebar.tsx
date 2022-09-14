import {FC} from "react";

import {SortComponent} from "../SortComponent/SortComponent";
import {FilterComponent} from "../FilterComponent/FilterComponent";
import style from './Sidebar.module.css'

const Sidebar: FC = () => {

    return (
        <div className={style.wrap}>
            <SortComponent/>
            <FilterComponent/>
        </div>
    );
};

export {Sidebar};