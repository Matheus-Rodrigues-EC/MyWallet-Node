import bcrypt from "bcrypt";
import dotenv from "dotenv/config"
import express from "express";
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
                    .min(3)
                    .required()
    });

    if(signInSchema.validate({Email: email, Password: password}).error !== undefined){
        return res.status(422).send(signInSchema.validate({Email: email, Password: password}).error.message);
    }

    const user = await db.collection("users").findOne({email: email});

    if(!user) return res.status(404).send("Usuário não encontrado");

    if(user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
		await db.collection("sessions").insertOne({userId: user._id,token})
        return res.status(200).send(token);
    } else {
        return res.status(401).send("Email ou Senha Incorreto(s)")
    }
}

export {
        signInUser
    }