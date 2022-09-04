import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {joiResolver} from "@hookform/resolvers/joi";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {IUser} from "../../interfaces";
import {userValidator} from "../../validators";
import {userActions} from "../../redux";
import style from './../AuthForm/AuthForm.module.css'

const RegisterForm: FC = () => {
    const {register, reset, handleSubmit, setValue, formState: {errors, isValid}} = useForm<IUser>({
        resolver: joiResolver(userValidator),
        mode: 'onTouched'
    });

    const [errorsFromForm, setErrors] = useState<any>({});
    const [isRegister, setIsRegister] = useState(false);
    const {pathname} = useLocation();
    const location = useLocation();

    const navigate = useNavigate();
    const {formErrors, registerError, userForUpdate} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userForUpdate) {
            const {name, age, phone, email} = userForUpdate;
            setValue('name', name);
            setValue('age', age);
            setValue('phone', phone);
            setValue('email', email);
        }
    }, [userForUpdate])

    useEffect(() => {
        pathname === '/auth/register' ? setIsRegister(true) : setIsRegister(false)
    }, [pathname])

    const submitForm = async (user: IUser) => {
        const updatedUser = Object.assign(user);

        if (!isRegister) {
            delete updatedUser['email'];
        }

        try {
            if (isRegister) {
                await dispatch(userActions.registerUser({user}));
                if (!registerError) {
                    navigate('/auth/login');
                }
            } else {
                if (userForUpdate) {
                    const {_id} = userForUpdate;
                    await dispatch(userActions.updateById({id: _id, user: updatedUser}));
                    navigate('/users' + location.search, {state: updatedUser});
                }
            }
            reset();
        } catch (e: any) {
            console.error(e.response.data);
            setErrors(e.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitForm)} className={style.authForm}>
            <div>
                <label>Name
                    <input type={'text'} placeholder={'name  '} {...register('name')}/>
                </label>
            </div>
            {errors.name && <span>{errors.name.message}</span>}
            <div>
                <label>Age
                    <input type={'text'} placeholder={'age  '} {...register('age')}/>
                </label>
            </div>
            {errors.age && <span>{errors.age.message}</span>}

            <div>
                <label>Email
                    <input type={'text'} placeholder={'email  '} {...register('email')} disabled={!isRegister}/>
                </label>
            </div>
            {errors.email && <span>{errors.email.message}</span>}

            <div>
                <label>Phone
                    <input type={'text'} placeholder={'phone  '} {...register('phone')}/>
                </label>
            </div>
            {errors.phone && <span>{errors.phone.message}</span>}

            {
                isRegister &&
                <div>
                    <label>Password
                        <input type={'password'} placeholder={'password'} {...register('password')}
                               disabled={!isRegister} required={true}/>
                    </label>
                </div>
            }
            {errors.password && <span>{errors.password.message}</span>}

            <button disabled={!isValid && isRegister}>{userForUpdate ? 'Save Update' : 'Register'}</button>

            <div>
                <div>{formErrors.name && <div>Error name: {formErrors.name[0]}</div>}</div>
                <div>{formErrors.age && <div>Error age: {formErrors.age[0]}</div>}</div>
                <div>{formErrors.email && <div>Error email: {formErrors.email[0]}</div>}</div>
                <div>{formErrors.phone && <div>Error phone: {formErrors.phone[0]}</div>}</div>
                <div>{formErrors.password && <div>Error password: {formErrors.password[0]}</div>}</div>
            </div>
        </form>
    );
};

export {RegisterForm};