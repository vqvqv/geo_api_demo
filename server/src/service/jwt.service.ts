import { userDocument } from "../model/user.model";
import { tokenModel, tokenType } from "../model/token.model";
import { accessTokenCreate, rfshTokenCreate, tokenVerify, rfshTokenVerify } from "../utils/jwt";

const createJwt = (username: userDocument["username"])=>{
    const tokens = {accessToken: accessTokenCreate(username), rfshToken: rfshTokenCreate(username)};
    return tokens;
},
verifyToken = async (accessToken: string)=>{
    return tokenVerify(accessToken);
},
verifyRfshToken = async (rfshToken: string)=>{
    return rfshTokenVerify(rfshToken);
},
addRfsh = async (token: string)=>{
    try{
        const rfshToken = await tokenModel.create({rfshToken: token});
        return rfshToken;
    }
    catch(err){
        throw err;
    }
},
rfshToken = async (token: string)=>{
    try{
        const rfshToken = await tokenModel.findOne({ rfshToken: token });
        return rfshToken as tokenType;
    }
    catch(err){
        throw err;
    }
}

export { createJwt, verifyToken, addRfsh, rfshToken, verifyRfshToken };