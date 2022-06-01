import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { setUserData, setIsLogin } from "../store/authSlice";

export default function Header() {
	const dispatch = useDispatch();
	const signOutHandler = async () => {
		if (window.confirm("Are You Sure?")) {
			await signOut(auth);
			dispatch(setIsLogin(false));
			dispatch(setUserData({}));
		}
	};
	return (
		<header className="header">
			<div className="header_container">
				<div className="logo">CRUD-APPLICATION</div>
				<ul>
					<CustomLink to="/">Home</CustomLink>
					<CustomLink to="/add">Add</CustomLink>
					<CustomLink to="/about">About</CustomLink>
					<li>
						<button onClick={() => signOutHandler()}>Sign Out</button>
					</li>
				</ul>
			</div>
		</header>
	);
}

function CustomLink({ children, to, ...props }) {
	const location = useLocation();
	const path = location.pathname;
	return (
		<li className={`${path == to ? "active" : ""}`}>
			<Link to={to} {...props}>
				{children}
			</Link>
		</li>
	);
}
