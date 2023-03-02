import { FC } from "react";

import { IUser } from "../../interfaces";
import "./Popup.css";
import { useNavigate } from "react-router-dom";

interface IProps {
  user: Partial<IUser>;
}

const Popup: FC<IProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={() => navigate("/home")}>
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
