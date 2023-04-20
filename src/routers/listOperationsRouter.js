import express from "express";
import cors from "cors";

import { listOperations } from "../controllers/listOperationsController.js";

const list = express();
list.use(cors());
list.use(express.json());

list.use("/home", listOperations);

export {list};