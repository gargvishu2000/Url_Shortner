
// axios ka instance bnaye
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5002",
    timeout: 10000,
    withCredentials: true, 
})

export default axiosInstance