import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

import { signUp } from './routers/signupRouter.js';




// Begin Declaring coonfigurations ----------------------------------------------------------
const api = express();
api.use(cors());
api.use(express.json());
dotenv.config();
const PORT = 5000;
// End Declaring coonfigurations ------------------------------------------------------------

api.use(signUp)


api.listen(PORT, () => console.log(`Server is Running at port ${PORT}`));