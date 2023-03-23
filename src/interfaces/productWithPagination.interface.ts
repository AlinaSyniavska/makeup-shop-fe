import { IProduct } from "./product.interface";

export interface IProductWithPagination {
  page: string;
  perPage: string;
  data: IProduct[];
  count: string;
}
