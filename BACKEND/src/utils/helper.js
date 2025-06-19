import { nanoid } from "nanoid"
import jsonwebtoken from "jsonwebtoken";
import { cookieOptions } from "../config/config.js";
import { generateDistributedId } from "./idGenerator.js";

export const generateId = async(length)=>{
    // using redis id generation.
    return await generateDistributedId(length);
}

export const signToken = (payload)=>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
}

export const verfiyToken =(token)=>{
    return jsonwebtoken.verify(token, process.env.JWT_SECRET);
}
