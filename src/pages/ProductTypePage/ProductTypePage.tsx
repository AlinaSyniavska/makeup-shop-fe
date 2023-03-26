import { FC, useState } from "react";

import { IItem } from "../../interfaces";
import { CreateCommonItemForm, Items } from "../../components";
import { urlCharacteristic } from "../../constants";
import { commonHelper } from "../../helpers";

const ProductTypePage: FC = () => {
  const [newItem, setNewItem] = useState<IItem>(commonHelper.initCommonItem());
  const [itemForUpdate, setItemForUpdate] = useState<IItem>(commonHelper.initCommonItem());
  const [updatedItem, setUpdatedItem] = useState<IItem>(commonHelper.initCommonItem());

  return (
    <div style={{ margin: "20px" }}>
      <h4>Product Type</h4>
      <CreateCommonItemForm
        url={`${urlCharacteristic.productType}`}
        setNewItem={setNewItem}
        itemForUpdate={itemForUpdate}
        setUpdatedItem={setUpdatedItem}
        setItemForUpdate={setItemForUpdate}
      />
      <hr />
      <Items
        url={`${urlCharacteristic.productType}`}
        newItem={newItem}
        setItemForUpdate={setItemForUpdate}
        updatedItem={updatedItem}
      />
    </div>
  );
};

export { ProductTypePage };
