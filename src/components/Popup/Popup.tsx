import {FC} from "react";

import {IUser} from "../../interfaces";
import './Popup.css';
import {useNavigate} from "react-router-dom";
import {userActions} from "../../redux";
import {useAppDispatch} from "../../hooks";

interface IProps {
    user: IUser,
}

const Popup: FC<IProps> = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function makeLogout() {
        navigate('/auth/logout');
        dispatch(userActions.deleteById({id: user._id as String}));
    }

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={makeLogout}>x</span>
                <p>User with name <b>{user.name}</b> and login <b>{user.email}</b> will be delete!!!</p>
            </div>
        </div>
    );
};

export {Popup};