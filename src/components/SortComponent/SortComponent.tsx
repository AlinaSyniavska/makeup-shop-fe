import React, {FC, useEffect} from "react";

import style from './SortComponent.module.css';
import {ratingEnum} from "../../constants";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";
import {useSearchParams} from "react-router-dom";

const SortComponent: FC = () => {

    const {page, perPage, sortOrder} = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams({page: `${page}`, perPage: `${perPage}`, sortOrder: `${sortOrder}`});

    const setSort = (event: any) => {
        // console.log(event.target.value);

        setQuery({page: `${page}`, perPage: `${perPage}`, sortOrder: event.target.value});
        dispatch(productActions.saveQueryParams({page: query.get('page'), perPage: query.get('perPage'), sortOrder: query.get('sortOrder')}));
    };

    useEffect(() => {
        const sortOrderCollection = document.querySelectorAll('input[name=sortOrder]');

        sortOrderCollection.forEach(item => {
            if (Number(item.attributes[2].value) == sortOrder) {
                item.setAttribute('checked', 'true');
            }
        })
    }, [sortOrder])

    return (
        <div>
            <p className={style.sortDirection}>Sort by</p>
            <div className={style.checkList}>
                <div className={style.checkBoxes}>
                <label>
                    <input type={'radio'} value={ratingEnum.HIGH} name={'sortOrder'} onChange={setSort}/>
                    High to Low
                </label>
                </div>

                <div className={style.checkBoxes}>
                <label>
                    <input type={'radio'} value={ratingEnum.LOW} name={'sortOrder'} onChange={setSort}/>
                    Low to High
                </label>
                </div>
            </div>
        </div>
    );
};

export {SortComponent};