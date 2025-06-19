import { FindUserById } from "../dao/user.dao.js";
import { verfiyToken } from "./helper.js";

export const attachUser = async(req,res,next)=>{
    const token = req.cookies.accessToken;
    if(!token){
        return next();
    }
    try {
        const decode = verfiyToken(token);
        const user = await FindUserById(decode.id);
        if(!user) return next();
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        
        next()
    }
}