import React, { useEffect, useState } from "react";
import { database } from "../config/firebase";
import { onValue, ref, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();
	const userData = useSelector(state => state.authSlice.userData)
	const [data, setData] = useState({});
	const userId = useSelector((state) => state.authSlice.userData.uid);
	useEffect(() => {
		onValue(ref(database, "contacts/" + userId), (snapshot) => {
			if (snapshot.exists) setData({ ...snapshot.val() });
		});
		return () =>{
			setData({})
		}
	}, [userData]);
	const finalData = Object.keys(data);
	const deleteHandler = (id) => {
		remove(ref(database, "contacts/" + userId + "/" + id))
			.then(() => {
				toast.success("data is deleted successfully");
			})
			.catch(() => {
				toast.error("error while deleting");
			});
	};
	return (
		<div className="responsive_table">
			<Table striped bordered hover className="styled_table">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>RollNo</th>
						<th>Contact</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{finalData &&
						finalData.map((id, index) => {
							return (
								<tr key={id}>
									<td>{index + 1}</td>
									<td>{data[id].name}</td>
									<td>{data[id].rollNo}</td>
									<td>{data[id].contact}</td>
									<td>
										<Button
											variant="danger"
											onClick={() => deleteHandler(id)}
										>
											Delete
										</Button>
										<Button
											variant="success"
											onClick={() =>
												navigate("/update", {
													state: { ...data[id], id: id },
												})
											}
										>
											Update
										</Button>
										<Button variant="secondary">
											<Link
												to={`view/${id}`}
												style={{
													color: "inherit",
													textDecoration: "none",
												}}
											>
												View
											</Link>
										</Button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
		</div>
	);
}
