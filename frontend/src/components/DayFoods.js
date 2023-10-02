import { useDispatch } from "react-redux";
import { deleteFood } from "../utils/Thunks";
import { AiOutlineDelete } from "react-icons/ai";

const DayFoods = ({ foodsArr }) => {
	const dispatch = useDispatch();
	return (
		<div>
			{foodsArr.map((food) => (
				<div
					key={food.foodId}
					className="flex border-y border-gray-400 justify-between items-center p-2"
				>
					<div>
						<p>{food.foodName}</p>
						<div className="flex gap-5">
							<table>
								<thead>
									<tr>
										<th>Nutrition</th>
										<th>Quantity</th>
										<th>Calories</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Protien</td>
										<td>{food.protein} g</td>
										<td>{food.protein * 4} cal</td>
									</tr>
									<tr>
										<td>Carbs</td>
										<td>{food.carbohydrates} g</td>
										<td>{food.carbohydrates * 4} cal</td>
									</tr>
									<tr>
										<td>Fats</td>
										<td>{food.fat} g</td>
										<td>{food.fat * 9} cal</td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<th>Total Calories</th>
										<td></td>
										<td>{food.calories} cal</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
					<div>
						<AiOutlineDelete
							size={25}
							className="cursor-pointer"
							onClick={() => dispatch(deleteFood(food.foodId))}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default DayFoods;
