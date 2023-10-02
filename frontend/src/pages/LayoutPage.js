import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const LayoutPage = () => {
	const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

	if (!isLoggedIn) {
		return <Navigate to="/signup" />;
	}
	return (
		<div className="w-full h-[90vh] flex flex-col-reverse md:flex-row">
			<SideBar />
			<div className="h-full overflow-y-auto">
				<Outlet />
			</div>
		</div>
	);
};

export default LayoutPage;
