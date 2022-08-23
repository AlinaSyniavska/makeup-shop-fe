import {FC} from "react";
import {NavLink} from "react-router-dom";

import './Header.css';

const Header: FC = () => {
    return (
        <div>
            <div className={'headerContainer'}>
                <NavLink to='home'>Home</NavLink>
                <NavLink to='categories'>Categories</NavLink>
                <NavLink to="auth/login">Login</NavLink>
                <NavLink to="auth/logout">Logout</NavLink>
                <NavLink to='auth/register'>To Register</NavLink>
            </div>
        </div>
    );
};

export {Header};