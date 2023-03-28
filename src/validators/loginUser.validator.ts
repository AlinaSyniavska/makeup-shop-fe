import Joi from "joi";
import {regexEnum} from "../constants";

const loginUserValidator = Joi.object({
  email: Joi.string().regex(regexEnum.EMAIL).required(),
  password: Joi.string().regex(regexEnum.PASSWORD),
});

export { loginUserValidator };
