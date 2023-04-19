import express from "express";
import cors from "cors";


import { signUpUser } from "../controllers/signupController.js";

const signUp = express();


signUp.post("/cadastro", signUpUser);

export {signUp};