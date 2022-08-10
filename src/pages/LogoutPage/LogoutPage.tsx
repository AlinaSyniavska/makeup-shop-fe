import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import {IUser} from "../../interfaces";

const LogoutPage: FC = () => {
    const {users} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('access') as string;
    const idLogoutUser = localStorage.getItem('idLoginUser') as string;

    const logoutUser = users.find(u => u._id === idLogoutUser);

    useEffect(() => {
        dispatch(authActions.logout({user: {...logoutUser} as IUser, access: accessToken}));
        navigate('/auth/login');
    }, [dispatch]);

    return (
        <div>

        </div>
    );
};

export {LogoutPage};