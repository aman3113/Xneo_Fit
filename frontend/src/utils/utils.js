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

function isSameDate(date1, date2) {
	return (
		date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	);
}
