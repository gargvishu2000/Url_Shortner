import axiosInstance from '../utils/axiosInstance';

export const loginUser  = async(email,password) => {
    const {data}  = await axiosInstance.post("/api/auth/login", {email,password});
    return data;
}

export const register = async(name,email,password)=>{
    const {data} = await axiosInstance.post("/api/auth/register",{name,email,password})
    return data;
}

export const logout = async()=>{
    const {data} = await axiosInstance.post("/api/auth/logout");
    return data;
}
export const getCurrentUSer = async()=>{
    const {user,message}  = await axiosInstance.get("/api/auth/me");
    console.log(user, "data");
    return user;
}

export const getAllUserUrls = async()=>{
    const {data}  = await axiosInstance.get("/api/user/url");
    return data;
}
