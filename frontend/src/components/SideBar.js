import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoFitnessOutline } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import { BiFoodMenu } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const SideBar = () => {
	return (
		<div className="w-full md:w-[20%] md:h-full md:py-4 flex justify-evenly  p-2 md:flex-col gap-4">
			<NavLink
				to="/dashboard"
				className={({ isActive }) =>
					`${
						isActive && "text-pink-400 border-blue-800 md:border-l-8"
					} flex gap-2 items-center p-2  font-semibold pl-4`
				}
			>
				<AiOutlineDashboard size={25} />
				<span className="hidden md:block">Dashboard</span>
			</NavLink>
			<NavLink
				to="/exercise"
				className={({ isActive }) =>
					`${
						isActive && " text-pink-400 border-blue-800 md:border-l-8"
					} flex gap-2 items-center p-2  font-semibold pl-4`
				}
			>
				<IoFitnessOutline size={25} />
				<span className="hidden md:block">Exercises</span>
			</NavLink>
			<NavLink
				to="/food"
				className={({ isActive }) =>
					`${
						isActive && " text-pink-400 border-blue-800 md:border-l-8"
					} flex gap-2 items-center p-2  font-semibold pl-4`
				}
			>
				<BiFoodMenu size={25} />
				<span className="hidden md:block">Food</span>
			</NavLink>
			<NavLink
				to="/goal"
				className={({ isActive }) =>
					`${
						isActive && " text-pink-400 border-blue-800 md:border-l-8"
					} flex gap-2 items-center p-2  font-semibold pl-4`
				}
			>
				<GoGoal size={25} />
				<span className="hidden md:block">Goals</span>
			</NavLink>
		</div>
	);
};

export default SideBar;
