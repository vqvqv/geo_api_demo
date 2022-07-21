import { createLocationSchemaType, getLocationSchemaTypeS, updateLocationSchemaType, deleteLocationSchemaType } from "../schema/location.schema";
import { locationModel, locationDocument } from "../model/location.model";
import mongoose from "mongoose";

const createLocation = async (locationData: createLocationSchemaType["body"]["data"])=>{
    try{
        const location = await locationModel.create(locationData);
        return location;
    }
    catch(err){
        throw err;
    }
},
getLocation = async (locationQuery: getLocationSchemaTypeS)=>{
    try {
        let location = await locationModel.find(locationQuery.search).sort(locationQuery.sort);
        return location
    }
    catch(err){
        throw err;
    }
},
updateLocation = async (locationQuery: updateLocationSchemaType)=>{
    try {
        const location = await locationModel.findOneAndUpdate({_id : locationQuery.search.id}, locationQuery.update);
        return location
    }
    catch(err){
        throw err;
    }
},
deleteLocation = async (locationQuery: deleteLocationSchemaType)=>{
    try {
        const location = await locationModel.findOneAndRemove(locationQuery);
        return location
    }
    catch(err){
        throw err;
    }
}

export { createLocation, getLocation, updateLocation, deleteLocation };