import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { AiFillFire } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteExercise } from "../utils/Thunks";

const DayExercises = ({ exercisesArr }) => {
	const dispatch = useDispatch();
	return (
		<div>
			{exercisesArr.map((exercise) => (
				<div
					key={exercise.exerciseId}
					className="flex border-y border-gray-400 justify-between items-center p-2"
				>
					<div>
						<p>{exercise.exerciseName}</p>
						<div className="flex gap-5">
							<span className="flex gap-1 items-center">
								{exercise.duration}m <BiTime className="text-blue-500" />
							</span>
							<span className="flex gap-1 items-center">
								{exercise.caloriesBurned.toFixed(2)}cal{" "}
								<AiFillFire className="text-yellow-400" />
							</span>
						</div>
					</div>
					<div>
						<AiOutlineDelete
							size={25}
							className="cursor-pointer text-gray-500"
							onClick={() => dispatch(deleteExercise(exercise.exerciseId))}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default DayExercises;
