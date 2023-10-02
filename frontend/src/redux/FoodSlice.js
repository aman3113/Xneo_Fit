import { createSlice } from "@reduxjs/toolkit";
import { addFood, deleteFood, fetchFood } from "../utils/Thunks";

const FoodSlice = createSlice({
	name: "food",
	initialState: {
		foods: [],
		loading: false,
		error: null,
	},
	reducers: {
		// Define other synchronous reducers if needed
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFood.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchFood.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.foods = action.payload;
			})
			.addCase(fetchFood.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addFood.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addFood.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(addFood.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(deleteFood.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteFood.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(deleteFood.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default FoodSlice;
