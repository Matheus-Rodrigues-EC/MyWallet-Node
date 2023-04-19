import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

import { signUp } from './routers/signupRouter.js';
import { signIn } from './routers/signinRouter.js';




// Begin Declaring coonfigurations ----------------------------------------------------------
const api = express();
api.use(cors());
api.use(express.json());
dotenv.config();
const PORT = 5000;
// End Declaring coonfigurations ------------------------------------------------------------

api.use(signUp);
api.use(signIn);


api.listen(PORT, () => console.log(`Server is Running at port ${PORT}`));