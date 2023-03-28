import Joi from "joi";

import { genderEnum, regexEnum } from "../constants";

const userValidator = Joi.object({
  name: Joi.string().regex(regexEnum.NAME_USER).required()
    .messages({
      "string.pattern.base": "Use only letters: min 2 signs, max 30",
    }),
  surname: Joi.string().regex(regexEnum.NAME_USER).required()
    .messages({
      "string.pattern.base": "Use only letters: min 2 signs, max 30",
    }),
  gender: Joi.string().valid(...Object.values(genderEnum)).required(),
  phone: Joi.string().regex(regexEnum.PHONE).required(),
  age: Joi.number().min(1).max(120),
  // eslint-disable-next-line no-empty-character-class
  email: Joi.string().regex(regexEnum.EMAIL).required(),
  password: Joi.string().regex(regexEnum.PASSWORD),
  favoriteList: Joi.array().items(Joi.string()),
});

export { userValidator };
