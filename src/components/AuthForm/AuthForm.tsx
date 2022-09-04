import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {ILogin} from "../../interfaces";
import {authActions} from "../../redux";
import style from './AuthForm.module.css';

const AuthForm: FC = () => {
    const {register, handleSubmit} = useForm<ILogin>();

    const [isLogin, setIsLogin] = useState<boolean>(false);
    const {pathname} = useLocation();

    const {loginError} = useAppSelector(state => state.authReducer);
    const [errors, setErrors] = useState<any>({});

    const navigate = useNavigate();
    const {authStatus, authErrors} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        pathname === '/auth/register' ? setIsLogin(false) : setIsLogin(true);
    }, [pathname])

    const submitForm = async (user: ILogin) => {
        // const {location} = state as any;

        try {
            await dispatch(authActions.login({user}));
            // navigate(location.pathname || '/', {replace: true});
            navigate('/', {replace: true});
        } catch (e: any) {
            console.error(e.response);
            setErrors(e.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitForm)} className={style.authForm}>
            <div>
                <label>Email
                    <input type={'text'} placeholder={'email  '} {...register('email')}/>
                </label>
            </div>
            <div>
                <label>Password
                    <input type={'password'} placeholder={'password'} {...register('password')}/>
                </label>
            </div>
            <button>{isLogin ? 'Login' : 'Register'}</button>

            <div>
                <div>{authStatus && <b>{authStatus}</b>}</div>
                <div>{authErrors.email && <div>Error email: {authErrors.email[0]}</div>}</div>
                <div>{authErrors.password && <div>Error password: {authErrors.password[0]}</div>}</div>
            </div>

            <div>
                <div>{errors?.email && <span>{errors.email[0]}</span>}</div>
                <div>{errors?.password && <span>{errors.password[0]}</span>}</div>
                {loginError && <span>Wrong username or password</span>}
            </div>
        </form>
    );
};

export {AuthForm};