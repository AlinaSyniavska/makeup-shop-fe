import {FC, useState} from "react";

import style from './FilterComponent.module.css';
import {tags} from "../../constants";

const FilterComponent: FC = () => {
    const [checked, setChecked] = useState<string[]>([]);

    const handleCheck = (event: any) => {
        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }

        setChecked(updatedList);
    };


    function submitForm() {
        // dispatch(movieActions.setQueryParams({page: query.get('page'), with_genres: checked.join(',')}))

        // setQuery({page: '1', with_genres: checked.join(',')})
    }

    return (
        <div>
            <div className={style.checkList}>
                {tags.map((item, index) => (
                    <div className={style.checkBoxes} key={index}>
                        <label>
                            <input value={item} type="checkbox" onChange={handleCheck}/>
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