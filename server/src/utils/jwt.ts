import jwt from "jsonwebtoken";
import cfg from "config";
import { userDocument } from "../model/user.model"

const tokenVerify = (token: string)=>{
        try{
            jwt.verify(token, cfg.get("private_key"));
            return true;
        }
        catch(err){
            return false
        }
},
rfshTokenVerify = (token: string)=>{
        try{
            return jwt.verify(token, cfg.get("private_rfsh_key"));
        }
        catch(err){
            return false
        }
},
accessTokenCreate = (username: userDocument["username"])=>{
    const token = jwt.sign(
        { 
            username: username
        },
        cfg.get("private_key"),
        {
            expiresIn: cfg.get("expiresIn")
        },
    );
    return token
},
rfshTokenCreate = (username: userDocument["username"])=>{
    const token = jwt.sign(
        { 
            username: username
        },
        cfg.get("private_rfsh_key")
    );
    return token
}

export {tokenVerify, accessTokenCreate, rfshTokenCreate, rfshTokenVerify};