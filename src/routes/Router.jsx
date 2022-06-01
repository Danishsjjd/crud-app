import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { setIsLogin, setUserData } from "../store/authSlice";
import AddEdit from "../pages/AddEdit";
import About from "../pages/About";
import Header from "../layout/Header";
import NotFound from "../pages/NotFound";
import View from "../pages/View";

export default function Router() {
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state.authSlice.isLogin);

	useEffect(() => {
		
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(setIsLogin(true));
				dispatch(setUserData(user));
			} else {
				dispatch(setIsLogin(false));
				dispatch(setUserData({}));
			}
		});
	}, []);
	return (
		<BrowserRouter>
			{isLogin && <Header />}
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoutes isLogin={isLogin}>
							<Home />
						</PrivateRoutes>
					}
				/>
				<Route
					path="/add"
					element={
						<PrivateRoutes isLogin={isLogin}>
							<AddEdit />
						</PrivateRoutes>
					}
				/>
				<Route
					path="/update/:id"
					element={
						<PrivateRoutes isLogin={isLogin}>
							<AddEdit />
						</PrivateRoutes>
					}
				/>
				<Route
					path="/update"
					element={
						<PrivateRoutes isLogin={isLogin}>
							<AddEdit />
						</PrivateRoutes>
					}
				/>
				<Route
					path="/view/:id"
					element={
						<PrivateRoutes isLogin={isLogin}>
							<View />
						</PrivateRoutes>
					}
				/>
				<Route path="/about" element={<About />} />
				<Route
					path="/login"
					element={
						<PublicRoutes isLogin={isLogin}>
							<Login />
						</PublicRoutes>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
