import { Request, Response, NextFunction } from "express";
import { getLocationSchemaType, updateLocationSchemaType, updateLocSchema,  getLocSchema} from "../schema/location.schema";


const parseLocationQuery = (action: string) => ( req: Request, res: Response, next: NextFunction) => {
    let userQuery = (action == "get" ? req.query : req.body.data);
    let userQueryFiltered: any = {};
    if(Object.keys(userQuery).length > 0){
        userQueryFiltered.search = Object.entries(userQuery).filter((val)=>{
            if(val[1] != '' && val[0] != 'sip' && val[0] != 'scity' && val[0] != 'scountry' && val[0] != 'screatedAt'){
                return val;
            }
        });
        userQueryFiltered.sort = Object.entries(userQuery).filter((val)=>{
            if(val[1] != '' && (val[0] == 'sip' || val[0] == 'scity' || val[0] == 'scountry' || val[0] == 'screatedAt')){
                val[0] = val[0].slice(1, val[0].length);
                return val;
            }
        });
        userQueryFiltered.search = Object.fromEntries(userQueryFiltered.search);
        userQueryFiltered.sort = Object.fromEntries(userQueryFiltered.sort);
    }
    req.body.filtered = userQueryFiltered;

    if(action == "update"){
        let updateObj = {...req.body.data}
        delete updateObj.id;
        req.body.filtered = {search: {id: req.body.id}, update: updateObj};
    }
    if(action == "delete"){
        req.body.filtered = {"_id": req.body.data.id};
    }
    next();
}

export default parseLocationQuery;