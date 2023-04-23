import signInSchema from "../schemas/sigInSchema.js";

export function signInValidationMiddle(req, res, next){
    const { email, password } = req.body;

    if(signInSchema.validate({Email: email, Password: password}).error !== undefined){
        if(signInSchema.validate({Email: email, Password: password}).error.message === '"Email" is required'){
            return res.status(422).send("O campo EMAIL é obrigatório");
        }
        if(signInSchema.validate({Email: email, Password: password}).error.message === '"Email" must be a valid email'){
            return res.status(422).send("O campo EMAIL deve conter um email válido");
        }
        if(signInSchema.validate({Email: email, Password: password}).error.message === '"Password" is required'){
            return res.status(422).send("O campo SENHA é obrigatório");
        }

        //"Email" is not allowed to be empty  "Email" must be a valid email
        return res.status(422).send(signInSchema.validate({Email: email, Password: password}).error.message);
    }

    next();

}