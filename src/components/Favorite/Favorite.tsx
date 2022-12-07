import {FC, useState} from "react";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import style from './Favorite.module.css';
import {IProduct} from "../../interfaces";

interface IProps {
    product: IProduct,
}

const Favorite: FC<IProps> = ({product}) => {
    const {_id: itemId} = product;

    const [favorite, setFavorite] = useState<string[]>([]);

    const addToFavorite = () => {
        console.log('++++')
    }

    const updateFavorite = () => {
        if(itemId){
            let updatedFavorite = [...favorite]
            if (!updatedFavorite.includes(itemId)) {
                updatedFavorite = [...favorite, itemId]
            } else {
                updatedFavorite = updatedFavorite.filter(favoriteItem => itemId !== favoriteItem)
            }
            setFavorite(updatedFavorite)
        }
    }

    return (
        <div className={style.favorite}>
            <div className={style.btnFavorite}>
                {/*<FavoriteBorderIcon style={{'color': 'lightpink'}} onClick={addToFavorite}/>*/}

                {/*<div onClick={() => updateFavorite()}>*/}
                {itemId && favorite.includes(itemId) ?
                    <FavoriteBorderIcon style={{'color': 'lightpink'}} onClick={() => addToFavorite()}/> :
                    <FavoriteIcon style={{'color': 'lightpink'}} onClick={() => addToFavorite()}/>}
                {/*</div>*/}

            </div>
        </div>
    );
};

export {Favorite};

