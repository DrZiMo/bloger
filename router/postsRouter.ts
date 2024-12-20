import { Router } from "express"
import { createNewUPost, deletePost, getAllPosts, getSinglePost, updatePost } from "../controllers/postsController"
const router = Router()

router.get("/list", getAllPosts)
router.get("/detail/:id", getSinglePost)
router.post("/create", createNewUPost)
router.delete("/delete/:id", deletePost)
router.put("/update", updatePost)

export default router