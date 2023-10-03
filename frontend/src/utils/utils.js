export function formatDate(dateString) {
	const date = new Date(dateString);
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	if (isSameDate(date, today)) {
		return "today";
	} else if (isSameDate(date, yesterday)) {
		return "yesterday";
	} else {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return date.toLocaleDateString(undefined, options);
	}
}

export function formatDateToInputFormat(date) {
	const date1 = new Date(date);
	const year = date1.getFullYear();
	const month = (date1.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to month because months are zero-based
	const day = date1.getDate().toString().padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function isSameDate(date1, date2) {
	return (
		date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	);
}

export function filterAndCalculateCaloriesBurned(exercises, goal) {
	const startDate = formatDateToInputFormat(goal.createdAt);
	const endDate = formatDateToInputFormat(goal.targetDate);

	const filteredExercises = exercises.filter((exerciseEntry) => {
		const exerciseDate = formatDateToInputFormat(exerciseEntry.date);
		return exerciseDate >= startDate && exerciseDate <= endDate;
	});

	let totalCaloriesBurned = 0;

	filteredExercises.forEach((exerciseEntry) => {
		exerciseEntry.exercises.forEach((exercise) => {
			totalCaloriesBurned += exercise.caloriesBurned;
		});
	});

	return totalCaloriesBurned;
}

export function filterAndCalculateCaloriesConsumed(foodEntries, goal) {
	const startDate = formatDateToInputFormat(goal.createdAt);
	const endDate = formatDateToInputFormat(goal.targetDate);

	const filteredFoodEntries = foodEntries.filter((foodEntry) => {
		const foodDate = formatDateToInputFormat(foodEntry.date);
		return foodDate >= startDate && foodDate <= endDate;
	});

	let totalCaloriesConsumed = 0;

	filteredFoodEntries.forEach((foodEntry) => {
		foodEntry.foodItems.forEach((foodItem) => {
			totalCaloriesConsumed += foodItem.calories;
		});
	});

	return totalCaloriesConsumed;
}
