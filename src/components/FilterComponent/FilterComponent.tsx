import {FC, useEffect, useState} from "react";

import style from './FilterComponent.module.css';
import {tags} from "../../constants";
import {productActions} from "../../redux";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";

const FilterComponent: FC = () => {
    const {page, perPage, sortOrder, filterBy} = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();

    const [checked, setChecked] = useState<string[]>(filterBy);

    const [query, setQuery] = useSearchParams({
        page: `${page}`, perPage: `${perPage}`, sortOrder: `${sortOrder}`, filterBy: `${filterBy.join(';')}`,
    });

    useEffect(() => {
        const filterByCollection = document.querySelectorAll('input[type=checkbox]');

        filterBy?.forEach(tag => {
            Array.from(filterByCollection, item => {
                if (item.attributes[1].value === tag) {
                    // console.log(item)
                    item.setAttribute('checked', 'true');
                }
                // return true;
            })
        })

        setChecked(filterBy);
    }, [filterBy])


    const checkFilterTags = (event: any) => {
        let updatedList = [...checked];

        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }

        // console.log(updatedList)
        setChecked(updatedList);
    };

    function submitForm() {
        const indexEmpty = checked.findIndex(item => item === '');
        if (indexEmpty !== -1){
            checked.splice(indexEmpty, 1);
        }
        // console.log(indexEmpty)

        setQuery({
            page: `${page}`, perPage: `${perPage}`, sortOrder: `${sortOrder}`, filterBy: checked.join(';'),
        });
        dispatch(productActions.saveQueryParams({
            page: query.get('page'),
            perPage: query.get('perPage'),
            sortOrder: query.get('sortOrder'),
            filterBy: query.get('filterBy')?.split(';')
        }));
    }

    return (
        <div>
            <div className={style.checkList}>
                {tags.map((item, index) => (
                    <div className={style.checkBoxes} key={index}>
                        <label>
                            <input value={item} type="checkbox" onClick={checkFilterTags}/>
                            {item}
                        </label>
                    </div>
                ))}

                <button className={`${style.btnSearch} ${style.lightBg}`} onClick={submitForm}>Search</button>
            </div>
        </div>
    );
};

export {FilterComponent};
