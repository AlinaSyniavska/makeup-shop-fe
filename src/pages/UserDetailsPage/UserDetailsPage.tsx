import {FC, useEffect, useState} from "react";

import {User} from "../../components";
import {localStorageItemsEnum} from "../../constants";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {IUser} from "../../interfaces";
import {userActions} from "../../redux";
import style from './UserDetailsPage.module.css'

const UserDetailsPage: FC = () => {
    const dispatch = useAppDispatch();
    const {formErrors} = useAppSelector(state => state.userReducer);

    const [logUser, setLogUser] = useState<IUser>();
    const [logErrors, setLogErrors] = useState<string>('');
    const idUser = localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER)  as String;

    useEffect(() => {
        dispatch(userActions.getById({id: idUser})).then((data) => setLogUser(data.payload as IUser));
    }, [])

    useEffect(() => {
        setLogErrors(formErrors.error);
    }, [formErrors])

    return (
        <div className={style.userDetailsContainer}>
            <h2>User Info</h2>
            {
                logErrors && <div className={style.errorMsg}>{logErrors}</div>
            }
            {
                !logErrors && <User user={logUser as IUser}/>
            }
        </div>
    );
};

export {UserDetailsPage};