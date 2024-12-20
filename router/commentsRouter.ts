import { Router } from "express";
import { createNewComment, deleteComment, getAllComment, getSingleComment, updateComment } from "../controllers/commentsController";
const route = Router()

route.get("/list", getAllComment)
route.get("/detail/:id", getSingleComment)
route.post("/create", createNewComment)
route.delete("/delete/:id", deleteComment)
route.put("/update", updateComment)

export default route