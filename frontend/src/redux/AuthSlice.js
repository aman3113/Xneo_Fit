const { createSlice } = require("@reduxjs/toolkit");

const authToken = localStorage.getItem("authToken");

const AuthSlice = createSlice({
	name: "authentication",
	initialState: {
		isLoggedIn: authToken && true,
		authToken: authToken,
	},
	reducers: {
		setAuthToken: (state, action) => {
			state.isLoggedIn = true;
			state.authToken = action.payload;
			// Store the authToken in localStorage
			localStorage.setItem("authToken", action.payload);
		},
		clearAuthToken: (state) => {
			state.isLoggedIn = false;
			state.authToken = null;
			// Remove the authToken from localStorage
			localStorage.removeItem("authToken");
		},
	},
});

export const { setAuthToken, clearAuthToken } = AuthSlice.actions;
export default AuthSlice;
