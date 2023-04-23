import express from "express";
import cors from "cors";

import { operationsValidation } from "../middlewares/operationsMiddle.js";
import { operationIn, operationOut } from "../controllers/operationsController.js";

const operations = express();
operations.use(cors());
operations.use(express.json());

operations.post("/nova-transacao/entrada", operationsValidation, operationIn);

operations.post("/nova-transacao/saida", operationsValidation, operationOut);

export {operations};