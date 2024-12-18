import express from "express"
import dotenv from "dotenv"

const app = express()
dotenv.config()

// listening to the port
const PORT = process.env.PORT
app.listen(PORT, () => console.log("Server is running in port: " + PORT))