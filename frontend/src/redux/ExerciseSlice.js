import { createSlice } from "@reduxjs/toolkit";
import { addExercise, deleteExercise, fetchExercises } from "../utils/Thunks";

const ExerciseSlice = createSlice({
	name: "exercise",
	initialState: {
		exercises: [],
		loading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchExercises.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchExercises.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.exercises = action.payload; // Update the exercises array with fetched data
			})
			.addCase(fetchExercises.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message; // Set the error message
			})
			.addCase(addExercise.pending, (state) => {
				// You can set loading flags or perform other actions when adding is pending
				state.loading = true;
				state.error = null;
			})
			.addCase(addExercise.fulfilled, (state) => {
				// No specific action is needed here since you're dispatching fetchExercises
				state.loading = false;
				state.error = null;
			})
			.addCase(addExercise.rejected, (state, action) => {
				// Handle errors specific to adding exercises
				state.loading = false;
				state.error = action.error.message; // Set the error message
			})
			.addCase(deleteExercise.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteExercise.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(deleteExercise.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default ExerciseSlice;
