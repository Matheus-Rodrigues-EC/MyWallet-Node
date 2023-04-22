import cors     from 'cors';
import express  from 'express';
import dotenv   from 'dotenv';

import { signUp }       from './routers/signupRouter.js';
import { signIn }       from './routers/signinRouter.js';
import { list }         from './routers/listOperationsRouter.js';
import { operations }   from './routers/operationsRouter.js';

// Begin Declaring coonfigurations ----------------------------------------------------------
const api = express();
api.use(cors());
api.use(express.json());
dotenv.config();
// End Declaring coonfigurations ------------------------------------------------------------

api.use(signUp);
api.use(signIn);
api.use(list);
api.use(operations);

api.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT)
});