import { jwtCheck } from "../utils/authUtils"
import { axiosInstance } from "./api"
const NETWORK_ISSUE_MSG="Network issue. Please try again later."


export const contact=async(formData)=>{
  try {
    const response=await axiosInstance.post('user/contact',formData)
    return response.data.message
  } catch (error) {
    throw new Error (error.response?.data?.error || NETWORK_ISSUE_MSG)
  }
}

export const getUserInformation=async()=>{
  try {
    const token=localStorage.getItem('token')
    await jwtCheck(token)
    const response=await axiosInstance.get('user/user-dashboard',{
      headers: {
        Authorization: token,
      },
    })
    return response.data
   } catch (error) {
    throw new Error (error.response?.data?.error || 'Network issue')
   }

}



export const updateProfilePic=async(imageData)=>{ 
 try {
  const token=localStorage.getItem('token')
  const response=await axiosInstance.put('user/updateProfilePic',{imageData},{
    headers: {
      Authorization: token,
    },
  })
  return response.data
 } catch (error) {
  return error.message
 }
}

export const getItinerary=async(id)=>{
  
 try {
  await jwtCheck();
  const response=await axiosInstance.get(`/user/get-itinerary/${id}`)
  // console.log(response.data)
  return response.data

 } catch (error) {
  
 }
}