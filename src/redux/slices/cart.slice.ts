import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ICart, IProduct, IProductOrdered } from "../../interfaces";
import { localStorageItemsEnum } from "../../constants";
import { cartService } from "../../services";
import { localStorageHelper } from "../../helpers";

interface IState {
  goods: IProduct[];
  userOrder: IProductOrdered[];
  orderStatus: string;
}

const initialState: IState = {
  goods: [],
  userOrder: [],
  orderStatus: "",
};

const sendOrderToDB = createAsyncThunk<void, { orderToDB: ICart }>(
  "cartSlice/sendOrderToDB",
  async ({ orderToDB }, { dispatch, rejectWithValue }) => {
    try {
      await cartService.sendToDB(orderToDB);
      await dispatch(deleteOrder());
    } catch (e: any) {
      return rejectWithValue({
        errorStatus: e.message,
        err: e.response.data.error,
      });
    }
  }
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const goods = action.payload.goods;
      const cart = localStorageHelper.getArrayFromLocalStorage(localStorageItemsEnum.CART) as IProduct[];
      const order = localStorageHelper.getArrayFromLocalStorage(localStorageItemsEnum.ORDER) as IProductOrdered[];
      let goodsToOrder = {} as IProductOrdered;
      const orderItem = order.find((item) => item.productId === goods._id);

      if (orderItem) {
        Object.assign(goodsToOrder, orderItem, { count: orderItem.count + 1 });
        state.userOrder.splice(
            state.userOrder.findIndex(item => item === orderItem),
            1,
            goodsToOrder
        );
        order.splice(
            order.findIndex(item => item === orderItem),
            1,
            goodsToOrder
        );
      } else {
        goodsToOrder = {
          productId: goods._id,
          count: 1,
          cost: goods.price,
        };

        state.goods.push(goods);
        state.userOrder.push(goodsToOrder);
        cart.push(goods);
        order.push(goodsToOrder);
      }

      localStorageHelper.setArrayToLocalStorage(localStorageItemsEnum.CART, cart);
      localStorageHelper.setArrayToLocalStorage(localStorageItemsEnum.ORDER, order);
    },

    changeOrder: (state, action) => {
      const { itemId, curCount } = action.payload.data;

      const order = localStorageHelper.getArrayFromLocalStorage(
        localStorageItemsEnum.ORDER
      ) as IProductOrdered[];

      const singleGoodsIndex = order.findIndex(
        (i: IProductOrdered) => i.productId === itemId
      );
      order[singleGoodsIndex].count = curCount;

      state.userOrder.splice(singleGoodsIndex, 1, order[singleGoodsIndex]);

      localStorageHelper.setArrayToLocalStorage(
        localStorageItemsEnum.ORDER,
        order
      );
    },

    changeOrderDeleteRecord: (state, action) => {
      const { itemId } = action.payload.data;

      const order = localStorageHelper.getArrayFromLocalStorage(
        localStorageItemsEnum.ORDER
      ) as IProductOrdered[];

      let singleGoodsIndex = order.findIndex(
        (i: IProductOrdered) => i.productId === itemId
      );
      order.splice(singleGoodsIndex, 1);

      state.userOrder.splice(singleGoodsIndex, 1);

      localStorageHelper.setArrayToLocalStorage(
        localStorageItemsEnum.ORDER,
        order
      );

      const cart = localStorageHelper.getArrayFromLocalStorage(
        localStorageItemsEnum.CART
      ) as IProduct[];

      singleGoodsIndex = cart.findIndex((i: IProduct) => i._id === itemId);
      cart.splice(singleGoodsIndex, 1);

      state.goods = [];
      state.goods = Object.assign([...cart]);

      localStorageHelper.setArrayToLocalStorage(
        localStorageItemsEnum.CART,
        cart
      );
    },

    deleteOrder: (state) => {
      window.location.href = "/home";

      localStorage.removeItem(localStorageItemsEnum.CART);
      localStorage.removeItem(localStorageItemsEnum.ORDER);
      state.goods = [];
      state.userOrder = [];
      state.orderStatus = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrderToDB.rejected, (state, action) => {
      const { errorStatus, err } = action.payload as any;
      state.orderStatus = errorStatus;

      alert(
        state.orderStatus + "\nDear User your order has not been sent.\n" + err
      );
    });
  },
});

const {
  reducer: cartReducer,
  actions: { addToCart, changeOrder, changeOrderDeleteRecord, deleteOrder },
} = cartSlice;

const cartActions = {
  addToCart,
  changeOrder,
  changeOrderDeleteRecord,
  deleteOrder,
  sendOrderToDB,
};

export { cartActions, cartReducer };
