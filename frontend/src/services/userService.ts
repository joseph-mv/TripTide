import { jwtCheck } from "../utils/authUtils"
import { api } from "./api"
import { OngoingTrip } from "../types"
import { NETWORK_ISSUE_MSG } from "../constants/api";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}


export const contact = async (formData: ContactFormData) => {
  try {
    const response = await api.post('user/contact', formData)
    return response.message
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const getUserInformation = async () => {
  try {
    const token = localStorage.getItem('token')
    await jwtCheck()
    const response = await api.get('user/user-dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }

}



export const updateProfilePic = async (imageData: string) => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.put('user/updateProfilePic', { imageData }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const getItinerary = async (id?: string) => {
  if (!id) return []

  try {
    await jwtCheck();
    const response = await api.get(`/user/get-itinerary/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const getOngoingTrip = async (id: string): Promise<OngoingTrip> => {
  try {
    await jwtCheck();
    const token = localStorage.getItem("token");
    const response = await api.get(`user/get-ongoing-trip/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}