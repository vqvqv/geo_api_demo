import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

var dbConn: typeof mongoose;

const connect = async ()=>{
    const dbUri = config.get<string>('dbUri');
    try{
        const dbConn = await mongoose.connect(dbUri,{
            serverSelectionTimeoutMS: 1000
          });
        logger.info('Server up and ready');
        return dbConn;
    }
    catch(err){
        logger.error("DB not connected");
    }
}

const db = mongoose.connection;

db.on('connecting', () => {
  logger.info('Connecting to MongoDB...');
});

db.on('error', (error) => {
    logger.error(`MongoDB connection error: ${error}`);
    mongoose.disconnect();
});

db.on('connected', () => {
    logger.info('Connected to MongoDB!');
});

db.once('open', () => {
    logger.info('MongoDB connection opened!');
});

db.on('reconnected', () => {
    logger.info('MongoDB reconnected!');
});

db.on('disconnected', () => {
    logger.error(`MongoDB disconnected! Reconnecting in ${10000 / 1000}s...`);
  setTimeout(() => connect(), 10000);
});

export {connect}