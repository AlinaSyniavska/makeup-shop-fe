import {FC, useState} from "react";
import {IItem} from "../../interfaces";
import {CreateCommonItemForm, Items} from "../../components";

const CategoryPage: FC = () => {
    const [newItem, setNewItem] = useState<IItem>({_id: '', name: ''});
    const [itemForUpdate, setItemForUpdate] = useState<IItem>({_id: '', name: ''});
    const [updatedItem, setUpdatedItem] = useState<IItem>({_id: '', name: ''});

    return (
        <div>
            <h4>Category</h4>
            <CreateCommonItemForm
                url={'category'}
                setNewItem={setNewItem}
                itemForUpdate={itemForUpdate}
                setUpdatedItem={setUpdatedItem}
                setItemForUpdate={setItemForUpdate}
            />
            <hr/>
            <Items url={'category'} newItem={newItem} setItemForUpdate={setItemForUpdate} updatedItem={updatedItem}/>
        </div>
    );
};

export {CategoryPage};