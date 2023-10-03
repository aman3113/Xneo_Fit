import React, { useState } from "react";
import { formatDate, formatDateToInputFormat } from "../utils/utils";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteGoal, updateGoal } from "../utils/Thunks";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";

const SingleGoal = ({ goal }) => {
	const [openGoalModal, setOpenGoalModal] = useState(false);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		goalName: goal.goalName,
		goalDescription: goal.goalDescription,
		targetCaloriesValue: goal.targetCaloriesValue,
		status: goal.status,
		targetDate: formatDateToInputFormat(goal.targetDate),
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
		dispatch(updateGoal({ goalId: goal._id, updatedGoalData: formData }));
		setOpenGoalModal(false);
	}

	return (
		<div
			className={`p-4 border border-gray-400 shadow-md shadow-gray-300 rounded-lg min-w-[250px] max-w-[350px] ${
				goal.status === "In Progress" && "bg-blue-200"
			} ${goal.status === "Achieved" && "bg-green-200"} ${
				goal.status === "Abandoned" && "bg-red-200"
			}`}
		>
			<div className="flex justify-between items-center">
				<p className="font-bold capitalize text-lg py-2">
					{" "}
					Created: {formatDate(goal.createdAt.toString())}
				</p>
				<AiOutlineDelete
					size={25}
					className="cursor-pointer text-gray-500"
					onClick={() => dispatch(deleteGoal(goal._id))}
				/>
			</div>
			<div
				className="border-t-[2px] border-gray-400 py-2 cursor-pointer"
				onClick={() => setOpenGoalModal(true)}
			>
				<p>
					<span className="font-semibold pr-2">Goal:</span>
					{goal.goalName}
				</p>
				<p>
					<span className="font-semibold pr-2">Description:</span>
					{goal.goalDescription}
				</p>
				<p>
					<span className="font-semibold pr-2">Target Calories:</span>
					{goal.targetCaloriesValue} cal
				</p>
				<p>
					<span className="font-semibold pr-2">TargetDate:</span>
					{formatDateToInputFormat(goal.targetDate.toString())}
				</p>
				<p>
					<span className="font-semibold pr-2">Status:</span>
					{goal.status}
				</p>
			</div>
			<Modal
				isOpen={openGoalModal}
				onClose={() => setOpenGoalModal(false)}
				size={"xs"}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody textAlign="center" mt={10}>
						<form
							onSubmit={handleFormSubmit}
							className="flex flex-col gap-2 items-center w-full"
						>
							<input
								type="text"
								name="goalName"
								value={formData.goalName}
								onChange={handleInputChange}
								placeholder="Enter goal name"
								className="w-full"
								required
							/>
							<input
								type="text"
								name="goalDescription"
								value={formData.goalDescription}
								onChange={handleInputChange}
								placeholder="Enter goal description"
								className="w-full"
								required
							/>
							<div className="w-full flex gap-3">
								<select
									className="w-[50%]"
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
								<input
									className="cursor-pointer w-[50%]"
									type="date"
									name="targetDate"
									value={formData.targetDate}
									onChange={handleInputChange}
									required
								/>
							</div>

							<input
								type="number"
								name="targetCaloriesValue"
								value={formData.targetCaloriesValue}
								onChange={handleInputChange}
								placeholder="Enter target calories"
								className="w-full"
								required
							/>

							<button className="text-white bg-pink-500 px-4 py-1 rounded-md block">
								Add Goal
							</button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default SingleGoal;
