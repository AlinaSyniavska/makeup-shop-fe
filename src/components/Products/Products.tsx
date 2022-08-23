import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {useLocation, useSearchParams} from "react-router-dom";
import {productActions} from "../../redux";
import {Product} from "../Product/Product";
import style from './Products.module.css';
import {Sidebar} from "../Sidebar/Sidebar";

const Products: FC = () => {

    const {products, page, perPage, sortOrder} = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();

    const [query, setQuery] = useSearchParams({page: `${page}`, perPage: `${perPage}`, sortOrder: `${sortOrder}`});
    const {state} = useLocation();

    useEffect(() => {
        setQuery({page: `${page}`, perPage: `${perPage}`, sortOrder: `${sortOrder}`});
    }, [page, perPage, sortOrder]);

    useEffect(() => {
            dispatch(productActions.saveQueryParams({
                page: query.get('page'),
                perPage: query.get('perPage'),
                sortOrder: query.get('sortOrder')
            }));

/*            dispatch(productActions.getAll({
                page: query.get('page') || '1',
                perPage: query.get('perPage') || '15',
                sortOrder: Number(query.get('sortOrder')),
            }));*/

           const params =  {
                page: query.get('page') || '1',
                perPage: query.get('perPage') || '15',
                sortOrder: Number(query.get('sortOrder')),
            }
            dispatch(productActions.getAll({params}));
        },
        [dispatch, query]);

    useEffect(() => {
/*        dispatch(productActions.getAll({
            page: query.get('page') || '1',
            perPage: query.get('perPage') || '15',
            sortOrder: Number(query.get('sortOrder')),
        }));*/

        const params =  {
            page: query.get('page') || '1',
            perPage: query.get('perPage') || '15',
            sortOrder: Number(query.get('sortOrder')),
        }
        dispatch(productActions.getAll({params}));
    }, [state])


    return (
        <div>
            <div className={style.bodyWrap}>
                <Sidebar/>
                <div className={style.productContainer}>
                    {
                        products.map(product => <Product key={product._id} product={product}/>)
                    }
                </div>
            </div>
        </div>
    );
};

export {Products};