import { IProductOrdered } from "./productOrdered.interface";

export interface ICart {
  products: IProductOrdered[];
  userId: string;
  status: string;
  sum: number;
}
