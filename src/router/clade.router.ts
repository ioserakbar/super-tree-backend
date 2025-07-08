import { Router } from "express"
import { sample_Species, sample_Clades } from "../data";
import asyncHandler from "express-async-handler";
import { Clade, CladeModel } from "../models/clades.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { CalculateCladeDynamicData, getOrderedClades } from "../functions/clade.functions";

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

        const allClades = await CladeModel.find();
        const rootClade = await allClades.find(c => c.name == "Dinosauria");

        var orderedClades = getOrderedClades(allClades, rootClade!.id)

        res.send(orderedClades)
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
        const{ name, parentCladeId, description, tier, isFirst, directSons, mergeMethod} = req.body

        // Add the new clad
        const clade = await CladeModel.find({name})
        if(clade.length > 0){
            res.status(HTTP_BAD_REQUEST)
            .send("Clade already in database")
            return
        }
        console.log("adding clade")
        console.log(req.body)

        var newCladeDirectSons: string[] = []

        if(mergeMethod != "sibling"){
            newCladeDirectSons = [ ...directSons]

        }

        const newCladeInfo: Clade ={
            id:'',
            name, 
            parentClade: parentCladeId, 
            description, 
            tier, 
            isFirst,
            directSons: newCladeDirectSons
        }
        
        const newClade = await CladeModel.create(newCladeInfo);

        //We find the parent
        const parentClade = await CladeModel.findOne({_id: parentCladeId})

        //We add it to the directSons array of the parent & delete the son of the new clade from the direct sons of the parent
        const newCladeId =  newClade.id;

        if(mergeMethod == "both"){

            parentClade!.directSons = [newCladeId]

        }
        else if(mergeMethod == "sibling"){
            
            parentClade!.directSons!.push(newCladeId)

        }
        else if(mergeMethod == "parent"){
            
            // We take the new clade children from the parent, and add the new clade as a new child of the clade parent
            parentClade!.directSons!.splice(parentClade!.directSons!.indexOf(newClade.directSons![0]), 1)
            parentClade!.directSons!.push(newCladeId)
        }

        await parentClade?.save()

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
                    arcOrientation: true,
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
                tier: clade.tier,
                directSons: clade.directSons
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