import { FC } from "react";

import { IUser } from "../../interfaces";
import style from "./Popup.module.css";
import { useNavigate } from "react-router-dom";

interface IProps {
  user: Partial<IUser>;
}

const Popup: FC<IProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className={style.popupBox}>
      <div className={style.box}>
        <span className={style.closeIcon} onClick={() => navigate("/home")}>
          x
        </span>
        <p>
          User <b>{user.name}</b> <b>{user.surname}</b> is already login in to
          the App
        </p>
      </div>
    </div>
  );
};

export { Popup };
