import {FC, useEffect, useState} from "react";

import style from "./UserDetailsPage.module.css";
import { RegisterForm, User } from "../../components";
import { localStorageItemsEnum } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IUser } from "../../interfaces";
import { userActions } from "../../redux";

const UserDetailsPage: FC = () => {
    const {userForUpdate} = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();

    const [logUser, setLogUser] = useState<IUser>();
    const idUser = localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) as String;

    useEffect(() => {
        if (localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) !== null) {
            dispatch(userActions.getById({id: idUser})).then((data) =>
                setLogUser(data.payload as IUser)
            );
        }
    }, [userForUpdate, idUser, dispatch]);

    return (
        <div className={style.userDetailsContainer}>
            <h2>User Info</h2>
            <hr/>

            <div className={style.user}>
                {logUser && <User user={logUser as IUser}/>}

                <div className={style.userEdit} aria-disabled={!userForUpdate}>
                    <RegisterForm/>
                </div>
            </div>
        </div>
    );
};

export { UserDetailsPage };
