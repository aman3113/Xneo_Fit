import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ExerciseSlice from "./ExerciseSlice";
import FoodSlice from "./FoodSlice";
import GoalSlice from "./GoalSlice";
import UserSlice from "./UserSlice";

const Store = configureStore({
	reducer: {
		auth: AuthSlice.reducer,
		exercise: ExerciseSlice.reducer,
		food: FoodSlice.reducer,
		goal: GoalSlice.reducer,
		user: UserSlice.reducer,
	},
});

export default Store;
