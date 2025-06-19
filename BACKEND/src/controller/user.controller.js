
import { getAllUserUrlsDao } from "../dao/user.dao.js";

export const getAllUserUrl =async (req,res)=>{
    const {_id} = req.user;
    const urls = await getAllUserUrlsDao(_id);
    res.status(200).json({urls, message: "success"});
}