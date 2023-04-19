import express from "express";
import cors from "cors";


import { signInUser } from "../controllers/signinController.js";

const signIn = express();


signIn.post("/login", signInUser);

export {signIn};