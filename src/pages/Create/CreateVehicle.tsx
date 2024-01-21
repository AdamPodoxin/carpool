import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { createVehicle } from "../../lib/vehiclesService";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

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
			<div className="createFormContainer">
				<h1>Add your vehicle</h1>

				<div className="createForm">
					<span className="inputPair">
						<label>Make</label>
						<input
							name="Make"
							value={make}
							onChange={(e) => setMake(e.target.value)}
						/>
					</span>

					<span className="inputPair">
						<label>Model</label>
						<input
							name="Model"
							value={model}
							onChange={(e) => setModel(e.target.value)}
						/>
					</span>

					<span className="inputPair">
						<label>Color</label>
						<input
							name="Color"
							value={color}
							onChange={(e) => setColor(e.target.value)}
						/>
					</span>

					<span className="inputPair">
						<label>License plate</label>
						<input
							name="License plate"
							value={licensePlate}
							onChange={(e) => setlicensePlate(e.target.value)}
						/>
					</span>

					<span className="inputPair">
						<label>Capacity</label>
						<input
							name="Capacity"
							value={capacity}
							onChange={(e) => setCapacity(+e.target.value)}
						/>
					</span>

					<Button
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
					</Button>
				</div>
			</div>
		</>
	);
};

export default CreateVehicle;
