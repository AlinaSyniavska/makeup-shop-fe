import React, {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {joiResolver} from "@hookform/resolvers/joi";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {IUser} from "../../interfaces";
import {userValidator} from "../../validators";
import {userActions} from "../../redux";
import style from './../AuthForm/AuthForm.module.css'
import {genderEnum} from "../../constants";

const RegisterForm: FC = () => {
    const {register, reset, handleSubmit, setValue, formState: {errors, isValid}} = useForm<IUser>({
        resolver: joiResolver(userValidator),
        mode: 'onTouched'
    });

    const [isRegister, setIsRegister] = useState<boolean>(false);
    const {pathname} = useLocation();

    const navigate = useNavigate();
    const {formErrors, userForUpdate} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userForUpdate) {
            const {name, surname, gender, age, phone, email} = userForUpdate;
            setValue('name', name);
            setValue('surname', surname);
            setValue('gender', gender);
            setValue('phone', phone);
            setValue('age', age);
            setValue('email', email);
        }
    }, [userForUpdate])

    useEffect(() => {
        pathname === '/auth/register' ? setIsRegister(true) : setIsRegister(false)
        // console.log(isRegister)
    }, [pathname, isRegister])

    const submitForm = async (user: IUser) => {

        const updatedUser = Object.assign(user);

        if (!isRegister) {
            delete updatedUser['email'];
        }

        try {
            if (isRegister) {
                const newUser = await dispatch(userActions.registerUser({user}));

                if (!newUser.type.includes('rejected')) {
                    reset();
                    navigate('/auth/login');
                }
            } else {
                if (userForUpdate) {
                    const {_id} = userForUpdate;
                    await dispatch(userActions.updateById({id: _id, user: updatedUser}));
                    // navigate('/users' + location.search, {state: updatedUser});
                    reset();
                }
            }
        } catch (e: any) {
            console.log(formErrors.error);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitForm)} className={style.authForm}>
            <div className={style.error}>
                {
                    formErrors.error && <p>{formErrors.error}</p>
                }
            </div>
            <div>
                <label>Name
                    <input type={'text'} placeholder={'name  '} {...register('name')}/>
                </label>
            </div>
            {errors.name && <span>{errors.name.message}</span>}

            <div>
                <label>Surname
                    <input type={'text'} placeholder={'surname  '} {...register('surname')}/>
                </label>
            </div>
            {errors.name && <span>{errors.name.message}</span>}

            <div className={style.selectBox}>Gender
                <div className={style.genderContainer}>
                    <label>
                        <input type={'radio'} value={genderEnum.FEMALE} {...register('gender')}
                               disabled={!isRegister}/>
                        {genderEnum.FEMALE}
                    </label>
                    <label>
                        <input type={'radio'} value={genderEnum.MALE} {...register('gender')} disabled={!isRegister}/>
                        {genderEnum.MALE}
                    </label>
                </div>
            </div>
            {errors.gender && <span>{errors.gender.message}</span>}

            <div>
                <label>Phone
                    <input type={'tel'} placeholder={'phone  '} {...register('phone')}/>
                </label>
            </div>
            {errors.phone && <span>{errors.phone.message}</span>}

            <div>
                <label>Age
                    <input type={'number'} placeholder={'age  '} {...register('age')}/>
                </label>
            </div>
            {errors.age && <span>{errors.age.message}</span>}

            <div>
                <label>Email
                    <input type={'email'} placeholder={'email  '} {...register('email')} disabled={!isRegister}/>
                </label>
            </div>
            {errors.email && <span>{errors.email.message}</span>}

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
            {/*<button disabled={!isValid}>{userForUpdate ? 'Save Update' : 'Register'}</button>*/}
        </form>
    );
};

export {RegisterForm};