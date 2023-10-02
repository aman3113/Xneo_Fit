import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../utils/Thunks";
import DayExercises from "../components/DayExercises";
import { formatDate } from "../utils/utils";

const ExercisePage = () => {
	const dispatch = useDispatch();
	const { exercises, loading, error } = useSelector((store) => store.exercise);
	const [formData, setFormData] = useState({
		exerciseName: "",
		duration: null,
		metabolicEquivalent: "",
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
		dispatch(addExercise(formData));
		setFormData({
			exerciseName: "",
			duration: null,
			metabolicEquivalent: "",
		});
	}

	return (
		<div className=" h-full">
			<h1 className="text-2xl md:text-3xl text-center font-bold pb-3">
				My Exercises Track
			</h1>
			<div className="p-3 py-5 bg-pink-100 rounded-md my-3">
				<p className="text-lg md:text-xl text-center font-bold py-2">
					Add new Exercise for today
				</p>
				<form
					onSubmit={handleFormSubmit}
					className="flex gap-2 justify-center flex-wrap"
				>
					<input
						type="text"
						name="exerciseName"
						value={formData.exerciseName}
						onChange={handleInputChange}
						placeholder="Enter exercise name"
						required
					/>
					<input
						type="number"
						name="duration"
						value={formData.duration}
						onChange={handleInputChange}
						placeholder="Enter duration of exercise"
						required
					/>
					<input
						type="text"
						name="metabolicEquivalent"
						value={formData.metabolicEquivalent}
						onChange={handleInputChange}
						placeholder="Enter metabolic equivalent of exercise"
						required
					/>
					<button className="text-white bg-pink-500 px-4 py-1 rounded-md block">
						Add Exercise
					</button>
				</form>
			</div>
			<div className="flex flex-wrap gap-3 justify-center">
				{exercises.map((exercise) => (
					<div
						key={exercise.date}
						className="p-2 shadow-md shadow-gray-300 rounded-lg min-w-[250px]"
					>
						<p className="font-bold capitalize text-lg py-2">
							{formatDate(exercise.date.toString())}
						</p>
						<DayExercises exercisesArr={exercise.exercises} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ExercisePage;
