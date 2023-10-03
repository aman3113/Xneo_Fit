import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../utils/Thunks";
import DayExercises from "../components/DayExercises";
import { formatDate } from "../utils/utils";
import { AiFillFire } from "react-icons/ai";
import { Spinner } from "@chakra-ui/react";

const ExercisePage = () => {
	const dispatch = useDispatch();
	const { exercises, loading, error } = useSelector((store) => store.exercise);
	const [formData, setFormData] = useState({
		exerciseName: "",
		duration: "",
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
			duration: "",
			metabolicEquivalent: "",
		});
	}

	return (
		<div className=" h-full p-4">
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
			{error && <p className="text-2xl text-red-600 text-center">{error}</p>}
			{loading ? (
				<div className="flex justify-center">
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="blue.500"
						size="xl"
					/>
				</div>
			) : (
				<div className="flex flex-wrap gap-5 justify-center  py-5">
					{exercises.length === 0 && (
						<p className="text-2xl text-center pt-8 font-bold text-red-300">
							Add your First exercise now.
						</p>
					)}
					{exercises?.map((exercise) => {
						const totalCalories = exercise.exercises.reduce(
							(acc, curr) => (acc += curr.caloriesBurned),
							0
						);

						return (
							<div
								key={exercise.date}
								className="p-2 border border-gray-400 shadow-md shadow-gray-300 rounded-lg min-w-[250px]"
							>
								<div className="flex justify-between items-center">
									<p className="font-bold capitalize text-lg py-2">
										{formatDate(exercise.date.toString())}
									</p>
									<strong className="flex gap-2 items-center">
										{totalCalories.toFixed(2)}cal{" "}
										<AiFillFire className="text-yellow-400" />
									</strong>
								</div>
								<DayExercises exercisesArr={exercise.exercises} />
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default ExercisePage;
