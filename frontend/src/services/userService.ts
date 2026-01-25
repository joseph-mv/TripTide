import axios from "axios"
import { jwtCheck } from "../utils/authUtils"
import { axiosInstance } from "./api"
import { OngoingTrip } from "../types"
const NETWORK_ISSUE_MSG = "Network issue. Please try again later."

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}


export const contact = async (formData: ContactFormData) => {
  try {
    const response = await axiosInstance.post('user/contact', formData)
    return response.data.message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || NETWORK_ISSUE_MSG)
    }
    throw new Error(NETWORK_ISSUE_MSG)
  }
}

export const getUserInformation = async () => {
  try {
    const token = localStorage.getItem('token')
    await jwtCheck()
    const response = await axiosInstance.get('user/user-dashboard', {
      headers: {
        Authorization: token,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Network issue')
    }
    throw new Error('Network issue')
  }

}



export const updateProfilePic = async (imageData: string) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axiosInstance.put('user/updateProfilePic', { imageData }, {
      headers: {
        Authorization: token,
      },
    })
    return response.data
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
    return NETWORK_ISSUE_MSG
  }
}

export const getItinerary = async (id?: string) => {
  if (!id) return []

  try {
    await jwtCheck();
    const response = await axiosInstance.get(`/user/get-itinerary/${id}`)
    // console.log(response.data)
    return response.data

  } catch (error) {
    console.log(error)
  }
}

export const getOngoingTrip = async (id: string): Promise<OngoingTrip> => {
  try {
    await jwtCheck();
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`user/get-ongoing-trip/${id}`, {
      headers: { Authorization: token },
    });
    return response.data as OngoingTrip;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || NETWORK_ISSUE_MSG);
    }
    throw new Error(NETWORK_ISSUE_MSG);
  }
}