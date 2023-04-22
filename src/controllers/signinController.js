import bcrypt from "bcrypt";
import Joi from "joi";
import { MongoClient } from 'mongodb';
import { v4 as uuid } from 'uuid';

// Conexão com o Banco
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

mongoClient.connect()
    .then(() => {
        console.log("DataBase Connected...")
        db = mongoClient.db()
    })
    .catch((error) => console.log(error.message));
//------------------------------------------------------------------

const signInUser = async (req, res) => {

    const { email, password } = req.body;

    const signInSchema = Joi.object({
        Email: Joi.string()
                .email()
                .required(),

        Password: Joi.string()
                    .required()
    });

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

    const user = await db.collection("users").findOne({email: email});

    if(!user) return res.status(404).send("Usuário não encontrado");

    try{
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await db.collection("sessions").insertOne({userId: user._id,token})
            return res.status(200).send({token: token});
        }else{
            return res.status(401).send("Email e/ou Senha Incorreto(s)");
        }
    }catch(error){
        return res.status(401).send(error);
    }

    
}

export {
        signInUser
    }