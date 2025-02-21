import { axiosInstance } from "./api"

// export const getUserInformation=async(userId)=>{
//   const token=localStorage.getItem('token')

// }


export const updateProfilePic=async(imageData)=>{ 
 try {
  const token=localStorage.getItem('token')
  const response=await axiosInstance.post('user/updateProfilePic',{imageData},{
    headers: {
      Authorization: token,
    },
  })
  return response.data
 } catch (error) {
  return error.message
 }
}