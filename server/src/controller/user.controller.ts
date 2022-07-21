import { Request, Response } from "express";
import { createUserInput, loginUserInput } from "../schema/user.schema";
import logger from "../utils/logger";
import { registerUser, validateUser } from "../service/user.service"
import { createJwtHandler, addRfshHandler } from "./jwt.controller";

const registerUserHandler = async (req: Request<any, any, createUserInput["body"]>, res: Response)=>{
    try{
        const userDone = await registerUser(req.body);
        res.status(200).send(`Registered user ${userDone}`);
    }
    catch(err){
        res.status(500).send(`User already exists`);
    }
},
loginUserHandler = async (req: Request<any, any, loginUserInput["body"]>, res:  Response)=>{
    try{
        const validatedUser = await validateUser(req.body);
        if(validatedUser.validated){
            const userToken = createJwtHandler(validatedUser.username);
            try{
                await addRfshHandler(userToken.rfshToken);
            }
            catch(err){
                logger.error('Rfsh token creation problem');
            }
            res.cookie('x-access-token', userToken.accessToken, {
                sameSite: 'strict',
                path: '/',
                expires: new Date(new Date().getTime() + (30 * 60 * 1000)),
                httpOnly: true,
            });
            res.cookie('x-rfsh-token', userToken.rfshToken, {
                sameSite: 'strict',
                path: '/',
                expires: new Date(new Date().getTime() + (30 * 60 * 1000)),
                httpOnly: true,
            });
            res.status(200).send(userToken);
        }
        else{
            res.status(401).send("Wrong credentials");
        }
    }
    catch(err){
        logger.error(err);
        res.status(403).send(err);
    }
},
authUserHandler = async(req: Request, res: Response)=>{
    res.status(200).send("Authenticated");
};


export { registerUserHandler, loginUserHandler, authUserHandler };