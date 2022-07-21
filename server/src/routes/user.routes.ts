import { Express, Request, Response } from "express";
import validate from "../middleware/validate"
import { registerUserSchema, loginUserSchema } from "../schema/user.schema"
import { registerUserHandler, loginUserHandler, authUserHandler } from "../controller/user.controller";
import { verifyJwtHandler } from "../controller/jwt.controller";

const routes = (app: Express)=>{
    /* login server routes */
    app.post('/user/register', validate(registerUserSchema), registerUserHandler);
    app.post('/user/login', validate(loginUserSchema), loginUserHandler);
    app.get('/user/is_auth', verifyJwtHandler, authUserHandler);
}

export default routes;