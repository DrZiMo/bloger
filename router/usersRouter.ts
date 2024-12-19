import { Router } from "express";
import { getAllUsers } from "../controllers/usersController";
const route = Router()

route.get("/list", getAllUsers)

export default route