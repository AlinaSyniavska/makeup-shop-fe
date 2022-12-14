import {FC, useEffect} from "react";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import style from './Favorite.module.css';
import {IProduct} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";

interface IProps {
    product: IProduct,
}

const Favorite: FC<IProps> = ({product}) => {
    const {_id: itemId} = product;

    const {userFavoriteList} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const addFavorite = () => {
        if (itemId) {
            let updatedFavorite = [...userFavoriteList as string[]]
            if (!updatedFavorite.includes(itemId)) {
                dispatch(userActions.addFavoriteItem({item: itemId, add: true, index: null}));
            } else {
                const index = updatedFavorite.findIndex(item => item === itemId);
                dispatch(userActions.addFavoriteItem({item: itemId, add: false, index}));
            }
        }

        console.log(userFavoriteList)
    }

    const updateFavorite = () => {

    }

    useEffect(() => {
        // updateFavorite();
        console.log(userFavoriteList)
        // тут зробити запис в бд userFavoriteList

    }, [userFavoriteList])

    return (
        <div className={style.favorite}>
            <div className={style.btnFavorite}>
                {/*<FavoriteBorderIcon style={{'color': 'lightpink'}} onClick={addToFavorite}/>*/}

                {/*<div onClick={() => updateFavorite()}>*/}
                {itemId && (
                    userFavoriteList?.includes(itemId) ?
                        <FavoriteIcon style={{'color': 'lightpink'}} onClick={() => addFavorite()}/> :
                        <FavoriteBorderIcon style={{'color': 'lightpink'}} onClick={() => addFavorite()}/>
                )}
                {/*</div>*/}

            </div>
        </div>
    );
};

export {Favorite};

