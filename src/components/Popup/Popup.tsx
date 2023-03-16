import { FC } from "react";
import { useNavigate } from "react-router-dom";

import style from "./Popup.module.css";
import { IUser } from "../../interfaces";

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
          User <b>{user.name} {user.surname}</b> is already login on the platform.
        </p>
      </div>
    </div>
  );
};

export { Popup };
