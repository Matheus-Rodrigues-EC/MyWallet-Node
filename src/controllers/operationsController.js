import dayjs from "dayjs";
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

const operationsSchema = Joi.object({
    Value: Joi.number()
            .positive()
            .precision(2)
            .required(),
    
    Desciption: Joi.string()
            .required()
})

const operationIn = async (req, res) => {
    const { value, description } = req.body;
    const auth = req.headers.authorization;

    if(!auth) return res.sendStatus(401);

    if(operationsSchema.validate({Value: value, Desciption: description}).error !== undefined){
        return res.status(422).send(operationsSchema.validate({Value: value, Desciption: description}).error.message);
    }

    try{
        const token = auth.replace('Baerer ', '');
        const user = await db.collection("sessions").findOne({token: token})
        if(!user){
            return res.status(422).send("Token inválido");
        }
    }catch(error){
        return res.sendStatus(422);
    }

    try{
        const day = dayjs().format("DD/MM");
        await db.collection("transactions").insertOne({
            day: day,
            value: value,
            description: description,
            type: "entrada"
        })
        return res.sendStatus(201);
    }catch(error){
        return res.sendStatus(422);
    }
}

const operationOut = async (req, res) => {
    const { value, description } = req.body;
    const auth = req.headers.authorization;

    if(!auth) return res.sendStatus(401);

    if(operationsSchema.validate({Value: value, Desciption: description}).error !== undefined){
        return res.status(422).send(operationsSchema.validate({Value: value, Desciption: description}).error.message);
    }

    try{
        const token = auth.replace('Baerer ', '');
        const user = await db.collection("sessions").findOne({token: token})
        if(!user){
            return res.status(422).send("Token inválido");
        }
    }catch(error){
        return res.sendStatus(422);
    }

    try{
        const day = dayjs().format("DD/MM");
        await db.collection("transactions").insertOne({
            day: day,
            value: value,
            description: description,
            type: "saida"
        })
        return res.sendStatus(201);
    }catch(error){
        return res.sendStatus(422);
    }
}


export {
        operationIn,
        operationOut
    }