import React, { FC, useEffect, useState } from "react";

import style from "./UserAvatar.module.css";
import { useAppSelector } from "../../hooks";
import { localStorageItemsEnum } from "../../constants";

const UserAvatar: FC = () => {
  const { isAuth, logUser } = useAppSelector((state) => state.authReducer);
  const [fullUserName, setFullUserName] = useState<string>();

  useEffect(() => {
    setFullUserName(`${logUser.name} ${logUser.surname}`);
  }, [logUser]);

  useEffect(() => {
    setFullUserName(localStorage.getItem(localStorageItemsEnum.LOGIN_USER) as string);
  }, []);

  return (
    <React.Fragment>
      <div className={style.userAvatarContainer}>
        <div className={style.userAvatar}>
          <img src={require("./../../resource/user.png")} alt={"avatar"} />
        </div>

        {isAuth && <div className={style.userName}>{fullUserName}</div>}
      </div>
    </React.Fragment>
  );
};

export { UserAvatar };
