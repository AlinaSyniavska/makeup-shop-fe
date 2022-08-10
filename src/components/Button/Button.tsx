import {FC} from "react";

import './Button.css'
import {Link} from "react-router-dom";

interface IProps {
    to: string,
    state: any,
    children: string,
}

const Button:FC<IProps> = ({to, state, children, ...arg}) => {
    return (
        <Link to={to} state={state}>
            <button {...arg}>{children}</button>
        </Link>
    );
};

export {Button};