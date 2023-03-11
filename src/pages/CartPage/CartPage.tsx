import { FC } from "react";
import { GoodsInCart } from "../../components";

const CartPage: FC = () => {
  return (
    <div>
      <h2 style={{ margin: "20px" }}>Cart of Goods</h2>
      <GoodsInCart />
    </div>
  );
};

export { CartPage };
