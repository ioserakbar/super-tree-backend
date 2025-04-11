import dotenv from 'dotenv'
dotenv.config();
import express from "express"
import cors from "cors"
import cladeRouter from "./router/clade.router"
import speciesRouter from "./router/species.router"
import { dbConnect } from './configs/database.config';
dbConnect();
const app = express();
const bodyParser = require('body-parser')

app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}))

app.use(express.json())
app.use(bodyParser.json())

app.use("/api/clades", cladeRouter)
app.use("/api/species", speciesRouter)

const port = 5001

app.listen(port, () => {
    console.log("Website served on http://localhost:" + port)
})