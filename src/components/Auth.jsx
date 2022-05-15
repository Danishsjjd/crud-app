import { useState } from "react";
import { AiOutlineUser, AiOutlineLock, AiOutlineGoogle } from "react-icons/ai";
import { BsAt } from "react-icons/bs";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { auth } from "../config/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setIsLogin, setUserData } from "../store/authSlice";

export default function Auth() {
	const googleProvider = new GoogleAuthProvider();
	const dispatch = useDispatch();
	const initialSignUpFilets = {
		signUpUserName: "",
		signUpEmail: "",
		signUpPassword: "",
	};
	const initialSignInFilets = {
		signInUserName: "",
		signInEmail: "",
		signInPassword: "",
	};
	const [isSingIn, setIsSignIn] = useState(false);
	const [signUpFields, setSignUpFields] = useState(initialSignUpFilets);
	const [signInFields, setSignInFields] = useState(initialSignInFilets);
	const { signUpEmail, signUpUserName, signUpPassword } = signUpFields;
	const { signInEmail, signInPassword } = signInFields;
	const changeHandler = (e) => {
		const { name, value } = e.target;
		setSignUpFields({ ...signUpFields, [name]: value });
	};
	const changeHandler2 = (e) => {
		const { name, value } = e.target;
		setSignInFields({ ...signInFields, [name]: value });
	};
	const signUpHandler = async () => {
		if (!signUpEmail || !signUpPassword || !signUpUserName)
			return toast.error("Please Enter All the fields");
		try {
			const user = await createUserWithEmailAndPassword(
				auth,
				signUpEmail,
				signUpPassword
			);
			dispatch(setIsLogin(true));
			dispatch(setUserData(user));
		} catch (error) {
			toast.error(error.message);
			dispatch(setIsLogin(false));
			dispatch(setUserData({}));
		}
	};
	const signInHandler = async () => {
		if (!signInEmail || !signInPassword)
			return toast.error("Please Enter All the fields");
		try {
			await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
		} catch (error) {
			toast.error(error.message);
			dispatch(setIsLogin(false));
			dispatch(setUserData({}));
		}
	};
	const googleSignInHandler = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<>
			<header className="auth_header">
				<p>CRUD-APPLICATION</p>
			</header>
			<section className="auth_section">
				<div className="auth_container">
					<div className="auth_buttons">
						<button
							onClick={() => setIsSignIn(false)}
							className={`${!isSingIn ? "active" : ""} auth_left_button`}
						>
							Sign Up
						</button>
						<button
							onClick={() => setIsSignIn(true)}
							className={`${isSingIn ? "active" : ""} auth_right_button`}
						>
							Sign In
						</button>
					</div>
					{isSingIn ? (
						<div className="auth_main">
							<div
								className="icon"
								onClick={() => googleSignInHandler()}
							>
								<AiOutlineGoogle size={"22px"} />
								<p>Continue With Google</p>
							</div>
							<div className="inputs">
								<InputGroup className="my-2">
									<InputGroup.Text>
										<AiOutlineUser />
									</InputGroup.Text>
									<FormControl
										aria-label="Dollar amount (with dot and two decimal places)"
										placeholder="Enter Your Email"
										value={signInEmail}
										onChange={(e) => changeHandler2(e)}
										name="signInEmail"
									/>
								</InputGroup>
								<InputGroup className="my-2">
									<InputGroup.Text>
										<AiOutlineLock />
									</InputGroup.Text>
									<FormControl
										aria-label="Dollar amount (with dot and two decimal places)"
										type="password"
										placeholder="Enter Your Password"
										value={signInPassword}
										onChange={(e) => changeHandler2(e)}
										name="signInPassword"
									/>
								</InputGroup>
								<Button
									className="custom_btn"
									onClick={() => signInHandler()}
								>
									Sign In
								</Button>
							</div>
						</div>
					) : (
						<div className="auth_main">
							<div
								className="icon"
								onClick={() => googleSignInHandler()}
							>
								<AiOutlineGoogle size={"22px"} />
								<p>Continue With Google</p>
							</div>
							<div className="inputs">
								<InputGroup className="my-2">
									<InputGroup.Text>
										<BsAt />
									</InputGroup.Text>
									<FormControl
										aria-label="Dollar amount (with dot and two decimal places)"
										placeholder="Enter Your Username"
										value={signUpUserName}
										onChange={(e) => changeHandler(e)}
										name="signUpUserName"
									/>
								</InputGroup>
								<InputGroup className="my-2">
									<InputGroup.Text>
										<AiOutlineUser />
									</InputGroup.Text>
									<FormControl
										aria-label="Dollar amount (with dot and two decimal places)"
										placeholder="Enter Your Email"
										value={signUpEmail}
										onChange={(e) => changeHandler(e)}
										name="signUpEmail"
									/>
								</InputGroup>
								<InputGroup className="my-2">
									<InputGroup.Text>
										<AiOutlineLock />
									</InputGroup.Text>
									<FormControl
										aria-label="Dollar amount (with dot and two decimal places)"
										type="password"
										placeholder="Enter Your Password"
										value={signUpPassword}
										onChange={(e) => changeHandler(e)}
										name="signUpPassword"
									/>
								</InputGroup>
								<Button
									className="custom_btn"
									onClick={() => signUpHandler()}
								>
									Sign Up
								</Button>
							</div>
						</div>
					)}
				</div>
			</section>
		</>
	);
}
