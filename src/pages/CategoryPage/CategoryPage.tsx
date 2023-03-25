import { FC, useState } from "react";

import { IItem } from "../../interfaces";
import { CreateCommonItemForm, Items } from "../../components";
import { urlCharacteristic } from "../../constants";
import { commonHelper } from "../../helpers";

const CategoryPage: FC = () => {
  const [newItem, setNewItem] = useState<IItem>(commonHelper.initCommonItem());
  const [itemForUpdate, setItemForUpdate] = useState<IItem>(commonHelper.initCommonItem());
  const [updatedItem, setUpdatedItem] = useState<IItem>(commonHelper.initCommonItem());

  return (
    <div style={{ margin: "20px" }}>
      <h4>Category</h4>
      <CreateCommonItemForm
        url={`${urlCharacteristic.category}`}
        setNewItem={setNewItem}
        itemForUpdate={itemForUpdate}
        setUpdatedItem={setUpdatedItem}
        setItemForUpdate={setItemForUpdate}
      />
      <hr />
      <Items
        url={`${urlCharacteristic.category}`}
        newItem={newItem}
        setItemForUpdate={setItemForUpdate}
        updatedItem={updatedItem}
      />
    </div>
  );
};

export { CategoryPage };
