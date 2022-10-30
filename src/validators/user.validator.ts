import Joi from "joi";
import {genderEnum} from "../constants";

const userValidator = Joi.object({
    name: Joi.string().regex(/^(?=.*[a-zA-ZА-яёЁіІїЇ])[a-zA-ZА-яёЁіІїЇ -]{1,30}$/).required().messages({
        'string.pattern.base': 'Тільки букви: мінімум 1 символ, максимум 30'
    }),
    surname: Joi.string().regex(/^(?=.*[a-zA-ZА-яёЁіІїЇ])[a-zA-ZА-яёЁіІїЇ -]{1,30}$/).required().messages({
        'string.pattern.base': 'Тільки букви: мінімум 1 символ, максимум 30'
    }),
    gender: Joi.string().valid(...Object.values(genderEnum)).required(),
    phone: Joi.string().regex(/^[+]*\d{5,20}$/).required(),
    age: Joi.number().min(1).max(120),
    // eslint-disable-next-line no-empty-character-class
    email: Joi.string().regex(/^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/).required(),
    password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/),
});

export {
    userValidator,
}




