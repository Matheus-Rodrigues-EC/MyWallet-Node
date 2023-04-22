import dayjs from "dayjs";
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
    let session;

    if(!auth) return res.sendStatus(401);

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

    try{
        const token = auth.replace('Baerer ', '');
        session = await db.collection("sessions").findOne({token: token})
        if(!session) return res.status(422).send("Token inválido");
    }catch(error){
        return res.sendStatus(422);
    }

    try{
        await db.collection().findOne()
    }catch(error){

    }

    try{
        const day = dayjs().format("DD/MM");
        await db.collection("transactions").insertOne({
            userId: session.userId,
            date: day,
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
    let session;

    if(!auth) return res.sendStatus(401);

    if(operationsSchema.validate({Value: value, Desciption: description}).error !== undefined){
        if(operationsSchema.validate({Value: value, Desciption: description}).error.message === '"Value" must be a positive number'){
            return res.status(422).send("O valor de saída deve ser maior que 0");
        }
        if(operationsSchema.validate({Value: value, Desciption: description}).error.message === '"Value" is required'){
            return res.status(422).send("O campo VALOR deve ser preenchido");
        }
        if(operationsSchema.validate({Value: value, Desciption: description}).error.message === '"Desciption" is not allowed to be empty'){
            return res.status(422).send("O campo DESCRIÇÂO deve ser preenchido");
        }
        return res.status(422).send(operationsSchema.validate({Value: value, Desciption: description}).error.message);
    }

    try{
        const token = auth.replace('Baerer ', '');
        session = await db.collection("sessions").findOne({token: token})
        if(!session)  return res.status(422).send("Token inválido");
    }catch(error){
        return res.sendStatus(422);
    }

    try{
        const day = dayjs().format("DD/MM");
        await db.collection("transactions").insertOne({
            userId: session.userId,
            date: day,
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