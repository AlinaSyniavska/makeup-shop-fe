import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {ILogin} from "../../interfaces";
import {authActions, userActions} from "../../redux";
import style from './AuthForm.module.css';

const AuthForm: FC = () => {
    const {register, handleSubmit} = useForm<ILogin>({
        mode: 'all'
    });

    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>({});

    const navigate = useNavigate();
    const {pathname} = useLocation();

    const {authStatus, authErrors, isAuth, logUser} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        pathname === '/auth/register' ? setIsLogin(false) : setIsLogin(true);
    }, [pathname])

    useEffect(() => {
        setErrors(authErrors.errors);
    }, [authStatus, authErrors])

    useEffect(() => {
        if (isAuth) {
            navigate('/', {replace: true});
        }
    }, [isAuth])

    useEffect(() => {
        dispatch(userActions.initFavoriteList({list: logUser.favoriteList}));
    }, [logUser])

    const submitForm = async (user: ILogin) => {
        try {
            await dispatch(authActions.login({user}));
        } catch (e: any) {
            console.error(e.response);
            console.log(errors);
        }
    };

    const clearFormErrors = async () => {
        await dispatch(authActions.clearErrors());
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} className={style.authForm}>
            <div>
                <label>Email
                    <input type={'text'} placeholder={'email'} {...register('email')} onChange={clearFormErrors}/>
                </label>
            </div>
            <div>
                <label>Password
                    <input type={'password'} placeholder={'password'} {...register('password')} onChange={clearFormErrors}/>
                </label>
            </div>
            <button>{isLogin ? 'Login' : 'Register'}</button>

            <div className={style.error}>
                <div><b>{authErrors.error}</b></div>
                <div>{authStatus && <span>{authStatus}</span>}</div>
            </div>
        </form>
    );
};

export {AuthForm};