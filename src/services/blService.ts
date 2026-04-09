import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/bl",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_BL_API_KEY}`,
    },
});

const getMatchupById = async (matchupId: string) => {
    try {
        const response = await api.get(`/matchup/${matchupId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching match:", error);
        throw error;
    }
};

export { getMatchupById };
