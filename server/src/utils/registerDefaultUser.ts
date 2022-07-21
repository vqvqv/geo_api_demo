import mongoose from "mongoose";
import logger from "./logger";
import { registerUser } from "../service/user.service";


var dbConn: typeof mongoose;

const connect = async ()=>{
    const dbUri = process.argv[process.argv.length-1];
    console.log(dbUri);
    try{
        const dbConn = await mongoose.connect(dbUri,{
            serverSelectionTimeoutMS: 1000
          });
        logger.info('Connected to DB');
        try{
            await registerUser({username: "test", password:"testtest"});
            console.log("User created");
            process.exit(1);
        }
        catch(err){
            console.log(err);
            process.exit(1);
        }
    }
    catch(err){
        console.log(err);
        console.log('DB down retrying...');
        setTimeout(async ()=>{
            await connect();
        }, 5000);
    }
}

connect();