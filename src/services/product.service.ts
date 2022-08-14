import {axiosService, Response} from "./axios.service";
import {IProduct} from "../interfaces";
import {adminUrls} from "../constants";


const productService = {
    getAll: (page: string, perPage: string): Response<IProduct[]> => axiosService.get(adminUrls.product, {params: {page, perPage}}),
    getById: (id: String): Response<IProduct> => axiosService.get(`${adminUrls.product}/${id}`),
    create: (product: IProduct): Response<IProduct> => axiosService.post(adminUrls.product, product),
    delete: (id: String) => axiosService.delete(`${adminUrls.product}/${id}`),
    update: (id: String, newProduct: IProduct): Response<IProduct> => axiosService.put(`${adminUrls.product}/${id}`, newProduct),
};

export {
    productService,
}
