import { Request, Response, NextFunction } from "express";
import { z, ZodObject } from "zod";
import logger from "../utils/logger"

const validator = (schema: z.AnyZodObject)=> (req: Request, res: Response, next: NextFunction) =>{
    try{
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        });
        next();
    }
    catch(err: any){
        logger.error(err);
        return res.status(400).send(err.errors);
    }
}

export default validator;