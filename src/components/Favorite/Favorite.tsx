import {FC, useEffect, useState} from "react";

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

    const [favorite, setFavorite] = useState<string[]>([]);

    const addFavorite = (id: string) => {
        dispatch(userActions.addFavoriteItem({item: id}));

        console.log(userFavoriteList)
    }

    const updateFavorite = () => {
        if (itemId) {
            let updatedFavorite = [...userFavoriteList as string[]]
            if (!updatedFavorite.includes(itemId)) {
                updatedFavorite = [...userFavoriteList as string[], itemId]
            } else {
                updatedFavorite = updatedFavorite.filter(favoriteItem => itemId !== favoriteItem)
            }
            setFavorite(updatedFavorite)
        }
    }

    useEffect(() => {
        // updateFavorite();
        console.log(userFavoriteList)

    }, [userFavoriteList])

    return (
        <div className={style.favorite}>
            <div className={style.btnFavorite}>
                {/*<FavoriteBorderIcon style={{'color': 'lightpink'}} onClick={addToFavorite}/>*/}

                {/*<div onClick={() => updateFavorite()}>*/}
                {itemId && (
                    userFavoriteList?.includes(itemId) ?
                        <FavoriteIcon style={{'color': 'lightpink'}} onClick={() => addFavorite(itemId)}/> :
                        <FavoriteBorderIcon style={{'color': 'lightpink'}} onClick={() => addFavorite(itemId)}/>
                )}
                {/*</div>*/}

            </div>
        </div>
    );
};

export {Favorite};

