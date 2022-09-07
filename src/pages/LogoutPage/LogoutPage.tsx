import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch} from "../../hooks";
import {authActions} from "../../redux";

const LogoutPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('access') as string;

    useEffect(() => {
        dispatch(authActions.logout({access_token: accessToken}));
        navigate('/home');
    }, [dispatch]);

    return (
        <div>

        </div>
    );
};

export {LogoutPage};