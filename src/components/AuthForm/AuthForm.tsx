import {FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {ILogin} from "../../interfaces";
import {authActions, userActions} from "../../redux";
import style from './AuthForm.module.css';

const AuthForm: FC = () => {
    const {register, handleSubmit} = useForm<ILogin>({
        mode: 'all'
    });
    const navigate = useNavigate();

    const {authStatus, authErrors, isAuth, logUser} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

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
        }
    };

    const clearFormErrors = () => {
        dispatch(authActions.clearErrors());
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} className={style.authForm} onChange={clearFormErrors}>
            <div>
                <label>Email
                    <input type={'text'} placeholder={'email'} {...register('email')}/>
                </label>
            </div>
            <div>
                <label>Password
                    <input type={'password'} placeholder={'password'} {...register('password')}/>
                </label>
            </div>
            <button>Login</button>

            <div className={style.error}>
                <div><b>{authErrors.error}</b></div>
                <div>{authStatus && <span>{authStatus}</span>}</div>
            </div>
        </form>
    );
};

export {AuthForm};