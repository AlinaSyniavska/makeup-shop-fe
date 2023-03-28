import Joi from "joi";

import { commonValidator } from "./common.validator";

const itemValidator = Joi.object({
  name: commonValidator.commonName.required(),
});

export { itemValidator };
