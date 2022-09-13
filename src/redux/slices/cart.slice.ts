import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {ICart, IProduct, IProductOrdered} from "../../interfaces";
import {localStorageItemsEnum} from "../../constants";
import {cartService} from "../../services";

interface IState {
    goods: IProduct[],
    userOrder: IProductOrdered[],
    orderStatus: string,
}

const initialState: IState = {
    goods: [],
    userOrder: [],
    orderStatus: '',
};

const sendOrderToDB = createAsyncThunk<void, { orderToDB: ICart }>(
    'cartSlice/sendOrderToDB',
    async ({orderToDB}, {dispatch, rejectWithValue}) => {
        try {
            await cartService.sendToDB(orderToDB);
            await dispatch(deleteOrder());
        } catch (e: any) {
            return rejectWithValue({errorStatus: e.message, err: e.response.data.error})
        }
    }
);

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const goods = action.payload.goods;
            state.goods.push(goods);

            const cart = localStorage.getItem(localStorageItemsEnum.CART);
            let cartFromLocalStorage = cart !== null ? JSON.parse(cart) : [];
            cartFromLocalStorage.push(goods);
            localStorage.setItem(localStorageItemsEnum.CART, JSON.stringify(cartFromLocalStorage));

            const order = localStorage.getItem(localStorageItemsEnum.ORDER);
            let orderFromLocalStorage = order !== null ? JSON.parse(order) : [];
            orderFromLocalStorage.push({
                productId: goods._id,
                count: 1,
                cost: goods.price,
            });
            state.userOrder.push({
                productId: goods._id,
                count: 1,
                cost: goods.price,
            });
            localStorage.setItem(localStorageItemsEnum.ORDER, JSON.stringify(orderFromLocalStorage));
        },

        changeOrder: (state, action) => {
            const {itemId, curCount} = action.payload.data;

            const order = localStorage.getItem(localStorageItemsEnum.ORDER);
            let orderFromLocalStorage = order !== null ? JSON.parse(order) : [];

            const singleGoodsIndex = orderFromLocalStorage.findIndex((i: IProductOrdered) => i.productId === itemId);
            orderFromLocalStorage[singleGoodsIndex].count = curCount;

            state.userOrder.splice(singleGoodsIndex, 1, orderFromLocalStorage[singleGoodsIndex]);

            localStorage.setItem(localStorageItemsEnum.ORDER, JSON.stringify(orderFromLocalStorage));
        },

        changeOrderDeleteRecord: (state, action) => {
            const {itemId} = action.payload.data;

            const order = localStorage.getItem(localStorageItemsEnum.ORDER);
            let orderFromLocalStorage = order !== null ? JSON.parse(order) : [];

            let singleGoodsIndex = orderFromLocalStorage.findIndex((i: IProductOrdered) => i.productId === itemId);
            orderFromLocalStorage.splice(singleGoodsIndex, 1);

            state.userOrder.splice(singleGoodsIndex, 1);

            localStorage.setItem(localStorageItemsEnum.ORDER, JSON.stringify(orderFromLocalStorage));

            const cart = localStorage.getItem(localStorageItemsEnum.CART);
            let cartFromLocalStorage = cart !== null ? JSON.parse(cart) : [];

            singleGoodsIndex = cartFromLocalStorage.findIndex((i: IProduct) => i._id === itemId);
            cartFromLocalStorage.splice(singleGoodsIndex, 1);

            state.goods.splice(singleGoodsIndex, 1);

            localStorage.setItem(localStorageItemsEnum.CART, JSON.stringify(cartFromLocalStorage));
        },

        deleteOrder: (state) => {
            window.location.href = '/home';

            localStorage.removeItem(localStorageItemsEnum.CART);
            localStorage.removeItem(localStorageItemsEnum.ORDER);
            state.goods = [];
            state.userOrder = [];
            state.orderStatus = '';
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOrderToDB.rejected, (state, action) => {
                const {errorStatus, err} = action.payload as any;
                state.orderStatus = errorStatus;

                alert(state.orderStatus + '\nDear User your order has not been sent.\n' + err);
            })

    },
});

const {reducer: cartReducer, actions: {addToCart, changeOrder, changeOrderDeleteRecord, deleteOrder}} = cartSlice;

const cartActions = {
    addToCart,
    changeOrder,
    changeOrderDeleteRecord,
    deleteOrder,
    sendOrderToDB,
};

export {
    cartActions,
    cartReducer,
}
