import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";
import {localStorageItemsEnum} from "../../constants";

const FavoriteList: FC = () => {
    const {userFavoriteProductList} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) !== null) {
            dispatch(userActions.getPopulatedUserById({id: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER)!}));
        }
    }, [dispatch])


    // додати виклик getPopulatedUserById, де буде список улюблених продуктів

    return (
        <div>
            {
                userFavoriteProductList.map(item => <div key={item._id}>{item.name}</div>)
            }
        </div>
    );
};

export {FavoriteList};