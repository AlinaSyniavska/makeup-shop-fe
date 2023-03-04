import { FC, useState } from "react";
import { IItem } from "../../interfaces";
import { CreateCommonItemForm, Items } from "../../components";
import { urlGetData } from "../../constants";

const CategoryPage: FC = () => {
  const [newItem, setNewItem] = useState<IItem>({ _id: "", name: "" });
  const [itemForUpdate, setItemForUpdate] = useState<IItem>({
    _id: "",
    name: "",
  });
  const [updatedItem, setUpdatedItem] = useState<IItem>({ _id: "", name: "" });

  return (
    <div style={{ margin: "20px" }}>
      <h4>Category</h4>
      <CreateCommonItemForm
        url={`${urlGetData.category}`}
        setNewItem={setNewItem}
        itemForUpdate={itemForUpdate}
        setUpdatedItem={setUpdatedItem}
        setItemForUpdate={setItemForUpdate}
      />
      <hr />
      <Items
        url={`${urlGetData.category}`}
        newItem={newItem}
        setItemForUpdate={setItemForUpdate}
        updatedItem={updatedItem}
      />
    </div>
  );
};

export { CategoryPage };
