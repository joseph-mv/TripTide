import { axiosInstance } from "./api";


  export const loginUser=async(email,password)=>{
    try {
        const response=  await axiosInstance.post('/auth/login',{email,password})
        if(response.data.status) return response.data
        throw new Error( response.data.loggedError)
    } catch (error) {
        throw new Error(error.message)
    }
  }