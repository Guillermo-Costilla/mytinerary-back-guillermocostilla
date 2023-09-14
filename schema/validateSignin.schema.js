import Joi from 'joi';

export const validateSigninSchema = Joi.object({
    email: Joi.string()
    .required()
    .email({
        minDomainSegments: 2
    }),
    password: Joi.string()
    .required()
    .min(8)
    .max(35)
    .alphanum()
})

export default validateSigninSchema