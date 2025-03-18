import express from "express"
import cors from "cors"
import { sample_Species, sapmle_Clades } from "./data";

const app = express();
app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}))

app.get("/api/species", (req, res) => {
    res.send(sample_Species)
})

app.get("/api/clades", (req, res) => {
    res.send(sapmle_Clades)
})

app.get("/api/clades/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm
    const clades = sapmle_Clades.filter(clade => clade.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    res.send(clades)
})

const port = 5000

app.listen(port, () => {
    console.log("Website served on http://localhost:" + port)
})