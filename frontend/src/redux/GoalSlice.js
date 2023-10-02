import { createSlice } from "@reduxjs/toolkit";
import { addGoal, deleteGoal, fetchGoals } from "../utils/Thunks";

const GoalSlice = createSlice({
	name: "goals",
	initialState: {
		goals: [],
		loading: false,
		error: null,
	},
	reducers: {
		// Define other synchronous reducers if needed
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGoals.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGoals.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.goals = action.payload;
			})
			.addCase(fetchGoals.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addGoal.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addGoal.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(addGoal.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(deleteGoal.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteGoal.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(deleteGoal.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default GoalSlice;
