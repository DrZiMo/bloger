import { Router } from "express";
import { createNewReaction, deleteReaction, getAllReactions, getSingleReaction, updateReaction } from "../controllers/reactionController";
const route = Router()

route.get("/list", getAllReactions)
route.get("/detail/:id", getSingleReaction)
route.post("/create", createNewReaction)
route.delete("/delete/:id", deleteReaction)
route.put("/update", updateReaction)

export default route