import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import style from"./CreateCommonItemForm.module.css";
import { itemValidator } from "../../validators";
import { IItem } from "../../interfaces";
import { adminItemService } from "../../services";

interface IProps {
  url: string;
  setNewItem: Function;
  itemForUpdate: IItem;
  setUpdatedItem: Function;
  setItemForUpdate: Function;
}

const CreateCommonItemForm: FC<IProps> = ({url, setNewItem, itemForUpdate, setUpdatedItem, setItemForUpdate,}) => {
  const {register, reset, handleSubmit, setValue, formState: { errors, isValid },} = useForm<IItem>({
    resolver: joiResolver(itemValidator),
    mode: "all",
  });

  useEffect(() => {
    if (itemForUpdate && itemForUpdate.name) {
      setValue("name", itemForUpdate.name);
    }
  }, [itemForUpdate]);

  const setInitialStateItem = (): IItem => {
    return {
      _id: "",
      name: "",
    };
  };

  const submitForm = async (item: IItem) => {
    try {
      if (itemForUpdate && itemForUpdate.name) {
        const { _id } = itemForUpdate as IItem;
        const { data } = await adminItemService.update(url, _id as String, item);
        setUpdatedItem(data);
        setItemForUpdate(setInitialStateItem());
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
    setItemForUpdate(setInitialStateItem());
    reset();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(submitForm)}>
      <div>
        <label>
          Name: <input type="text" {...register("name")} />
        </label>
      </div>
      {errors.name && <span>{errors.name.message}</span>}
      <br />

      <button disabled={!isValid}>
        {itemForUpdate.name ? "Update" : "Create"}
      </button>

      <button onClick={clearForm}>Clear form</button>
    </form>
  );
};

export { CreateCommonItemForm };
