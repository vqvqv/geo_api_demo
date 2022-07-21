
import mongoose from "mongoose";
import { userModel, userInput, userDocument } from "../model/user.model"

const registerUser = async (userData: userInput)=>{
    try{
        const user = await userModel.create(userData);
        return user;
    }
    catch(err){
        console.log(err);
        throw err;
    }

}

const getUserByName = async (username: userInput["username"] )=>{
    try {
        const user = await userModel.findOne({ username }) as userDocument;
        return user;
    }
    catch(err){
        throw err;
    }
}

const validateUser = async (userData: userInput)=>{
    try{
        const user = await getUserByName(userData.username);
        if(!user){
            throw "User not found";
        }
        const validated = await user.validateUser(userData.password);
        return { username: user.username, validated: validated };
    }
    catch(err){
        throw err;
    }
}

export { registerUser, getUserByName, validateUser }