import axios from "axios";

const api = axios.create({
	baseURL: "https://xneo-fit-backend.onrender.com/v1", // Replace with your API's base URL
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
