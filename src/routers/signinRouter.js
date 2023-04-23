import express from "express";
import cors from "cors";

import { signInValidationMiddle } from "../middlewares/signInMiddle.js";
import { signInUser } from "../controllers/signinController.js";

const signIn = express();
signIn.use(cors());
signIn.use(express.json());


signIn.post("/login", signInValidationMiddle, signInUser);

export {signIn};