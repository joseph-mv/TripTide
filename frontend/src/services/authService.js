import { axiosInstance } from "./api";

const NETWORK_ISSUE_MSG="Network issue. Please try again later."


  export const loginUser=async(email,password)=>{
    try {
        const response=  await axiosInstance.post('/auth/login',{email,password})
        if(response.data.status) return response.data
    } catch (error) {
        throw new Error(error.response?.data?.error ?? NETWORK_ISSUE_MSG)
    }
  }

  export const signupUser=async(name,email,password)=>{
    try {
      const response=  await axiosInstance.post('/auth/sign-up',{name,email,password})
      if(response.data) return response.data.msg
  } catch (error) {
      throw new Error(error.response?.data?.error ?? NETWORK_ISSUE_MSG)
  }
  }

  export const forgotPassword=async(email)=>{
    try {
      const response=  await axiosInstance.post('/auth/forgot-password',{email})
      if(response.data) return response.data.msg
  } catch (error) {
      throw new Error(error.response?.data?.error ?? NETWORK_ISSUE_MSG)
  }
  }

  export const resetPassword=async(email,otp,newPassword)=>{
    try {
      const response=  await axiosInstance.post('/auth/reset-password',{
        email,
        otp,
        newPassword,
      })
      if(response.data) return response.data.msg
  } catch (error) {
      throw new Error(error.response?.data?.error ?? NETWORK_ISSUE_MSG)
  }
  }

  export const verifyEmail=async(token)=>{
    try {
      const response=await axiosInstance.get(`/auth/verify-email?token=${token}`)
      return {msg:response.data.msg,success:true}
    } catch (error) {
      console.log(error)
      throw new Error(error.response?.data?.error ??  NETWORK_ISSUE_MSG)
    }
  }
