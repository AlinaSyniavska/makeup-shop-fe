import Joi from "joi";

import { commonValidator } from "./common.validator";
import { priceSignEnum, tags } from "../constants";

const productValidator = Joi.object({
  name: commonValidator.commonName.required(),
  brand: commonValidator.commonName.required(),
  price: Joi.number().required(),
  priceSign: Joi.string()
    .max(3)
    .valid(...Object.values(priceSignEnum))
    .required(),
  total: Joi.number().required(),
  imageLink: Joi.string(),
  description: Joi.string()
    .empty("")
    .default("Some description about the product"),
  rating: Joi.string(),
  category: commonValidator.commonName.required(),
  productType: commonValidator.commonName.required(),
  tagList: Joi.array().items(Joi.string().valid(...tags)),
});

export { productValidator };
