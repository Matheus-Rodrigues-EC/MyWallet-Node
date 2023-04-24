import express from "express";
import cors from "cors";

import { listOperations, deleteOperation } from "../controllers/listOperationsController.js";


const list = express();
list.use(cors());
list.use(express.json());

list.use("/home/:id", deleteOperation);
list.use("/home", listOperations);



export {list };