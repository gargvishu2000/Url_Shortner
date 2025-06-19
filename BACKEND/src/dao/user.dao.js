import User from "../models/user.model.js";
import urlSchema from "../models/shortUrl.model.js";

export const findUserByEmail =async (email)=>{ 
    const user = await User.findOne({email})
    return user;
}

export const findUserByEmailAndPassword =async (email)=>{ 
    const user = await User.findOne({email}).select("+password");
    return user;
}

export const FindUserById = async (id)=>{
    return User.findById(id);
}

export const createUser =async (name,email,password)=>{
    const newUser = await new User({name,email,password});
    await newUser.save();
    return newUser;
}

export const getAllUserUrlsDao = async (userId)=>{
    return await urlSchema.find({user: userId});
}