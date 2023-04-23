import Joi from "joi";

const operationsSchema = Joi.object({
        Value: Joi.number()
                .positive()
                .precision(2)
                .required(),

        Desciption: Joi.string()
                .required()
})

export default operationsSchema;