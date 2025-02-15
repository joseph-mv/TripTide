import { axiosInstance } from "./api"

export const updateProfilePic=async(userId,image)=>{
   console.log('uploading')
    axiosInstance.post({userId,image})
}