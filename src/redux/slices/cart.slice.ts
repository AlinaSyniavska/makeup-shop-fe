import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ICart, IProduct, IProductOrdered } from "../../interfaces";
import { localStorageItemsEnum } from "../../constants";
import {cartService, localStorageService} from "../../services";

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
      state.goods.push(goods);

      const cart = localStorageService.getFromLocalStorage(localStorageItemsEnum.CART);
      cart.push(goods);
      localStorage.setItem(localStorageItemsEnum.CART, JSON.stringify(cart));

      const order = localStorageService.getFromLocalStorage(localStorageItemsEnum.ORDER);
      order.push({
        productId: goods._id,
        count: 1,
        cost: goods.price,
      });
      state.userOrder.push({
        productId: goods._id,
        count: 1,
        cost: goods.price,
      });
      localStorage.setItem(localStorageItemsEnum.ORDER, JSON.stringify(order));
    },

    changeOrder: (state, action) => {
      const { itemId, curCount } = action.payload.data;

      const order = localStorageService.getFromLocalStorage(localStorageItemsEnum.ORDER);

      const singleGoodsIndex = order.findIndex((i: IProductOrdered) => i.productId === itemId);
      order[singleGoodsIndex].count = curCount;

      state.userOrder.splice(
        singleGoodsIndex,
        1,
        order[singleGoodsIndex]
      );

      localStorage.setItem(localStorageItemsEnum.ORDER, JSON.stringify(order));
    },

    changeOrderDeleteRecord: (state, action) => {
      const { itemId } = action.payload.data;

      const order = localStorageService.getFromLocalStorage(localStorageItemsEnum.ORDER) as IProductOrdered[];

      let singleGoodsIndex = order.findIndex((i: IProductOrdered) => i.productId === itemId);
      order.splice(singleGoodsIndex, 1);

      state.userOrder.splice(singleGoodsIndex, 1);

      localStorage.setItem(localStorageItemsEnum.ORDER, JSON.stringify(order));

      const cart = localStorageService.getFromLocalStorage(localStorageItemsEnum.CART);

      singleGoodsIndex = cart.findIndex((i: IProduct) => i._id === itemId);
      cart.splice(singleGoodsIndex, 1);

      // state.goods.splice(singleGoodsIndex, 1);
      state.goods = [];
      state.goods = Object.assign([...cart]);

      localStorage.setItem(localStorageItemsEnum.CART, JSON.stringify(cart));
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

const {reducer: cartReducer, actions: { addToCart, changeOrder, changeOrderDeleteRecord, deleteOrder },} = cartSlice;

const cartActions = {
  addToCart,
  changeOrder,
  changeOrderDeleteRecord,
  deleteOrder,
  sendOrderToDB,
};

export { cartActions, cartReducer };
