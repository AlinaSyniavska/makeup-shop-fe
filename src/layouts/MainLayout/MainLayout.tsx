import {FC, useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";

import {Header, Pagination} from "../../components";
import style from './MainLayout.module.css';

const MainLayout: FC = () => {
    const {pathname} = useLocation();
    const [isAuthPath, setIsAuthPath] = useState<boolean>(false);

    useEffect(() => {
        pathname.includes('/auth') ? setIsAuthPath(true) : setIsAuthPath(false);
    }, [pathname])

    return (
        <div className={style.bodyWrap}>
            <div className={style.wrap}>
                <Header/>
                {
                    !isAuthPath && <Pagination/>
                }
                <Outlet/>
            </div>
        </div>
    );
};

export {MainLayout};