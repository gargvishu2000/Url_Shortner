import { FindUserById } from "../dao/user.dao.js";
import { verfiyToken } from "../utils/helper.js";

export const authMidlleware = async(req,res,next)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json({message: "Unauthorized"});
    try {
        const decode = verfiyToken(token);
        const user = await FindUserById(decode.id);
        console.log(user , "user");
        
        if(!user)  return res.status(401).json({message:"Unauthorized"});
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Unauthorized"});
    }
}