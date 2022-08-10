import Joi from "joi";

const userValidator = Joi.object({
    name: Joi.string().regex(/^[a-zA-ZА-яёЁіІїЇ]{2,20}$/).required().messages({
        'string.pattern.base': 'Тільки букви: мінімум 1 символ, максимум 20'
    }),
    age: Joi.number().min(1).max(120),
    // eslint-disable-next-line no-empty-character-class
    email: Joi.string().regex(/^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/).required(),
    password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/),
    phone: Joi.string().regex(/^[+]*\d{5,20}$/).required(),
});

export {
    userValidator,
}