import { getLocationSchemaType, createLocationSchemaType, updateLocationSchemaType } from "../schema/location.schema";
import logger from "../utils/logger";
import { Request, Response, NextFunction } from "express";
import { createLocation, getLocation, updateLocation, deleteLocation } from "../service/location.service";
import geoLocApiReq from "../api/geo.api";

const getLocationHandler = async (req: Request, res: Response)=>{
    const userQueryParsed = req.body.filtered;
    try {
        const locations = await getLocation(userQueryParsed);
        res.cookie('x-access-token', req.body.newTokens.accessToken, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + (30 * 60 * 1000)),
            httpOnly: true,
        });
        res.status(200).send(locations);
    }
    catch(err){
        res.status(500).send("database_error");
        console.log(err);
    }
},
createLocationHandler = async (locationData: createLocationSchemaType, res: Response)=>{
    try{
        let apiRes = await geoLocApiReq(locationData.body.data.ip);
        if(apiRes.success){
            if(Object.keys(apiRes.data.data).length > 2){
                const {ip, country_name, city} = apiRes.data.data;
                locationData.body.data = {ip: ip, country: country_name, city:city};
                try {
                    const location = await createLocation(locationData.body.data);
                    res.status(200).send(location);
                }
                catch(err){
                    res.status(500).send('Address already added');
                }
            }
            else{
                res.status(500).send('geo_api_error');
                return false;
            }
        }
    }
    catch(err){
        res.status(500).send('Api connection problem');
        return false;
    }

},
updateLocationHandler = async (req: Request, res: Response)=>{
    const userQueryParsed = req.body.filtered;
    try {
        const locations = await updateLocation(userQueryParsed);
        res.status(200).send('Updated');
    }
    catch(err){
        res.status(500).send('Server error');
        console.log(err);
    }
},
deleteLocationHandler = async (req: Request, res: Response)=>{
    const userQueryParsed = req.body.filtered;
    try {
        const locations = await deleteLocation(userQueryParsed);
        res.status(200).send("deleted");
    }
    catch(err){
        console.log(err);
    }
};

export { getLocationHandler, createLocationHandler, updateLocationHandler, deleteLocationHandler };