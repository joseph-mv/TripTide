import { api } from "./api"
import { NETWORK_ISSUE_MSG } from "../constants/api";

export const searchFriends = async (query: string) => {
    if (!query) return []
    try {
        const token = localStorage.getItem("token");

        const response = await api.get("friends/search_users", {
            params: { query },
            headers: {
                Authorization: `Bearer ${token}`, // Ensuring proper format
            },
        });
        return response; // Return the API response data

    } catch (error: any) {
        throw new Error(error ?? NETWORK_ISSUE_MSG);
    }
};
