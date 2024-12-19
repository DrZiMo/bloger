import { Router } from "express";
import { createNewUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/usersController";
const route = Router()

route.get("/list", getAllUsers)
route.get("detail/:id", getSingleUser)
route.post("/create", createNewUser)
route.delete("/delete/:id", deleteUser)
route.put("/update", updateUser)

export default route