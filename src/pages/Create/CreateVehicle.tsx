import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { createVehicle } from "../../lib/vehiclesService";
import { useNavigate } from "react-router-dom";

const CreateVehicle = () => {
	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [color, setColor] = useState("");
	const [licensePlate, setlicensePlate] = useState("");
	const [capacity, setCapacity] = useState(0);

	const { user } = useAuth0();

	const navigate = useNavigate();

	return (
		<>
			<p>Create Vehicle form</p>

			<br />

			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<input
					placeholder="Make"
					value={make}
					onChange={(e) => setMake(e.target.value)}
				/>

				<input
					placeholder="Model"
					value={model}
					onChange={(e) => setModel(e.target.value)}
				/>

				<input
					placeholder="Color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
				/>

				<input
					placeholder="License plate"
					value={licensePlate}
					onChange={(e) => setlicensePlate(e.target.value)}
				/>

				<input
					placeholder="Capacity"
					value={capacity}
					onChange={(e) => setCapacity(+e.target.value)}
				/>

				<button
					onClick={async () => {
						await createVehicle({
							capacity,
							color,
							licensePlate,
							make,
							model,
							ownerSub: user!.sub!,
						});
						navigate(0);
					}}
				>
					Submit
				</button>
			</div>
		</>
	);
};

export default CreateVehicle;
