import { FC, useRef } from "react";

import style from "./User.module.css";
import { IUser } from "../../interfaces";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { userActions } from "../../redux";

interface IProps {
  user: IUser;
}

const User: FC<IProps> = ({ user }) => {
  const { name, surname, gender, age, email, phone } = user;

  const btnUpdate = useRef<HTMLButtonElement>(null);
  const { userForUpdate } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  return (
    <div className={style.userItem}>
      <div className={style.userItemInfo}>
        <div>
          Name: {name} {surname}
        </div>
        <div>Age: {age}</div>
        <div>Gender: {gender}</div>
        <div>Phone: {phone}</div>
        <div>Email: {email}</div>

        <button
          className={style.btnUpdate}
          ref={btnUpdate}
          onClick={() => {
            dispatch(userActions.setUserForUpdate({ user }));
          }}
        >
          Update
        </button>
      </div>

      <div className={style.userItemEdit} aria-disabled={!userForUpdate}>
        <RegisterForm />
      </div>
    </div>
  );
};

export { User };
