import operationsSchema from './../schemas/operationsSchema.js';

export function operationsValidation (req, res, next){

    const { value, description } = req.body;

    if(operationsSchema.validate({Value: value, Desciption: description}).error !== undefined){
        if(operationsSchema.validate({Value: value, Desciption: description}).error.message === '"Value" must be a positive number'){
            return res.status(422).send("O valor de entrada deve ser maior que 0");
        }
        if(operationsSchema.validate({Value: value, Desciption: description}).error.message === '"Value" is required'){
            return res.status(422).send("O campo VALOR deve ser preenchido");
        }
        if(operationsSchema.validate({Value: value, Desciption: description}).error.message === '"Desciption" is not allowed to be empty'){
            return res.status(422).send("O campo DESCRIÇÂO deve ser preenchido");
        }
        
        return res.status(422).send(operationsSchema.validate({Value: value, Desciption: description}).error.message);
    }

    next();
}