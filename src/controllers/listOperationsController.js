import { MongoClient, ObjectId } from "mongodb";

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
    let session;
    let user;
    const auth = req.headers.authorization;
    if(!auth) return res.status(422).send("Token não enviado");

    const token = auth.replace('Baerer ', '');
    try{
        session = await db.collection("sessions").findOne({token: token});
        if(!session) return res.sendStatus(401);
    }catch(error){
        return res.status(500).send(error);
    }

    try{
        user = await db.collection("users").findOne({_id: session.userId});
        if(!user) return res.status(404).send("Usuário não encontrado")
    }catch(error){
        return res.status(501).send(error)
    }

    try{
        const list = await db.collection("transactions").find({userId: session.userId}).toArray();
        const DATA = {user, list};
        return res.status(200).send(DATA);
    }catch(error){
        return res.status(50).send(error)
    }
}

export {listOperations}