import cors     from 'cors';
import express  from 'express';
import dotenv   from 'dotenv';

import { signUp }       from './routers/signupRouter.js';
import { signIn }       from './routers/signinRouter.js';
import { operations }   from './routers/operationsRouter.js';
import { logOutUser }       from './controllers/logoutController.js';




// Begin Declaring coonfigurations ----------------------------------------------------------
const api = express();
api.use(cors());
api.use(express.json());
dotenv.config();
const PORT = 5000;
// End Declaring coonfigurations ------------------------------------------------------------


api.use(signUp);
api.use(signIn);
api.use(operations);
api.use(logOutUser);


api.listen(PORT, () => console.log(`Server is Running at port ${PORT}`));