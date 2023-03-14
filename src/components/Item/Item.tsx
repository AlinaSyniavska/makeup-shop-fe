import { FC } from "react";

import { IItem } from "../../interfaces";
import { adminItemService } from "../../services";
import { commonHelper } from "../../helpers";

interface IProps {
  url: string;
  item: IItem;
  index: number;
  setItemForUpdate: Function;
  setDeletedItemId: Function;
}

const Item: FC<IProps> = ({
  url,
  item,
  index,
  setItemForUpdate,
  setDeletedItemId,
}) => {
  const { _id = "", name } = item;

  const deleteItem = async () => {
    await adminItemService.delete(url, _id);
    setDeletedItemId(_id);
  };

  const updateItem = () => {
    setItemForUpdate(item);
    commonHelper.scrollToUp();
  };

  return (
    <div>
      <p>{index + 1}. {name}</p>
      <button onClick={deleteItem}>Delete</button>
      <button onClick={updateItem}>Update</button>
      <hr />
    </div>
  );
};

export { Item };
