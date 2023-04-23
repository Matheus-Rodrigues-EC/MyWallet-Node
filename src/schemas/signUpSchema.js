import Joi from "joi";

const signUpSchema = Joi.object({
    Name: Joi.string()
            .min(3)
            .required(),

    Email: Joi.string()
            .email()
            .required(),

    Password: Joi.string()
            .min(3)
            .required()
})

export default signUpSchema;