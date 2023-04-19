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

const logOutUser = async (req, res) => {
    const auth = req.headers.authorization;

    const token = auth.replace('Baerer ', '');
    try{
        const user = await db.collection("sessions").deleteOne({token: token});
        console.log(user)
        return res.status(202).send("Deslogado...");
    }catch(error){ 
        console.log(token)
        return res.sendStatus(500);
    }
}

export {logOutUser}