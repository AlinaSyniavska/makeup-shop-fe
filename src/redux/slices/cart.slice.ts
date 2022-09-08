import {createSlice} from "@reduxjs/toolkit";

import {IProduct, IProductOrdered} from "../../interfaces";
import {localStorageItemsEnum} from "../../constants/localStorageItems";

interface IState {
    goods: IProduct[],
    userOrder: IProductOrdered[],
}

const initialState: IState = {
    goods: [],
    userOrder: [],
};



const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const goods = action.payload.goods;
            state.goods.push(goods);

            // const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")!) || [];
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

/*        deleteProduct: (state, action) => {
            const index = state.products.findIndex(product => product._id === action.payload.id);
            state.products.splice(index, 1);
        },*/



    },
    extraReducers: (builder) => {
        // builder

    },
});

const {reducer: cartReducer, actions: {addToCart, changeOrder}} = cartSlice;

const cartActions = {
    addToCart,
    changeOrder,
};

export {
    cartActions,
    cartReducer,
}
