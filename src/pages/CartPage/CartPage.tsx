import { FC } from "react";
import { Goods } from "../../components";

const CartPage: FC = () => {
  return (
    <div>
      <h2 style={{ margin: "20px" }}>Cart of Goods</h2>
      <Goods />
    </div>
  );
};

export { CartPage };
