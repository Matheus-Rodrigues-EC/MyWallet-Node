import express from "express";
import cors from "cors";

import { operationIn, operationOut } from "../controllers/operationsController.js";

const operations = express();
operations.use(cors());
operations.use(express.json());

operations.post("/nova-transacao/entrada", operationIn);

operations.post("/nova-transacao/saida", operationOut);

export {operations};