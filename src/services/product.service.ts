import { axiosService, Response } from "./axios.service";

import {IProduct, IProductWithPagination, IQueryParams} from "../interfaces";
import { adminUrls } from "../constants";

const productService = {
  getAll: (params: Partial<IQueryParams>, url: string = adminUrls.product): Response<IProductWithPagination> => axiosService.get(url, { params: { ...params } }),
  getById: (id: String): Response<IProduct> => axiosService.get(`${adminUrls.product}/${id}`),
  create: (product: IProduct): Response<IProduct> => axiosService.post(adminUrls.product, product),
  delete: (id: String) => axiosService.delete(`${adminUrls.product}/${id}`),
  update: (id: String, newProduct: IProduct): Response<IProduct> => axiosService.put(`${adminUrls.product}/${id}`, newProduct),
};

export { productService };
