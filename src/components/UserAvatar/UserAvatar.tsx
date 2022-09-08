import {FC} from "react";

import style from './UserAvatar.module.css';
import {useAppSelector} from "../../hooks";


const UserAvatar: FC = () => {
    const {isAuth} = useAppSelector(state => state.authReducer);

    const fullUserName = localStorage.getItem('loginUser');

    return (
        <div>
            <div className={style.userAvatarContainer}>
                <div className={style.userAvatar}>
                    <img src={require("./../../resource/user.png")} alt={'avatar'}/>
                </div>

                {
                    isAuth && <div className={style.userName}>
                        {fullUserName}
                    </div>
                }
            </div>
        </div>
    );
};

export {UserAvatar};