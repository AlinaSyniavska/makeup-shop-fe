import {FC, useRef} from "react";

import {IUser} from "../../interfaces";
import style from './User.module.css';

interface IProps {
    user: IUser,
}

const User: FC<IProps> = ({user}) => {
    const {name, surname, gender, age, email, phone} = user;

    const btnUpdate = useRef<HTMLButtonElement>(null);

    return (
        <div className={style.userItem}>

            <div>Name: {name} {surname}</div>
            <div>Age: {age}</div>
            <div>Gender: {gender}</div>
            <div>Phone: {phone}</div>
            <div>Email: {email}</div>

            {/*           {
                isUserRoot && <button ref={btnDel} onClick={() => {
                    // dispatch(userActions.deleteById({id: idUser as String}));
                    togglePopup();
                }}>Delete
                </button>
            }

            {
                isUserRoot && <Link to={`${idUser}` + location.search}>
                    <button ref={btnUpdate} onClick={() => {
                        dispatch(userActions.setUserForUpdate({user}));
                    }}>
                        Update
                    </button>
                </Link>
            }

            {isOpen && <Popup user={user}/>}*/}
        </div>
    );
};

export {User};