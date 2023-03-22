import { FC } from "react";

import style from "./User.module.css";
import { IUser } from "../../interfaces";
import { useAppDispatch } from "../../hooks";
import { userActions } from "../../redux";

interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({user}) => {
    const {name, surname, gender, age, email, phone} = user;
    const dispatch = useAppDispatch();

    return (
        <div className={style.user}>
            <div>Name: {name} {surname}</div>
            <div>Age: {age}</div>
            <div>Gender: {gender}</div>
            <div>Phone: {phone}</div>
            <div>Email: {email}</div>

            <button className={style.btnUpdate} onClick={() => dispatch(userActions.setUserForUpdate({user}))}>
                Update
            </button>
        </div>
    );
};

export { User };
