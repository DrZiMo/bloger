import express from "express"
import dotenv from "dotenv"
import usersRoute from "../router/usersRouter"
import postsRoute from "../router/postsRouter"

const app = express()
dotenv.config()

app.use(express.json())

app.use("/users", usersRoute)
app.use("/posts", postsRoute)

// listening to the port
const PORT = process.env.PORT
app.listen(PORT, () => console.log("Server is running in port: " + PORT))