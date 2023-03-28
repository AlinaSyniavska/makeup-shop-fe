import Joi from "joi";

import { regexEnum } from "../constants";

export const commonValidator = {
  commonName: Joi.string()
    .regex(regexEnum.NAME_PRODUCT)
    .messages({
      "string.pattern.base": "Use only letters/digits: min 2 signs, max 100",
    }),
};
