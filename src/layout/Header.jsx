import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { setUserData, setIsLogin } from "../store/authSlice";
import { useLocation } from "react-router-dom";

export default function Header() {
	const location = useLocation();
	const dispatch = useDispatch();
	const [activeLink, setActiveLink] = useState("home");
	const signOutHandler = async () => {
		if (window.confirm("Are You Sure?")) {
			await signOut(auth);
			dispatch(setIsLogin(false));
			dispatch(setUserData({}));
		}
	};
	useEffect(() => {
		if (location.pathname === "/") setActiveLink("home");
		else if (location.pathname === "/add") setActiveLink("add");
		else if(location.pathname==="about") setActiveLink("about");
	}, []);
	return (
		<header className="header">
			<div className="header_container">
				<div className="logo">CRUD-APPLICATION</div>
				<ul>
					<li
						className={`${activeLink == "home" ? "active" : ""}`}
						onClick={() => setActiveLink("home")}
					>
						<Link to="/">Home</Link>
					</li>
					<li
						className={`${activeLink == "add" ? "active" : ""}`}
						onClick={() => setActiveLink("add")}
					>
						<Link to="/add">Add</Link>
					</li>
					<li
						className={`${activeLink == "about" ? "active" : ""}`}
						onClick={() => setActiveLink("about")}
					>
						<Link to="/about">About</Link>
					</li>
					<li>
						<button onClick={() => signOutHandler()}>Sign Out</button>
					</li>
				</ul>
			</div>
		</header>
	);
}
