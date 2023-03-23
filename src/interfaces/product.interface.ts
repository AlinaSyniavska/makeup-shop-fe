export interface IProduct {
  _id?: string;
  brand: string;
  name: string;
  price: number;
  priceSign: string;
  total: number;
  imageLink: string;
  description?: string;
  rating?: string;
  category: string;
  productType: string;
  tagList?: string[];
}
