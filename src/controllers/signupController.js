import bcrypt from "bcrypt";
import dotenv from "dotenv/config"
import Joi from "joi";
import { MongoClient } from 'mongodb';

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


const signUpUser = async (req, res) => {

    const { name, email, password, re_password } = req.body;

    const signUpSchema = Joi.object({
        Name: Joi.string()
                .min(3)
                .required(),

        Email: Joi.string()
                .email()
                .required(),

        Password: Joi.string()
                .min(3)
                .required(),
    
        repeat_password: Joi.ref('Password'),
    })

    if(signUpSchema.validate({Name: name, Email: email, Password: password, repeat_password: re_password}).error !== undefined){
        return res.status(422).send(signUpSchema.validate(
            {Name: name, Email: email, Password: password, repeat_password: re_password}
            ).error.message)
    }

    const verify = await db.collection("users").findOne({email: email});
    if(verify) return res.status(409).send("Email já cadastrado.");

    const hashpass = bcrypt.hashSync(password, 5);

    try{
        await db.collection("users").insertOne({
            name: name,
            email: email,
            password: hashpass
        })
        res.sendStatus(201);
    }catch(error){
        console.log(error)
    }
}

export {
        signUpUser
    }