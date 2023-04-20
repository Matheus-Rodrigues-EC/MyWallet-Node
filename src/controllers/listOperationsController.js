import { MongoClient } from "mongodb";

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


const listOperations = async (req, res) => {
    const auth = req.headers.authorization;
    if(!auth) return res.sendStatus(422);

    const token = auth.replace('Baerer ', '');
    try{
        const user = await db.collection("sessions").findOne({token: token});
        if(!user) return res.sendStatus(401);
    }catch(error){
        return res.status(500).send(error);
    }

    try{
        const list = await db.collection("transactions").find().toArray();
        return res.status(200).send(list);
    }catch(error){
        return res.status(500).send(error)
    }
}

export {listOperations}