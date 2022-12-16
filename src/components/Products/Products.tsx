import {FC, useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {useLocation, useSearchParams} from "react-router-dom";
import {productActions, userActions} from "../../redux";
import {Product} from "../Product/Product";
import style from './Products.module.css';
import {localStorageItemsEnum} from "../../constants";

const Products: FC = () => {

    const {products, page, perPage, sortOrder, filterBy} = useAppSelector(state => state.productReducer);
    const {userFavoriteList} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const [query, setQuery] = useSearchParams({
        page: `${page}`,
        perPage: `${perPage}`,
        sortOrder: `${sortOrder}`,
        filterBy: `${filterBy.join(';')}`
    });
    const {state, pathname} = useLocation();
    const [isCategoryPath, setIsCategoryPath] = useState<boolean>(false);

    useEffect(() => {
        pathname.includes('/category') ? setIsCategoryPath(true) : setIsCategoryPath(false);
    }, [pathname])

    useEffect(() => {
        setQuery({
            page: `${page}`,
            perPage: `${perPage}`,
            sortOrder: `${sortOrder}`,
            filterBy: `${filterBy.join(';')}`
        });
    }, [page, perPage, sortOrder, filterBy]);

    useEffect(() => {
            dispatch(productActions.saveQueryParams({
                page: query.get('page'),
                perPage: query.get('perPage'),
                sortOrder: query.get('sortOrder'),
                filterBy: query.get('filterBy')?.split(';')
            }));

            const params = {
                page: query.get('page') || '1',
                perPage: query.get('perPage') || '20',
                sortOrder: Number(query.get('sortOrder')),
                filterBy: query.get('filterBy') || '',
            }

            !isCategoryPath ?
                dispatch(productActions.getAll({params})) :
                dispatch(productActions.getAtUrl({params, url: pathname}));
        },
        [dispatch, query, isCategoryPath, pathname]);

    useEffect(() => {
        const params = {
            page: query.get('page') || '1',
            perPage: query.get('perPage') || '20',
            sortOrder: Number(query.get('sortOrder')),
            filterBy: query.get('filterBy') || '',
        }

        !isCategoryPath ?
            dispatch(productActions.getAll({params})) :
            dispatch(productActions.getAtUrl({params, url: pathname}));
            if (localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) !== null) {
                dispatch(userActions.getFavoriteListById({id: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER)!}));
            }
    }, [state, isCategoryPath, pathname])

    useEffect(() => {
        dispatch(userActions.updateById({
            id: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER)!,
            user: {favoriteList: Array.from(new Set(userFavoriteList))}
        }));
    }, [userFavoriteList])

    return (
        <div>
            <div className={style.bodyWrap}>
                <div className={style.productContainer}>
                    {
                        products.length
                            ? products.map(product => <Product key={product._id} product={product}/>)
                            : <div className={style.text}>Sorry we couldn't find any matches for your request tags
                                :(</div>
                    }
                </div>
            </div>
        </div>
    );
};

export {Products};