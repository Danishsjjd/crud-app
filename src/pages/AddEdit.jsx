import React, { useEffect, useState, useLayoutEffect } from "react";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import { database } from "../config/firebase";
import { ref, push, get, set } from "firebase/database";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddEdit() {
	const { state: navigateState } = useLocation();

	const navId = navigateState?.id;

	const navigate = useNavigate();
	const userId = useSelector((state) => state.authSlice.userData.uid);
	const initialState = {
		name: "",
		rollNo: "",
		contact: "",
	};
	const [state, setState] = useState(initialState);
	const { name, rollNo, contact } = state;
	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (!name || !rollNo || !contact)
			return toast.error("Please Enter All the fields");
		if (!navId) {
			const reference = ref(database, "contacts/" + userId);
			push(reference, state)
				.then(() => {
					navigate("/");
				})
				.catch((error) => {
					toast.error(error.message);
				});
		} else {
			const reference = ref(database, "contacts/" + userId + "/" + navId);
			set(reference, state)
				.then(() => {
					navigate("/");
				})
				.catch((error) => {
					toast.error(error.message);
				});
		}
	};

	useLayoutEffect(() => {
		if (navId) {
			const {
				name: navName,
				rollNo: navRollNo,
				contact: navContact,
			} = navigateState;
			setState({
				name: navName,
				rollNo: navRollNo,
				contact: navContact,
			});
		}
	}, [navId]);

	return (
		<div className="styled_form">
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Name"
						value={name || ""}
						name="name"
						onChange={onChangeHandler}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Roll No</Form.Label>
					<Form.Control
						type="number"
						placeholder="Roll No"
						value={rollNo || ""}
						name="rollNo"
						onChange={onChangeHandler}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Contact</Form.Label>
					<Form.Control
						type="text"
						placeholder="Contact"
						value={contact || ""}
						name="contact"
						onChange={onChangeHandler}
					/>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
					onClick={(e) => submitHandler(e)}
				>
					{navId ? "Update" : "Save"}
				</Button>
			</Form>
		</div>
	);
}
