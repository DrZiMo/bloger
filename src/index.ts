import express from "express"
import dotenv from "dotenv"
import usersRoute from "../router/usersRouter"
import postsRoute from "../router/postsRouter"
import likesRoute from "../router/likesRouter"
import commentsRoute from "../router/commentsRouter"

const app = express()
dotenv.config()

app.use(express.json())

app.use("/users", usersRoute)
app.use("/posts", postsRoute)
app.use("/likes", likesRoute)
app.use("/comments", commentsRoute)

// listening to the port
const PORT = process.env.PORT
app.listen(PORT, () => console.log("Server is running in port: " + PORT))