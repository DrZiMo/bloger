import { Router } from "express";
import { createNewLike, deleteLike, getAllLikes, getSingleLike } from "../controllers/likesController";
const route = Router()

route.get("/list", getAllLikes)
route.get("/detail/:id", getSingleLike)
route.post("/create", createNewLike)
route.delete("/delete/:id", deleteLike)

export default route