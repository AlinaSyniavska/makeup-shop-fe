import {FC} from "react";
import {NavLink} from "react-router-dom";

import {UserAvatar} from "../UserAvatar/UserAvatar";
import {Cart} from "../Cart/Cart";
import style from './Account.module.css';
import {useAppSelector} from "../../hooks";
import {localStorageItemsEnum} from "../../constants";

const Account: FC = () => {

    const {isAuth} = useAppSelector(state => state.authReducer);
    const idUser = localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER);

    return (
        <div>
            <div className={style.accountContainer} aria-disabled={!isAuth}>
                <NavLink hidden={!isAuth} to={`users/favoriteList/${idUser}`}>Favorite List</NavLink>
                <NavLink to={`users/${idUser}`}><UserAvatar/></NavLink>
                <Cart/>
                <NavLink hidden={!isAuth} to="auth/logout">Logout</NavLink>
            </div>
        </div>
    );
};

export {Account};