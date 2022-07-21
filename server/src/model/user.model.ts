import mongoose from "mongoose";
import { cHash, cVerify } from "../utils/crypto";
import logger from "../utils/logger";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true }
});


userSchema.pre("save", async function(next){
    const nonHashPassword = this.password;
    try{
        const hashPassword = await cHash(nonHashPassword);
        this.password = hashPassword;
        next();
    }
    catch(err){
        logger.error(err);
        return next();
    }

});

userSchema.methods.validateUser = async function(passwordToCompare: string): Promise<boolean>{
    const user = this as userDocument;
    try{
        return cVerify(passwordToCompare, user.password);
    }
    catch(err){
        throw false;
    }
}

export const userModel = mongoose.model("user", userSchema);

export interface userInput {
    username: string,
    password: string,
  }

export interface userDocument extends userInput, mongoose.Document{
    validateUser(passwordToCompare: string): Promise<Boolean>;
}