import {v4 as uuidv4} from 'uuid';
import { Species } from './models/species.model';
import { Clade } from './models/clades.model';

var tricerId = 'db0c2d5d-a678-47d1-8e2b-ca07dbc9de67'
var trexId = '5d4eaf71-7382-4120-baf8-a27063e41929'
var diplodocusId = '7a1e0386-f4ba-4892-a78f-c154e932d0e5'
var megaloId = '1d0bece2-4120-4892-a78f-ca07dbc9de67'

var tricerSpeciesId = '509410cf-b52b-4dc1-a777-6e35e2ffc01f'

export const sample_Species: Species[] = [
    {
        id: tricerSpeciesId, 
        binomialNomenclature:  "Triceratops horridus", 
        genus: tricerId
    },
    {
        id: uuidv4(), 
        binomialNomenclature:  "Tyrannosaurus rex", 
        genus: trexId
    },
    {
        id: uuidv4(), 
        binomialNomenclature:  "Diplodocus longus", 
        genus: diplodocusId
    },
    {
        id: uuidv4(), 
        binomialNomenclature:  "Megalosaurus bucklandii", 
        genus: megaloId
    },
]

var DinosauriaId = 'a4260383-2d57-4ee2-986a-323bd7804cb6'
var OrnithischiaId = 'f8da3f3c-f85f-4edf-be6f-2977451fa2e6'
var SaurischiaId = 'd3874820-6d12-4e47-abec-ecaf14bfaed4'
var TheropodaId = '1d0bece2-3951-46f0-9d8f-c4d58ca36da4'
var MegalosauroideaId = '57dc9a94-47bc-451a-8e99-25b5245714d7'
var CoelurosauriaId = '0754d3e5-e855-4126-8c22-61640ae8b7c6'
var SauropodomorphaId = 'dec43eeb-447d-41b5-ab9f-3c9cbbd33dd7'
var DinosauriaId = '563f16e2-1ad7-4aa2-a902-a38a168489d0'

export const sapmle_Clades: any[] = [
    {
        id: DinosauriaId,
        name: "Dinosauria", 
        tier: 0,
        description: "",
        parentClade: uuidv4(),
        isFirst: true, 
        drawHelper:{
            coords:{
                angle: 0, 
                distance: 0
            }, 
            totalSons: 10, 
            arcOrientation: false
        },
        directSons: [
            OrnithischiaId,
            SaurischiaId
        ]
    },
    {
        id: OrnithischiaId,
        name: "Ornithischia", 
        tier: 1,
        parentClade: DinosauriaId,
        isFirst: false, 
        drawHelper:{
            coords:{
                angle: 90, 
                distance: 100
            }, 
            totalSons: 1, 
            arcOrientation: true
        },
        directSons: [
            tricerId,
        ]
    },
    {
        id: tricerId,
        name: "Triceratops", 
        tier: 2,
        parentClade: OrnithischiaId,
        isFirst: false, 
        drawHelper:{
            coords:{
                angle: 90, 
                distance: 400
            }, 
            totalSons: 0, 
            arcOrientation: false
        }
    },
    {
        id: SaurischiaId,
        name: "Saurischia", 
        tier: 1,
        parentClade: DinosauriaId,
        isFirst: false, 
        drawHelper:{
            coords:{
                angle: 270, 
                distance: 100
            }, 
            totalSons: 7, 
            arcOrientation: false
        },
        directSons: [
            TheropodaId,
            SauropodomorphaId
        ]
    },
    {
        id: TheropodaId,
        name: "Theropoda", 
        tier: 2,
        parentClade: SaurischiaId,
        isFirst: false, drawHelper:{
            coords:{
                angle: 225, 
                distance: 200
            }, 
            totalSons: 4, 
            arcOrientation: false
        },
        directSons: [
            CoelurosauriaId,
            MegalosauroideaId
        ]
    },
    {
        id: MegalosauroideaId,
        name: "Megalosauroidea",
        tier: 3, 
        parentClade: TheropodaId,
        isFirst: false, 
        drawHelper:{
            coords:{
                angle: 180, 
                distance: 300
            }, 
            totalSons: 1, 
            arcOrientation: false
        },
        directSons: [
            megaloId
        ]
    },
    {
        id: megaloId,
        name: "Megalosaurus", 
        tier: 4,
        parentClade: MegalosauroideaId,
        isFirst: false, 
        drawHelper:{
            coords:{
                angle: 180, 
                distance: 400
            }, 
            totalSons: 0, 
            arcOrientation: true
        }
    },
    {
        id: CoelurosauriaId,
        name: "Coelurosauria", 
        tier: 3,
        parentClade: TheropodaId,
        isFirst: false, 
        drawHelper:{
            coords:{
                angle: 270, 
                distance: 300
            }, 
            totalSons: 1, 
            arcOrientation: true
        },
        directSons: [
            trexId
        ]
    },
    {
        id: trexId,
        name: "Tyrannosaurus", 
        tier: 4,
        parentClade: CoelurosauriaId,
        isFirst: false, 
        drawHelper:{
            coords:{
                angle: 270, 
                distance: 400
            }, 
            totalSons: 0, 
            arcOrientation: false
        }
    },
    {
        id: SauropodomorphaId,
        name: "Sauropodomorpha", 
        tier: 2,
        parentClade: SaurischiaId,
        isFirst: false, 
        drawHelper:{
            coords:{
                angle: 0, 
                distance: 200
            }, 
            totalSons: 1, 
            arcOrientation: true
        },
        directSons: [
            diplodocusId
        ]
    },
    {
        id: diplodocusId,
        name: "Diplodocus", 
        tier: 3,
        parentClade: SauropodomorphaId,
        isFirst: false, 
        drawHelper:{
            coords:{
                angle: 0, 
                distance: 400
            }, 
            totalSons: 0, 
            arcOrientation: false
        }
    }
    
]