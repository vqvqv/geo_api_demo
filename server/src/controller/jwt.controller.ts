import { userDocument } from "../model/user.model";
import { tokenType } from "../model/token.model";

import { createJwt, verifyToken, addRfsh, rfshToken, verifyRfshToken } from "../service/jwt.service";
import { getLocationSchemaType, createLocationSchemaType, updateLocationSchemaType, updateLocSchema,  getLocSchema, locScheamaHeader } from "../schema/location.schema";
import logger from "../utils/logger";
import { Response, NextFunction } from "express";
import mongoose from "mongoose";


const createJwtHandler = (username: userDocument["username"])=>{
    return createJwt(username);
}

const verifyJwtHandler = async (req: locScheamaHeader, res: Response, next: NextFunction)=>{
    if(mongoose.STATES[mongoose.connection.readyState] == 'disconnected'){
        res.status(500).send("DB DOWN!");
        return false;
    }
    let token: locScheamaHeader["cookies"];
    if(typeof req.cookies["x-access-token"] != 'undefined'){
        token = req.cookies;
    }
    else{
        console.log("not logged in or expired");
        res.status(403).send("No token defined");
        return false;
    }
    const valid = await verifyToken(token["x-access-token"]);
    if(valid){
        try{
            const newTokens = await rfshTokenHandler(token["x-rfsh-token"]);
            req.body.newTokens = newTokens;
        }
        catch(err){
            res.sendStatus(500);
            throw err;
        }
        next();
    }
    else{
        res.status(403).send("token INVALID!");
    }

};

const addRfshHandler = async (token: string)=>{
    try{
        return await addRfsh(token);
    }
    catch(err){
        throw err;
    }
}

const rfshTokenHandler = async (token: string)=>{
    try{
        const DBtoken: tokenType = await rfshToken(token);
        if(DBtoken.rfshToken == token){
            const tokenData: any = await verifyRfshToken(token);
            return createJwt(tokenData.username);
        }
        else{
            return false;
        }
    }
    catch(err){
        throw err;
    }
}

export  { createJwtHandler, verifyJwtHandler, addRfshHandler, rfshTokenHandler };