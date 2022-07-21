import mongoose from "mongoose";
import { TypeOf } from "zod";

export interface tokenType {
    rfshToken: string
}

const tokenSchema = new mongoose.Schema<tokenType>({
    rfshToken: { type: String, required: true, unique: true, dropDups: true },
});

export const tokenModel = mongoose.model("token", tokenSchema);
