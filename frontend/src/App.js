import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LayoutPage from "./pages/LayoutPage";
import DashboardPage from "./pages/DashboardPage";
import ExercisePage from "./pages/ExercisePage";
import FoodPage from "./pages/FoodPage";
import GoalPage from "./pages/GoalPage";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import ErrorPage from "./pages/ErrorPage";

function App() {
	return (
		<div className="">
			<ChakraProvider>
				<Provider store={Store}>
					<BrowserRouter>
						<Header />
						<Routes>
							<Route path="/signup" element={<SignupPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/" element={<LayoutPage />}>
								<Route index="true" element={<DashboardPage />} />
								<Route path="/goal" element={<GoalPage />} />
								<Route path="/exercise" element={<ExercisePage />} />
								<Route path="/food" element={<FoodPage />} />
							</Route>
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</BrowserRouter>
				</Provider>
			</ChakraProvider>
		</div>
	);
}

export default App;
