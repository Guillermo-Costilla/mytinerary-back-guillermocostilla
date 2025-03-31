import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string()
    .required()
    .min(2)
    .max(30),

    lastname: Joi.string()
    .min(2)
    .max(30),

    email: Joi.string()
    .required()
    .email({
        minDomainSegments: 2
    }),

    password: Joi.string()
    .required()
    .min(8)
    .max(35)
    .alphanum(),

    image: Joi.string()
    .uri(),

    country: Joi.string()
    .min(2)
    .max(20),
})