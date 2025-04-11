import { Schema, model } from "mongoose"

export interface Clade{
    id: string
    name: string
    parentClade: string
    description: string
    isFirst: boolean
    drawHelper: {
        coords:{
            angle: number,
            distance: number
        }
        totalSons: number
        arcOrientation: boolean
    }
    tier:number
}


export const SpeciesShcema = new Schema<Clade>(
    {
        name: {type: String, required: true},
        parentClade: {type: String, required: true},
        description: {type: String},
        isFirst: {type: Boolean, required: true},
        drawHelper: {
            coords:{
                angle: {type: Number, required: true},
                distance: {type: Number, required: true},
            },
            totalSons: {type: Number, required: true},
            arcOrientation: {type: Boolean, required: true}
        },
        tier: {type: Number, required: true},
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps: true
    }
)

export const CladeModel = model<Clade>('clades', SpeciesShcema)