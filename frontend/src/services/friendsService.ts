import { axiosInstance } from "./api"

export const searchFriends = async (query) => {
    if(!query) return []
  try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get("friends/search_users", {
          params: { query },
          headers: {
              Authorization: `Bearer ${token}`, // Ensuring proper format
          },
      });
      return response.data; // Return the API response data

  } catch (error) {
      console.error("Error searching friends:", error);

      throw new Error(
          error.response?.data?.message || "Something went wrong. Please try again."
      );
  }
};
