import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import api from "../utils/Axios";
import { setAuthToken } from "../redux/AuthSlice";

const SignUpPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const toast = useToast();
	const token = useSelector((store) => store.auth.authToken);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	async function handleSignUP(e) {
		e.preventDefault();
		try {
			if (
				formData.firstName.trim() === "" ||
				formData.email.trim() === "" ||
				formData.password.trim() === ""
			) {
				return alert("Please fill all fields.");
			}
			const resp = await api.post("/auth/signup", JSON.stringify(formData));
			const data = resp.data;
			dispatch(setAuthToken(data.token));
			toast({
				title: "Account created.",
				description: "We've created your account for you.",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		} catch (err) {
			const data = err.response.data;
			setError(data.error);
			toast({
				title: data.message,
				description: data.error,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	}

	if (token) {
		return <Navigate to="/profile" />;
	}

	return (
		<div className="p-2">
			<div className="flex items-center justify-center min-h-[80vh]">
				<section className="flex flex-col sm:flex-row items-center w-full justify-center">
					<div className="w-[50%] ">
						<img src={""} alt="login here" />
					</div>
					<div className=" w-full sm:w-[50%] flex flex-col items-center p-2">
						<p className="text-2xl font-bold text-center">
							Let's get you Started
						</p>
						{error && (
							<p className="text-sm text-center text-red-600 my-2">{error}</p>
						)}
						<form
							onSubmit={handleSignUP}
							className="flex sm:w-[80%]  flex-col gap-3 my-4"
						>
							<div className="flex gap-2">
								<input
									className=" border-black rounded-md border-2 p-2 px-3 w-[50%]"
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									placeholder="Your first name"
								/>
								<input
									className=" border-black rounded-md border-2 p-2 px-3 w-[50%]"
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									placeholder="Your last name"
								/>
							</div>
							<div className="flex gap-2 border-black rounded-md items-center border-2 p-2 px-3">
								<BiUser />
								<input
									type="text"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Your email"
									className="border-none outline-none"
								/>
							</div>
							<div className="flex gap-2 border-black rounded-md items-center border-2 p-2 px-3">
								<RiLockPasswordLine />
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Enter your password"
									className="outline-none"
								/>
								<div
									className="ml-auto cursor-pointer"
									onClick={() => setShowPassword((prev) => !prev)}
								>
									{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
								</div>
							</div>
							<button
								onClick={handleSignUP}
								className="border-2  border-black rounded-md bg-blue-950 text-white p-2 px-3 w-full"
							>
								Sign Up
							</button>
						</form>
						<p>
							Don't have an account?
							<Link className="text-blue-800 font-semibold ml-1" to="/login">
								Log In
							</Link>
						</p>
					</div>
				</section>
			</div>
		</div>
	);
};

export default SignUpPage;
