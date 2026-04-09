import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: "../.env" });

const api = axios.create({
    baseURL: "https://app.bedriftsligaen.no/api/paradise/v2",
    headers: {
        "Content-Type": "application/json",
        // eslint-disable-next-line no-undef
        Authorization: `Bearer ${process.env.VITE_BL_API_KEY}`,
    },
});

const getMatchupById = async (matchupId) => {
    try {
        const response = await api.get(`/matchup/${matchupId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching match:", error);
        throw error;
    }
};

export { getMatchupById };
