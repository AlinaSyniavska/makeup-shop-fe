import {ICart} from "../interfaces";
import {axiosService, Response} from "./axios.service";
import {urls} from "../constants";

const cartService = {
    sendToDB: (order: ICart): Response<void> => axiosService.post(urls.cart, order),
};

export {
    cartService,
}
