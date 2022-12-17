import {FC, useEffect, useState} from "react";

import {User} from "../../components";
import {localStorageItemsEnum} from "../../constants";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {IUser} from "../../interfaces";
import {userActions} from "../../redux";
import style from './UserDetailsPage.module.css'

const UserDetailsPage: FC = () => {
    const dispatch = useAppDispatch();
    const {formErrors, userForUpdate} = useAppSelector(state => state.userReducer);

    const [logUser, setLogUser] = useState<IUser>();
    const [logErrors, setLogErrors] = useState<string>('');
    const idUser = localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) as String;

    useEffect(() => {
        if (localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) !== null) {
            dispatch(userActions.getById({id: idUser})).then((data) => setLogUser(data.payload as IUser));
        }
    }, [userForUpdate])

    useEffect(() => {
        setLogErrors(formErrors.error);
    }, [formErrors])

    return (
        <div className={style.userDetailsContainer}>
            <h2>User Info</h2>
            <hr/>
            {
                logErrors && <div className={style.errorMsg}>{logErrors}</div>
            }
            {
                !logErrors && logUser && <User user={logUser as IUser}/>
            }
        </div>
    );
};

export {UserDetailsPage};