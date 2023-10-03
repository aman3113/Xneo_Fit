import React from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import {
	filterAndCalculateCaloriesBurned,
	filterAndCalculateCaloriesConsumed,
} from "../utils/utils";
import { AiFillFire } from "react-icons/ai";

const DashboardPage = () => {
	const { goals, error, loading } = useSelector((store) => store.goal);
	const { foods } = useSelector((store) => store.food);
	const { exercises } = useSelector((store) => store.exercise);

	return (
		<div className="h-full p-4">
			<h1 className="text-2xl md:text-3xl text-center font-bold pb-5">
				My Dashboard
			</h1>
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
				<div className="flex flex-col gap-4 pb-5">
					{goals?.map((goal) => {
						const targetCalories = goal.targetCaloriesValue;
						const totalCaloriesBurned = filterAndCalculateCaloriesBurned(
							exercises,
							goal
						);
						const totalCaloriesConsumed = filterAndCalculateCaloriesConsumed(
							foods,
							goal
						);
						const netCalories = totalCaloriesConsumed - totalCaloriesBurned;
						const remainingCaloriesToGoal = targetCalories - netCalories;
						const progress = netCalories / targetCalories;

						return (
							<div
								key={goal._id}
								className={`flex flex-col md:flex-row gap-6 items-center shadow-md shadow-gray-300 rounded-md p-4 ${
									goal.status === "In Progress" && "bg-blue-200"
								} ${goal.status === "Achieved" && "bg-green-200"} ${
									goal.status === "Abandoned" && "bg-red-200"
								}`}
							>
								<p className=" text-lg md:text-2xl font-bold">
									{goal.goalName}
								</p>
								<div className="flex gap-5 flex-wrap justify-evenly w-full items-center">
									<div>
										<div className="flex flex-col items-center gap-2 pb-3">
											<AiFillFire size={40} className="text-blue-600" />
											<span>
												{" "}
												<strong>Consumed:</strong>{" "}
												{totalCaloriesConsumed.toFixed(2)} cal
											</span>
										</div>
										<div className="flex flex-col items-center gap-2">
											<AiFillFire size={40} className="text-yellow-400" />
											<span>
												{" "}
												<strong>Burned:</strong>{" "}
												{totalCaloriesBurned.toFixed(2)} cal
											</span>
										</div>
									</div>
									<CircularProgress
										value={progress > 0 && progress.toFixed(2) * 100}
										size="180px"
										color="green.400"
									>
										<CircularProgressLabel style={{ fontSize: "20px" }}>
											{`${netCalories} /${targetCalories}`}
										</CircularProgressLabel>
									</CircularProgress>
									<div>
										<p className="text-xl font-bold text-center py-3">
											{goal.status}
										</p>
										{remainingCaloriesToGoal > 0 && (
											<p>
												You are <strong>{remainingCaloriesToGoal}</strong> cal
												away from your goal.
											</p>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default DashboardPage;
