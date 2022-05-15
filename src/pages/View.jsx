import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, get, child } from "firebase/database";
import { useSelector } from "react-redux";
import { database } from "../config/firebase";

export default function View() {
	const userId = useSelector((state) => state.authSlice.userData.uid);
	const { id } = useParams();
	const [data, setData] = useState(true);
	useEffect(() => {
		const reference = ref(database, "contacts/" + userId);
		get(child(reference, id)).then((dataForUpdate) => {
			if (dataForUpdate.exists) setData(dataForUpdate.val());
			else {
				setData({});
			}
		});
	}, [id]);
	return (
		<div className="view_container">
			<div className="heading">
				<p>Contact Info</p>
			</div>
			<div className="view_body">
				<span>
					<strong>Name: </strong>
					{data.name}
				</span>
				<span>
					<strong>Roll No: </strong>
					{data.rollNo}
				</span>
				<span>
					<strong>Contact: </strong>
					{data.contact}
				</span>
			</div>
		</div>
	);
}
