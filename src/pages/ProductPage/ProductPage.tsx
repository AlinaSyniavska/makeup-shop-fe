import React, { FC } from "react";

import { CreateProductForm, Products } from "../../components";

const ProductPage: FC = () => {
  return (
    <React.Fragment>
      <CreateProductForm />
      <hr />
      <Products />
    </React.Fragment>
  );
};

export { ProductPage };
