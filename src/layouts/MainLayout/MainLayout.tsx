import {FC, useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";

import {Account, Header, Pagination} from "../../components";
import style from './MainLayout.module.css';

const MainLayout: FC = () => {
    const {pathname} = useLocation();
    const [isAuthPath, setIsAuthPath] = useState<boolean>(false);
    const [isCartPath, setIsCartPath] = useState<boolean>(false);

    useEffect(() => {
        pathname.includes('/auth') ? setIsAuthPath(true) : setIsAuthPath(false);
        pathname.includes('/cart') ? setIsCartPath(true) : setIsCartPath(false);
    }, [pathname])

    return (
        <div className={style.bodyWrap}>
            <div className={style.wrap}>
                <Header/>

                <Account/>

                <Outlet/>
                {
                    (!isAuthPath && !isCartPath) && <Pagination/>
                }
            </div>
        </div>
    );
};

export {MainLayout};