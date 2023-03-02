import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { itemValidator } from "../../validators";
import { IItem } from "../../interfaces";
import { adminItemService } from "../../services";
import "./CreateCommonItemForm.css";

interface IProps {
  url: string;
  setNewItem: Function;
  itemForUpdate: IItem;
  setUpdatedItem: Function;
  setItemForUpdate: Function;
}

const CreateCommonItemForm: FC<IProps> = ({
  url,
  setNewItem,
  itemForUpdate,
  setUpdatedItem,
  setItemForUpdate,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IItem>({
    resolver: joiResolver(itemValidator),
    mode: "onTouched",
  });

  useEffect(() => {
    if (itemForUpdate && itemForUpdate.name !== "") {
      const { name } = itemForUpdate;
      setValue("name", name);
    }
  }, [itemForUpdate]);

  const submitForm = async (item: IItem) => {
    try {
      if (itemForUpdate && itemForUpdate.name !== "") {
        const { _id } = itemForUpdate as any;
        const { data } = await adminItemService.update(url, _id, item);
        setUpdatedItem(data);
        setItemForUpdate({ _id: "", name: "" });
      } else {
        const { data } = await adminItemService.create(url, item);
        setNewItem(data);
      }
      reset();
    } catch (e: any) {
      console.error(e.response);
    }
  };

  const clearForm = () => {
    setItemForUpdate({ _id: "", name: "" });
    reset();
  };

  return (
    <form className={"form"} onSubmit={handleSubmit(submitForm)}>
      <div>
        <label>
          Name: <input type="text" {...register("name")} />
        </label>
      </div>
      {errors.name && <span>{errors.name.message}</span>}
      <br />
      <button disabled={!isValid}>
        {itemForUpdate.name !== "" ? "Update" : "Create"}
      </button>
      {!!itemForUpdate && <button onClick={clearForm}>Clear form</button>}
    </form>
  );
};

export { CreateCommonItemForm };
