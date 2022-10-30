import {FC, useEffect} from "react";
import {AuthForm} from "../../components";
import {useAppSelector} from "../../hooks";

const LoginPage: FC = () => {
    const {logUser} = useAppSelector(state => state.authReducer);

    useEffect(() => {
        console.log(logUser)
    }, [logUser])

    return (
        <div>
             <AuthForm/>
        </div>
    );
};

export {LoginPage};