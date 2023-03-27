import { axiosService, Response } from "./axios.service";

import { ICart } from "../interfaces";
import { urls } from "../constants";

const cartService = {
  sendToDB: (order: ICart): Response<void> => axiosService.post(urls.cart, order),
};

export { cartService };
