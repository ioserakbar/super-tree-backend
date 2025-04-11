
import { Router } from "express"
import { sapmle_Clades, sample_Species } from "../data";
import asyncHandler from "express-async-handler";
import { Species, SpeciesModel } from "../models/species.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";

const router = Router();


router.get("/seed", asyncHandler(
    async (req, res) =>{
        const speciesCount = await SpeciesModel.countDocuments();
        if(speciesCount > 0){
            res.send("Seed is already done");
            return;
        }
        res.send(sample_Species)

        await SpeciesModel.create(sample_Species)
        res.send("Seed is already done");
    }
))

router.get("/", (req, res) => {
    res.send(sample_Species)
})

router.get("/getFamily/:species", (req, res) => {

    var result: any;

    const speciesId = req.params.species

    if(typeof speciesId === undefined){
        res.send({
            response: "invalid ID",
            result: result
        })
    }

    const species = sample_Species.find(species => species.id == speciesId)!;

    if(species === undefined || species === null){
        result = "Species not found"

        res.send({
            response: "ERROR",
            result: result
        })
    }
    var family: any[] = []

    var clades = sapmle_Clades;
    var currentCladeId = sapmle_Clades.find(x => x.id == species.genus)?.id;
    if(currentCladeId === undefined){
        console.error(species.binomialNomenclature + " genus (id: " + species.genus + ") not found")
    }

    var searchFinished = false;
    do{

        var currentClade = clades.find(x=>x.id == currentCladeId);

        if(currentCladeId == currentClade?.parentClade) {
            console.error('Clade has self reference parent', currentClade)
            searchFinished = true;
        }

        if(currentClade?.isFirst){
            family.push(currentClade);
            searchFinished = true;
        } else {
            family.push(currentClade);
            currentCladeId = currentClade?.parentClade;
        }
    }while(!searchFinished)

    result = family;


    res.send(family)
})

router.post("/addSpecies", asyncHandler(
    async (req, res) => {
        const{ binomialNomenclature, genus } = req.body


        const species = await SpeciesModel.find({binomialNomenclature})
        if(!species){
            res.status(HTTP_BAD_REQUEST)
            .send("Species already in database")
            return
        }

        const newSpecies: Species ={
            id:'',
            binomialNomenclature, 
            genus
        }

        const dbSpecies = await SpeciesModel.create(newSpecies);
        res.send("Species added to database")

    }
))

// Species faimly prototype
// family:[
//     Dinosauria,
//     Saurischia,
//     Theropoda,
//     Coleosauria,
//     Tyrannosauria,
// ]

export default router