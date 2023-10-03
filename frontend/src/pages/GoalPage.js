import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGoal } from "../utils/Thunks";
import SingleGoal from "../components/SingleGoal";

const GoalPage = () => {
	const { goals, loading, error } = useSelector((store) => store.goal);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		goalName: "",
		goalDescription: "",
		targetCaloriesValue: "",
		status: "In Progress",
		targetDate: "",
	});

	function handleInputChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		dispatch(addGoal(formData));
		setFormData({
			goalName: "",
			goalDescription: "",
			targetCaloriesValue: "",
			status: "In Progress",
			targetDate: new Date(),
		});
	}

	return (
		<div className=" h-full p-4">
			<h1 className="text-2xl md:text-3xl text-center font-bold pb-3">
				My Goals Track
			</h1>
			<div className="p-3 py-5 bg-pink-100 rounded-md my-3">
				<p className="text-lg md:text-xl text-center font-bold py-2">
					Add new goal
				</p>
				<form
					onSubmit={handleFormSubmit}
					className="flex gap-2 justify-center flex-wrap"
				>
					<input
						type="text"
						name="goalName"
						value={formData.goalName}
						onChange={handleInputChange}
						placeholder="Enter goal name"
						required
					/>
					<input
						type="text"
						name="goalDescription"
						value={formData.goalDescription}
						onChange={handleInputChange}
						placeholder="Enter goal description"
						required
					/>
					<input
						className="cursor-pointer"
						type="date"
						name="targetDate"
						value={formData.targetDate}
						onChange={handleInputChange}
						required
					/>

					<input
						type="number"
						name="targetCaloriesValue"
						value={formData.targetCaloriesValue}
						onChange={handleInputChange}
						placeholder="Enter target calories"
						required
					/>

					<select
						value={formData.status}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, status: e.target.value }))
						}
						required
					>
						<option value="In Progress">In Progress</option>
						<option value="Achieved">Achieved</option>
						<option value="Abandoned">Abandoned</option>
					</select>

					<button className="text-white bg-pink-500 px-4 py-1 rounded-md block">
						Add Goal
					</button>
				</form>
			</div>
			<div className="flex flex-wrap gap-3 justify-center p-2 py-5">
				{goals.map((goal) => (
					<SingleGoal goal={goal} key={goal._id} />
				))}
			</div>
		</div>
	);
};

export default GoalPage;