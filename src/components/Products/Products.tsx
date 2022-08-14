import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {useLocation, useSearchParams} from "react-router-dom";
import {productActions} from "../../redux";
import {Product} from "../Product/Product";
import './Products.css';

const Products: FC = () => {

    const {products, page, perPage} = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();

    const [query, setQuery] = useSearchParams({page: `${page}`, perPage: `${perPage}`});
    const {state} = useLocation();

    useEffect(() => {
        setQuery({page: `${page}`, perPage: `${perPage}`});
    }, [page, perPage]);

    useEffect(() => {
        dispatch(productActions.saveQueryParams({page: query.get('page'), perPage: query.get('perPage')}));
        dispatch(productActions.getAll({page: query.get('page') || '1', perPage: query.get('perPage') || '15'}));
    }, [dispatch, query]);

    useEffect(() => {
        dispatch(productActions.getAll({page: query.get('page') || '1', perPage: query.get('perPage') || '15'}));
    }, [state])


    return (
        <div>
            <div className={'productContainer'}>{
                products.map(product => <Product key={product._id} product={product}/>)
            }</div>
        </div>
    );
};

export {Products};