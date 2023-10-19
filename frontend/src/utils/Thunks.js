import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Axios";
import { clearAuthToken } from "../redux/AuthSlice";

// Exercise actions

export const fetchExercises = createAsyncThunk(
	"exercises/fetch",
	async (_, { getState }) => {
		const authToken = getState().auth.authToken;
		const response = await api.get("/exercises", {
			headers: {
				Authorization: authToken,
			},
		});
		return response.data;
	}
);

export const addExercise = createAsyncThunk(
	"exercises/add",
	async (exerciseData, { getState, dispatch }) => {
		const authToken = getState().auth.authToken;
		try {
			const response = await api.post(
				"/exercises",
				JSON.stringify(exerciseData),
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			dispatch(fetchExercises());

			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const deleteExercise = createAsyncThunk(
	"exercises/delete",
	async (exerciseId, { getState, dispatch }) => {
		const authToken = getState().auth.authToken;

		try {
			// Make a DELETE request to delete the exercise
			await api.delete(`/exercises/${exerciseId}`, {
				headers: {
					Authorization: authToken,
				},
			});

			// Dispatch fetchExercises to update the exercise array in the store
			dispatch(fetchExercises());

			return exerciseId;
		} catch (error) {
			throw error;
		}
	}
);

// Food actions

export const fetchFood = createAsyncThunk(
	"food/fetch",
	async (_, { getState }) => {
		const authToken = getState().auth.authToken;
		const response = await api.get("/food", {
			headers: {
				Authorization: authToken,
			},
		});
		return response.data;
	}
);

export const addFood = createAsyncThunk(
	"food/add",
	async (foodData, { getState, dispatch }) => {
		const authToken = getState().auth.authToken;

		try {
			const response = await api.post("/food", JSON.stringify(foodData), {
				headers: {
					Authorization: authToken,
				},
			});
			console.log(response.data);
			dispatch(fetchFood());

			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const deleteFood = createAsyncThunk(
	"food/delete",
	async (foodId, { getState, dispatch }) => {
		const authToken = getState().auth.authToken;

		try {
			// Make a DELETE request to delete the food item
			await api.delete(`/food/${foodId}`, {
				headers: {
					Authorization: authToken,
				},
			});

			// Dispatch fetchFood to update the food array in the store
			dispatch(fetchFood());

			return foodId;
		} catch (error) {
			throw error;
		}
	}
);

// Goal actions

export const fetchGoals = createAsyncThunk(
	"goals/fetch",
	async (_, { getState }) => {
		const authToken = getState().auth.authToken;
		const response = await api.get("/goal", {
			headers: {
				Authorization: authToken,
			},
		});
		return response.data;
	}
);

export const addGoal = createAsyncThunk(
	"goals/add",
	async (goalData, { getState, dispatch }) => {
		const authToken = getState().auth.authToken;

		try {
			const response = await api.post("/goal", JSON.stringify(goalData), {
				headers: {
					Authorization: authToken,
				},
			});
			dispatch(fetchGoals());

			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const deleteGoal = createAsyncThunk(
	"goals/delete",
	async (goalId, { getState, dispatch }) => {
		const authToken = getState().auth.authToken;

		try {
			await api.delete(`/goal/${goalId}`, {
				headers: {
					Authorization: authToken,
				},
			});

			// Dispatch fetchGoals to update the goals array in the store
			dispatch(fetchGoals());

			return goalId;
		} catch (error) {
			throw error;
		}
	}
);

export const updateGoal = createAsyncThunk(
	"goals/update",
	async ({ goalId, updatedGoalData }, { getState, dispatch }) => {
		const authToken = getState().auth.authToken;
		try {
			// Make a PUT request to update the goal
			const response = await api.post(
				`/goal/${goalId}`,
				JSON.stringify(updatedGoalData),
				{
					headers: {
						Authorization: authToken,
					},
				}
			);

			// Dispatch fetchGoals to update the goals array in the store after successful update
			dispatch(fetchGoals());
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

// User actions

// Action to fetch user information
export const fetchUser = createAsyncThunk(
	"user/fetch",
	async (_, { getState }) => {
		const authToken = getState().auth.authToken;
		const response = await api.get("/user", {
			headers: {
				Authorization: authToken,
			},
		});
		return response.data;
	}
);

// Action to update user information
export const updateUser = createAsyncThunk(
	"user/update",
	async (userData, { getState, dispatch }) => {
		const authToken = getState().auth.authToken;

		try {
			const response = await api.post("/user", JSON.stringify(userData), {
				headers: {
					Authorization: authToken,
				},
			});

			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

// Action to delete user
export const deleteUser = createAsyncThunk(
	"user/delete",
	async (_, { getState, dispatch }) => {
		const authToken = getState().auth.authToken;

		try {
			// Make a DELETE request to delete the user
			await api.delete("/user", {
				headers: {
					Authorization: authToken,
				},
			});

			// Dispatch a logout action to clear user authentication data
			dispatch(clearAuthToken());

			return true; // Indicate successful deletion
		} catch (error) {
			throw error;
		}
	}
);

//Signup user
export const signupUser = createAsyncThunk("user/signup", async (userData) => {
	try {
		const response = await api.post("/auth/signup", JSON.stringify(userData), {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
});

// Action to log in a user
export const loginUser = createAsyncThunk("user/login", async (userData) => {
	try {
		const response = await api.post("/auth/login", JSON.stringify(userData), {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
});
