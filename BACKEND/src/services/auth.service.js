import { createUser, findUserByEmail, findUserByEmailAndPassword } from '../dao/user.dao.js';
import { ConflictError } from '../utils/errorHandler.js';
import { signToken } from '../utils/helper.js';

export const registerUser = async(name,email,password)=>{
    const user = await findUserByEmail(email); // if passed ({email}) -> {email: email}: object
    if(user) throw new ConflictError("User already exists");

    const newUser = await createUser(name,email,password);
    const token =  signToken({id: newUser._id});
    return {token,newUser};
}

export const loginUser = async(email,password)=>{
    const user = await findUserByEmailAndPassword(email);
    const isPasswordValid = await user.comparePassword(password);
    if(!user || !isPasswordValid) throw new Error("Invalid Credentials");
    
    const token = signToken({id: user._id});
    return {token ,user}
}