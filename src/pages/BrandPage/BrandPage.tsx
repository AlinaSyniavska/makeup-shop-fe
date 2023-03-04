import { FC, useState } from "react";

import { Items, CreateCommonItemForm } from "../../components";
import { IItem } from "../../interfaces";
import { urlGetData } from "../../constants";

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
        url={`${urlGetData.brand}`}
        setNewItem={setNewItem}
        itemForUpdate={itemForUpdate}
        setUpdatedItem={setUpdatedItem}
        setItemForUpdate={setItemForUpdate}
      />
      <hr />
      <Items
        url={`${urlGetData.brand}`}
        newItem={newItem}
        setItemForUpdate={setItemForUpdate}
        updatedItem={updatedItem}
      />
    </div>
  );
};

export { BrandPage };
