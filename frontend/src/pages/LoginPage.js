import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { setAuthToken } from "../redux/AuthSlice";
import login from "../images/login.jpg";
import api from "../utils/Axios";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const token = useSelector((store) => store.auth.authToken);
	const toast = useToast();

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	async function handleLogin(e) {
		e.preventDefault();
		try {
			const resp = await api.post("/auth/login", JSON.stringify(formData));
			const data = resp.data;
			dispatch(setAuthToken(data.token));
			toast({
				title: "User LoggedIn",
				description: "Welcome back, we missed you.",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		} catch (err) {
			const data = err.response.data;

			setError(data.error);
			toast({
				title: data.error,
				description: data.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	}

	if (token) {
		return <Navigate to="/" />;
	}

	return (
		<div className="p-2 ">
			<div className="flex items-center justify-center min-h-[80vh]">
				<section className="flex flex-col sm:flex-row items-center w-full">
					<div className=" w-[50%] ">
						<img
							src={login}
							className="h-full max-h-[80vh] w-full object-contain"
							alt="login here"
						/>
					</div>
					<div className=" w-full sm:w-[50%] flex flex-col items-center p-2">
						<p className="text-2xl font-bold text-center">Heyy! Welcome Back</p>
						{error && (
							<p className="text-sm text-center text-red-600 my-2">{error}</p>
						)}
						<form
							onSubmit={handleLogin}
							className="flex  sm:w-[80%]  flex-col gap-3 my-4"
						>
							<div className="flex gap-2 border-black rounded-md items-center border-2 p-2 px-3">
								<BiUser />
								<input
									type="text"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Your email"
									className="border-none outline-none w-full"
									required
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
									className="border-none outline-none w-full"
									required
								/>
								<div
									className="ml-auto cursor-pointer"
									onClick={() => setShowPassword((prev) => !prev)}
								>
									{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
								</div>
							</div>
							<button
								onClick={handleLogin}
								className="border-2  border-black rounded-md bg-pink-400 text-white p-2 px-3 w-full"
							>
								Log In
							</button>
						</form>
						<p>
							Don't have an account?
							<Link className="text-pink-800 font-semibold ml-1" to="/signup">
								Sign Up
							</Link>
						</p>
					</div>
				</section>
			</div>
		</div>
	);
};

export default LoginPage;
