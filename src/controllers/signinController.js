import bcrypt from "bcrypt";
import db from "../db.js";
import { v4 as uuid } from 'uuid';

const signInUser = async (req, res) => {

    const { email, password } = req.body;

    console.log(db)
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