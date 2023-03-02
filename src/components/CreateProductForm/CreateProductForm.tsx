import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";

import { IColor, IProduct } from "../../interfaces";
import { productValidator } from "../../validators";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { productActions } from "../../redux";
import { priceSignEnum, tags, urlGetData } from "../../constants";
import { productService } from "../../services";
import style from "./CreateProductForm.module.css";

const CreateProductForm: FC = () => {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: joiResolver(productValidator),
    mode: "all",
  });

  const { formErrors, productForUpdate, brands, productTypes, categories } =
    useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const [checked, setChecked] = useState<string[]>([]);
  const [productColorObj, setProductColorObj] = useState<IColor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (productForUpdate) {
      const {
        name,
        brand,
        productType,
        category,
        price,
        priceSign,
        description,
        rating,
        tagList,
        imageLink,
        total,
      } = productForUpdate;

      setValue("name", name);
      setValue("brand", brand);
      setValue("productType", productType);
      setValue("category", category);
      setValue("price", price);
      setValue("priceSign", priceSign);
      setValue("total", total);
      setValue("imageLink", imageLink);
      setValue("description", description);
      setValue("rating", rating);
      setValue("tagList", tagList);
    }
  }, [productForUpdate]);

  useEffect(() => {
    dispatch(productActions.getData({ url: urlGetData.brand }));
    dispatch(productActions.getData({ url: urlGetData.productType }));
    dispatch(productActions.getData({ url: urlGetData.category }));
  }, [dispatch]);

  // Add/Remove checked item from list
  const checkTag = (event: any) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }

    setChecked(updatedList);
  };

  const submitForm = async (product: IProduct) => {
    const expandedProduct = { ...product };

    /*        if (productColorObj) {
            expandedProduct['productColor'] = [...productColorObj];
        }*/

    // console.log(product);
    // console.log(expandedProduct);

    try {
      if (!productForUpdate) {
        await productService.create(expandedProduct);
      } else {
        const { _id } = productForUpdate;
        await dispatch(
          productActions.updateById({ id: _id, product: expandedProduct })
        );
      }

      navigate("/admin/product");
      reset();
    } catch (e: any) {
      console.log(e.response.data());
    }
  };

  const addProductColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const hex = document.getElementById("hex") as HTMLInputElement;
    const nameHex = document.getElementById("nameHex") as HTMLInputElement;

    const hexValue = hex.value;
    const colorName = nameHex.value;

    if (hexValue && colorName) {
      setProductColorObj((prevState) => [
        ...prevState,
        { hexValue, colorName },
      ]);
      hex.value = "";
      nameHex.value = "";
    }
  };

  return (
    <form
      className={style.createProductForm}
      onSubmit={handleSubmit(submitForm)}
    >
      {/*name*/}
      <div>
        <label>
          <span className={style.labelTitle}>Name</span>
          <input type={"text"} placeholder={"name  "} {...register("name")} />
        </label>
      </div>
      {errors.name && <span>{errors.name.message}</span>}

      {/*brand*/}
      <div className={style.selectBox}>
        <label>
          <span className={style.labelTitle}>Select Brand</span>
          <select
            id={"brand"}
            {...register("brand")}
            defaultValue={brands[0]?.name}
          >
            {brands.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/*productType*/}
      <div className={style.selectBox}>
        <label>
          <span className={style.labelTitle}>Select Product Type</span>
          <select
            id={"productType"}
            {...register("productType")}
            defaultValue={productTypes[0]?.name}
          >
            {productTypes.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/*category*/}
      <div className={style.selectBox}>
        <label>
          <span className={style.labelTitle}>Select Category</span>
          <select
            id={"category"}
            {...register("category")}
            defaultValue={categories[0]?.name}
          >
            {categories.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/*price*/}
      <div>
        <label>
          <span className={style.labelTitle}>Price</span>
          <input
            type={"text"}
            placeholder={"price  "}
            {...register("price", { valueAsNumber: true })}
          />
        </label>
      </div>
      {errors.price && <span>{errors.price.message}</span>}

      {/*priceSign*/}
      <div className={style.selectBox}>
        <label>
          <span className={style.labelTitle}>Select Price Sign</span>
          <label className={"textRadio"}>
            <input
              type={"radio"}
              value={priceSignEnum.USD}
              defaultChecked
              {...register("priceSign")}
            />
            {priceSignEnum.USD}
          </label>
          <label className={style.textRadio}>
            <input
              type={"radio"}
              value={priceSignEnum.UAN}
              {...register("priceSign")}
            />
            {priceSignEnum.UAN}
          </label>
          <label className={style.textRadio}>
            <input
              type={"radio"}
              value={priceSignEnum.EUR}
              {...register("priceSign")}
            />
            {priceSignEnum.EUR}
          </label>
        </label>
      </div>
      {errors.priceSign && <span>{errors.priceSign.message}</span>}

      {/*total*/}
      <div>
        <label>
          <span className={style.labelTitle}>Total Number</span>
          <input
            type={"text"}
            placeholder={"total number  "}
            {...register("total", { valueAsNumber: true })}
          />
        </label>
      </div>
      {errors.total && <span>{errors.total.message}</span>}

      {/*imageLink*/}
      <div>
        <label>
          <span className={style.labelTitle}>Image Link</span>
          <input
            type={"text"}
            placeholder={"Image Link  "}
            {...register("imageLink")}
          />
        </label>
      </div>
      {errors.imageLink && <span>{errors.imageLink.message}</span>}

      {/*description*/}
      <div>
        <label>
          <span className={style.labelTitle}>Description</span>
          <textarea {...register("description")}></textarea>
        </label>
      </div>
      {errors.description && <span>{errors.description.message}</span>}

      {/*rating*/}
      <div className={style.selectBox}>
        <label>
          <span className={style.labelTitle}>Select Rating</span>
          <label className={style.textRadio}>
            <input type={"radio"} value={"1"} {...register("rating")} />1
          </label>
          <label className={style.textRadio}>
            <input type={"radio"} value={"2"} {...register("rating")} />2
          </label>
          <label className={style.textRadio}>
            <input type={"radio"} value={"3"} {...register("rating")} />3
          </label>
          <label className={style.textRadio}>
            <input type={"radio"} value={"4"} {...register("rating")} />4
          </label>
          <label className={style.textRadio}>
            <input
              type={"radio"}
              value={"5"}
              defaultChecked
              {...register("rating")}
            />
            5
          </label>
        </label>
      </div>
      {errors.rating && <span>{errors.rating.message}</span>}

      {/*tagList*/}
      <div>
        <label>
          <span className={style.labelTitle}>Select Tags For Filter</span>
          {tags.map((item, index) => (
            <div className={style.textChBox} key={index}>
              <label>
                <input
                  value={item}
                  type="checkbox"
                  {...register("tagList")}
                  onChange={checkTag}
                />
                {item}
              </label>
            </div>
          ))}
        </label>
      </div>

      {/*productColor*/}
      <div className={style.container}>
        <label>
          <span className={style.labelTitle}>Enter Product Colors</span>
          <label>
            <span className={style.labelTitle}>HEX Value</span>
            {/*<input id={'hex'} type={'text'} {...register(`productColor.${number}.hexValue`)}/>*/}
            <input id={"hex"} type={"text"} disabled={true} />
          </label>
          <label>
            <span className={style.labelTitle}>Color Name</span>
            {/*<input id={'nameHex'} type={'text'} {...register(`productColor.${number}.colorName`)}/>*/}
            <input id={"nameHex"} type={"text"} disabled={true} />
          </label>
        </label>
        <button onClick={addProductColor} disabled={true}>
          Add Color
        </button>
      </div>
      {/*{errors.productColor && <span>{errors.productColor.message}</span>}*/}
      <div>
        Product Colors:
        <br />
        {JSON.stringify(productColorObj, null, 2)}
      </div>

      {/*<button disabled={!isValid}>{productForUpdate ? 'Save Update' : 'Create'}</button>*/}
      <button>{productForUpdate ? "Save Update" : "Create"}</button>

      <div>
        <div>
          {formErrors.name && <div>Error name: {formErrors.name[0]}</div>}
        </div>
        <div>
          {formErrors.price && <div>Error age: {formErrors.price[0]}</div>}
        </div>
        <div>
          {formErrors.priceSign && (
            <div>Error email: {formErrors.priceSign[0]}</div>
          )}
        </div>
        <div>
          {formErrors.imageLink && (
            <div>Error phone: {formErrors.imageLink[0]}</div>
          )}
        </div>
        <div>
          {formErrors.description && (
            <div>Error password: {formErrors.description[0]}</div>
          )}
        </div>
        <div>
          {formErrors.rating && (
            <div>Error password: {formErrors.rating[0]}</div>
          )}
        </div>
      </div>
    </form>
  );
};

export { CreateProductForm };
