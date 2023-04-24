import db from "../db.js";
import { ObjectId } from "mongodb";

const listOperations = async (req, res) => {
    let session;
    let user;
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).send("Token não enviado");

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
        const DATA = {username: user.name, list};
        return res.status(200).send(DATA);
    }catch(error){
        return res.status(50).send(error)
    }
}

const deleteOperation = async (req, res) => {
    
    const auth = req.headers.authorization;
    const id = req.headers.id;
    if(!auth) return res.status(422).send("Token Não enviado");

    const token = auth.replace('Baerer ', '');

    try{
        const session = await db.collection("sessions").findOne({token: token});
        if(!session) return res.status(401).send("Não autorizado");

        const del = await db.collection("transactions").deleteOne({_id: new ObjectId(id)})
        if(!del) return res.status(404).send("Operação não encontrada");
        console.log(del)
        return res.status(202).send("Deleted...")

    }catch(error){
        return res.status(422).send(error);
        
    }
    

    // try{
    //     
    // }catch(error){
    //     return res.status(422).send(error);
    // }
}

export {
        listOperations,
        deleteOperation
    }