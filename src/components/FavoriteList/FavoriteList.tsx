import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";
import {localStorageItemsEnum} from "../../constants";
import {FavoriteListItem} from "../FavoriteListItem/FavoriteListItem";

const FavoriteList: FC = () => {
    const {userFavoriteProductList} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) !== null) {
            dispatch(userActions.getPopulatedUserById({id: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER)!}));
        }
    }, [dispatch])

    return (
        <div>
            {
                userFavoriteProductList.map(item => <FavoriteListItem key={item._id} item={item}/>)
            }
        </div>
    );
};

export {FavoriteList};