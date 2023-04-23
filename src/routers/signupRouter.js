import express from "express";
import cors from "cors";

import { signUpValidation } from "../middlewares/signUpMiddle.js";
import { signUpUser } from "../controllers/signupController.js";

const signUp = express();


signUp.post("/cadastro", signUpValidation, signUpUser);

export {signUp};