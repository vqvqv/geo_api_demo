import { Express, Request, Response } from "express";
import { verifyJwtHandler } from "../controller/jwt.controller";
import { getLocationSchema, createLocationSchema, updateLocSchema } from "../schema/location.schema";
import validate from "../middleware/validate";
import { getLocationHandler, createLocationHandler, updateLocationHandler, deleteLocationHandler } from "../controller/location.controller"
import parseLocationQuery from "../middleware/parseLocation";


const routes = (app: Express)=>{
    /* location server routes */
    app.get('/location/get', validate(getLocationSchema), parseLocationQuery("get"), verifyJwtHandler, getLocationHandler);

    app.post('/location/add', validate(createLocationSchema), parseLocationQuery("add"), verifyJwtHandler, createLocationHandler);

    app.put('/location/update', validate(getLocationSchema), parseLocationQuery("update"), verifyJwtHandler, updateLocationHandler);

    app.delete('/location/delete', validate(getLocationSchema), parseLocationQuery("delete"), verifyJwtHandler, deleteLocationHandler);
}

export default routes;