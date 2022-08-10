import Joi from "joi";

const itemValidator = Joi.object({
    // name: Joi.string().regex(/^[a-zA-ZА-яёЁіІїЇ]{2,20}$/).required().messages({
    name: Joi.string().regex(/^(?=.*[a-zA-ZА-яёЁіІїЇ\d])[a-zA-ZА-яёЁіІїЇ\d _]{2,20}$/).required().messages({
        'string.pattern.base': 'Тільки букви: мінімум 2 символ, максимум 20'
    }),
});

export {
    itemValidator
}