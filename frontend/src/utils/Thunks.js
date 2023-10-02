import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Axios";

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
