import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Vehicle } from "../../lib/types";
import { useNavigate } from "react-router-dom";
import { createRide } from "../../lib/rideService";

import "./CreateRide.css";
import Button from "../../components/Button";

type CreateRideProps = {
	vehicle: Vehicle;
	vehicleId: string;
};

const CreateRide = ({ vehicle, vehicleId }: CreateRideProps) => {
	const [origin, setOrigin] = useState("");
	const [destination, setDestination] = useState("");
	const [startTime, setStartTime] = useState(new Date());

	const { user } = useAuth0();

	const navigate = useNavigate();

	return (
		<>
			<div className="createRide">
				<h1>Create a ride</h1>

				<div className="createRideForm">
					<span className="inputPair">
						<label>Origin:</label>
						<input
							placeholder="Origin"
							value={origin}
							onChange={(e) => setOrigin(e.target.value)}
						/>
					</span>

					<span className="inputPair">
						<label>Destination</label>
						<input
							placeholder="Destination"
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
						/>
					</span>

					<span className="inputPair">
						<label>Start date and time</label>
						<input
							placeholder="Start time"
							type="datetime-local"
							onChange={(e) => setStartTime(new Date(e.target.value))}
						/>
					</span>

					<Button
						onClick={async () => {
							await createRide(
								user!.sub!,
								origin,
								destination,
								startTime,
								vehicleId,
								vehicle.capacity,
								[]
							);
							navigate("/");
						}}
					>
						Submit
					</Button>
				</div>
			</div>
		</>
	);
};

export default CreateRide;
