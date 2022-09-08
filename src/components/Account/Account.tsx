import {FC} from "react";
import {NavLink} from "react-router-dom";

import {UserAvatar} from "../UserAvatar/UserAvatar";
import {Cart} from "../Cart/Cart";
import style from './Account.module.css';
import {useAppSelector} from "../../hooks";

const Account: FC = () => {

    const {isAuth} = useAppSelector(state => state.authReducer);

    return (
        <div>
            <div className={style.accountContainer} aria-disabled={!isAuth}>
                <UserAvatar/>
                <Cart/>
                <NavLink hidden={!isAuth} to="auth/logout">Logout</NavLink>
            </div>
        </div>
    );
};

export {Account};