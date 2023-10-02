import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFood } from "../utils/Thunks";
import { formatDate } from "../utils/utils";
import DayFoods from "../components/DayFoods";

const FoodPage = () => {
	const { foods, loading, error } = useSelector((store) => store.food);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		foodName: "",
		protein: null,
		carbohydrates: null,
		fat: null,
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
		dispatch(addFood(formData));
		setFormData({
			foodName: "",
			protein: null,
			carbohydrates: null,
			fat: null,
		});
	}

	return (
		<div className=" h-full">
			<h1 className="text-2xl md:text-3xl text-center font-bold pb-3">
				My Foods Track
			</h1>
			<div className="p-3 py-5 bg-pink-100 rounded-md my-3">
				<p className="text-lg md:text-xl text-center font-bold py-2">
					Add new food for today
				</p>
				<form
					onSubmit={handleFormSubmit}
					className="flex gap-2 justify-center flex-wrap"
				>
					<input
						type="text"
						name="foodName"
						value={formData.foodName}
						onChange={handleInputChange}
						placeholder="Enter food name"
						required
					/>
					<input
						type="number"
						name="protein"
						value={formData.protein}
						onChange={handleInputChange}
						placeholder="Enter protein amount"
						required
					/>

					<input
						type="number"
						name="carbohydrates"
						value={formData.carbohydrates}
						onChange={handleInputChange}
						placeholder="Enter carbohydrates amount"
						required
					/>

					<input
						type="number"
						name="fat"
						value={formData.fat}
						onChange={handleInputChange}
						placeholder="Enter fat amount"
						required
					/>

					<button className="text-white bg-pink-500 px-4 py-1 rounded-md block">
						Add Food
					</button>
				</form>
			</div>
			<div className="flex flex-wrap gap-3 justify-center p-2">
				{foods.map((food) => (
					<div
						key={food.date}
						className="p-2 shadow-md shadow-gray-300 rounded-lg min-w-[250px]"
					>
						<p className="font-bold capitalize text-lg py-2">
							{formatDate(food.date.toString())}
						</p>
						<DayFoods foodsArr={food.foodItems} />
					</div>
				))}
			</div>
		</div>
	);
};

export default FoodPage;
