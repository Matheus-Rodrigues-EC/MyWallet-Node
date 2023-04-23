import bcrypt from "bcrypt";
import dotenv from "dotenv/config"
import Joi from "joi";
import { MongoClient } from 'mongodb';

// Conexão com o Banco
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect()
    .then(() => {
        console.log("DataBase Connected...")
        db = mongoClient.db()
    })
    .catch((error) => console.log(error.message));
//------------------------------------------------------------------


const signUpUser = async (req, res) => {

    const { name, email, password} = req.body;

    

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