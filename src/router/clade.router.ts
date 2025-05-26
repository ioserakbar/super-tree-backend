import { Router } from "express"
import { sample_Species, sample_Clades } from "../data";
import asyncHandler from "express-async-handler";
import { Clade, CladeModel } from "../models/clades.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { CalculateCladeDynamicData } from "../functions/clade.functions";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) =>{
        const cladeCount = await CladeModel.countDocuments();
        if(cladeCount > 0){
            res.send("Seed is already done");
            return;
        }

        await CladeModel.create(sample_Clades)
        res.send(sample_Clades)
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const clades = await CladeModel.find();
        console.log(clades)

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
        
        if(clade.length > 0){
            res.status(HTTP_BAD_REQUEST)
            .send("Clade already in database")
            return
        }

        const newClade: Clade ={
            id:'',
            name, 
            parentClade, 
            description
        }

        const dbSpecies = await CladeModel.create(newClade);
        res.send("Clade added to database")
    }
))

router.post("/clearData", asyncHandler(
    async(req, res) => {

        const clades = await CladeModel.find();
        
        if(clades.length == 0){
            res.send("No data found")
        }

        const resetedData =  {
            $set: {
                drawHelper:{
                    arcOrientation: false,
                    coords: {angle: 0, distance: 0},
                    totalSons: 0,
                },
                tier: 0
            }
        }

        await CladeModel.updateMany({}, resetedData)
        res.send("Data reseted succesfully")

    }   
))

router.post("/calculateData", asyncHandler(
    async(req, res) => {

        const clades = await CladeModel.find();
        
        if(clades.length == 0){
            res.send("No data found")
        }
        console.log("calculating data")
        var calculatedClades = CalculateCladeDynamicData(clades)

        res.send(calculatedClades.map(function (clade){
            return {
                name: clade.name, 
                drawHelper: clade.drawHelper, 
                tier: clade.tier
            }
        }))

        calculatedClades.forEach(async clade => {
            console.log("Updating " + clade.name)
            await CladeModel.updateOne({_id: clade.id}, {
                $set :{
                    drawHelper: clade.drawHelper,
                    tier: clade.tier
                }
            })
        });

    }   
))



export default router