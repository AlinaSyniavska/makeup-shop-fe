import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ProductDetails } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { productActions } from "../../redux";

const ProductDetailsPage: FC = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/");

  const { productDetails } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productActions.getById({ id: path[path.length - 1] }));
  }, []);

  return (
    <div>
      {productDetails && <ProductDetails singleProduct={productDetails} />}
    </div>
  );
};

export { ProductDetailsPage };
