import { axiosInstance } from "./api"

export const getUserInformation=async()=>{
  try {
    const token=localStorage.getItem('token')
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
  const response=await axiosInstance.get(`/user/get-itinerary/${id}`)
  // console.log(response.data)
  return response.data

 } catch (error) {
  
 }
}