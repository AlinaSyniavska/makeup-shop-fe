import {IProduct} from "./product.interface";

export interface IProductsPagination {
    page: number,
    perPage: number,
    data: IProduct[],
    count: number,
}
