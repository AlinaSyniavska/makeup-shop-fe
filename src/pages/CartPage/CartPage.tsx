import React, { FC } from "react";

import { GoodsInCart } from "../../components";

const CartPage: FC = () => {
  return (
    <React.Fragment>
      <h2 style={{ margin: "20px" }}>Cart of Goods</h2>
      <GoodsInCart />
    </React.Fragment>
  );
};

export { CartPage };
