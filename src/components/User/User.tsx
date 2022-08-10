import {FC, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";

import {IUser} from "../../interfaces";
import './User.css';
import {useAppDispatch} from "../../hooks";
import {userActions} from "../../redux";
import {Popup} from "../Popup/Popup";

interface IProps {
    user: IUser,
}

const User: FC<IProps> = ({user}) => {
    const {name, age, email, _id: idUser, phone} = user;
    const [isUserRoot, setUserRoot] = useState(false);
    const idLoginUser = localStorage.getItem('idLoginUser') as string;

    const dispatch = useAppDispatch();

    const btnDel = useRef<HTMLButtonElement>(null);
    const btnUpdate = useRef<HTMLButtonElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();
    // console.log(location.search);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        setUserRoot(false);
    }

    useEffect(() => {
        if (idUser === idLoginUser) {
            setUserRoot(true);
        }
    }, [idLoginUser])

    return (
        <div className={'userItem'}>
            <div>Name: {name}. Age: {age}</div>
            <div>Phone: {phone}</div>
            <div>Email: {email}</div>
            <div>Id: {idUser}</div>

            {
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

            {isOpen && <Popup user={user}/>}
        </div>
    );
};

export {User};