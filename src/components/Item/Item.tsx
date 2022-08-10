import {FC} from "react";
import {IItem} from "../../interfaces";
import {adminItemService} from "../../services";

interface IProps {
    url: string,
    item: IItem,
    index: number,
    setItemForUpdate: Function,
    setDeletedItemId: Function,
}

const Item: FC<IProps> = ({url, item, index, setItemForUpdate, setDeletedItemId}) => {
    const {_id = '', name} = item;

    const deleteItem = async () => {
        await adminItemService.delete(url, _id);
        setDeletedItemId(_id);
    }

    return (
        <div>
            <p>{index + 1}. {name}</p>
            <button onClick={deleteItem}>Delete</button>
            <button onClick={() => setItemForUpdate(item)}>Update</button>
            <hr/>
        </div>
    );
};

export {Item};