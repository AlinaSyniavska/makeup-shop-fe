import {FC} from "react";
import {Outlet} from "react-router-dom";

import {Header, Pagination} from "../../components";
import style from './MainLayout.module.css';

const MainLayout: FC = () => {
    return (
        <div className={style.bodyWrap}>
            <div className={style.wrap}>
                <Header/>
                <Pagination/>
                <Outlet/>
            </div>
        </div>
    );
};

export {MainLayout};