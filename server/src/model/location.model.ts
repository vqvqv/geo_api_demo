import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    ip: {type: String, required: true},
    city: {type: String, required: false},
    country: {type: String, required: false},
    createdAt: {type: Date, required: false, default: Date.now}
});

export const locationModel = mongoose.model("location", locationSchema);

export interface locationSearchInput {
    ip: String,
    city?: String,
    country?: String
}


export interface locationDocument extends mongoose.Document{
    
}