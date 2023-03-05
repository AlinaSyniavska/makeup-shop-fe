import { FC, useState } from "react";

import { Items, CreateCommonItemForm } from "../../components";
import { IItem } from "../../interfaces";
import { urlCharacteristic } from "../../constants";

const BrandPage: FC = () => {
  const [newItem, setNewItem] = useState<IItem>({ _id: "", name: "" });
  const [itemForUpdate, setItemForUpdate] = useState<IItem>({
    _id: "",
    name: "",
  });
  const [updatedItem, setUpdatedItem] = useState<IItem>({ _id: "", name: "" });

  return (
    <div style={{ margin: "20px" }}>
      <h4>Brand</h4>
      <CreateCommonItemForm
        url={`${urlCharacteristic.brand}`}
        setNewItem={setNewItem}
        itemForUpdate={itemForUpdate}
        setUpdatedItem={setUpdatedItem}
        setItemForUpdate={setItemForUpdate}
      />
      <hr />
      <Items
        url={`${urlCharacteristic.brand}`}
        newItem={newItem}
        setItemForUpdate={setItemForUpdate}
        updatedItem={updatedItem}
      />
    </div>
  );
};

export { BrandPage };
