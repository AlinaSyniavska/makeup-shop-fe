import Joi from "joi";

export const commonValidator = {
  commonName: Joi.string()
    .regex(/^(?=.*[a-zA-ZА-яёЁіІїЇ\d])[a-zA-ZА-яёЁіІїЇ\d _&-]{2,100}$/)
    .messages({
      "string.pattern.base":
        "Тільки букви, числа: мінімум 2 символ, максимум 100",
    }),
};
