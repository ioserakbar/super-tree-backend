import { Router } from "express"
import { sample_Species, sapmle_Clades } from "../data";
import asyncHandler from "express-async-handler";
import { Clade, CladeModel } from "../models/clades.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) =>{
        const cladeCount = await CladeModel.countDocuments();
        if(cladeCount > 0){
            res.send("Seed is already done");
            return;
        }
        res.send(sapmle_Clades)

        await CladeModel.create(sapmle_Clades)
        res.send("Seed is already done");
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const clades = await CladeModel.find();
        res.send(clades)
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {

        const searchRegex = new RegExp(req.params.searchTerm, 'i')

        const clades = await CladeModel.find({name:{$regex:searchRegex}})
        res.send(clades)
    }
))

router.post("/addClade", asyncHandler(
    async (req, res) => {
        const{ name, parentClade, description } = req.body


        const clade = await CladeModel.find({name})
        if(!clade){
            res.status(HTTP_BAD_REQUEST)
            .send("Clade already in database")
            return
        }

        const newClade: Clade ={
            id:'',
            name, 
            parentClade, 
            description, 
            isFirst: false,
            drawHelper: {
                arcOrientation: false,
                coords: {
                    distance: 0,
                    angle: 0
                },
                totalSons: 0
            },
            tier: 0
        }

        const dbSpecies = await CladeModel.create(newClade);
        res.send("Clade added to database")

    }
))



export default router