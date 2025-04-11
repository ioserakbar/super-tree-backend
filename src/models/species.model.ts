import { Schema, model } from "mongoose"

export interface Species{
    id: string
    binomialNomenclature: string
    genus: string
}


export const SpeciesShcema = new Schema<Species>(
    {
        binomialNomenclature: {type: String, required: true},
        genus: {type: String, required: true}
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

export const SpeciesModel = model<Species>('species', SpeciesShcema)