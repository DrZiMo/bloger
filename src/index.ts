import express from "express"
import dotenv from "dotenv"

const app = express()
dotenv.config()

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server is running in port: " + PORT))
