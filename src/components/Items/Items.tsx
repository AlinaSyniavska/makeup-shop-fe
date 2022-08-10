import {FC, useEffect, useState} from "react";
import {adminItemService} from "../../services";
import {IItem} from "../../interfaces";
import {Item} from "../Item/Item";

interface IProps {
    url: string,
    newItem: IItem,
    setItemForUpdate: Function,
    updatedItem: IItem,
}

const Items: FC<IProps> = ({url, newItem, setItemForUpdate ,updatedItem} ) => {
    const [brands, setBrands] = useState<IItem[]>([]);
    const [deletedItemId, setDeletedItemId] = useState<IItem>();

    useEffect(() => {
        adminItemService.getAll(url).then(({data}) => setBrands(data.data));
    }, [])

    useEffect(() => {
        if (newItem) {
            setBrands(prevState => [...prevState, newItem]);
        }
    }, [newItem])

    useEffect(() => {
        setBrands(brands?.filter(brand => brand._id !== deletedItemId))
    }, [deletedItemId])

    useEffect(() => {
        if (updatedItem) {
            const editItem = brands.find(brand => brand._id === updatedItem._id) as IItem || {};
            Object.assign(editItem, updatedItem);
            setBrands([...brands]);
        }
    }, [updatedItem])

    return (
        <div>
            {
                brands &&
                brands.map((item, index) => <Item
                    url={url}
                    key={item._id}
                    index={index}
                    item={item}
                    setItemForUpdate={setItemForUpdate}
                    setDeletedItemId={setDeletedItemId}
                />)
            }
        </div>
    );
};

export {Items};