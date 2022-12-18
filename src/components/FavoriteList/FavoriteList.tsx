import {FC} from "react";

import {useAppSelector} from "../../hooks";

const FavoriteList: FC = () => {
    const {userFavoriteList} = useAppSelector(state => state.userReducer);

    return (
        <div>
            {
                userFavoriteList.map(item => <div key={item}>{item}</div>)
            }
        </div>
    );
};

export {FavoriteList};