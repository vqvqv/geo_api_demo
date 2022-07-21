import express from "express";
import cfg from "config"
import {connect} from "./utils/connect"
import logger from "./utils/logger"
import "./routes";
import { RouteSingleton } from "./utils/routeSingleton";
import cookieParser from  "cookie-parser";
import cors from 'cors';
import mongoose from "mongoose"

const app = express();
const port = cfg.get('port');
let router = RouteSingleton.getInstance();

app.use(cookieParser());
app.use(cors({ origin: cfg.get('frontend_url'), credentials: true }));




app.use(express.json());

app.listen(port, async ()=>{
    logger.info(`Server listening on ${port}.`);
    try{
        const DB = await connect();
        router.initRoutes(app);  
    }
    catch(err){
        logger.error('DB not connected');
    }
});



