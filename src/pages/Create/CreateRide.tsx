import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Vehicle } from "../../lib/types";
import { useNavigate } from "react-router-dom";
import { createRide } from "../../lib/rideService";

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
			<p>Create Ride form</p>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<input
					placeholder="Origin"
					value={origin}
					onChange={(e) => setOrigin(e.target.value)}
				/>

				<input
					placeholder="Destination"
					value={destination}
					onChange={(e) => setDestination(e.target.value)}
				/>

				<input
					placeholder="Start time"
					type="datetime-local"
					onChange={(e) => setStartTime(new Date(e.target.value))}
				/>

				<button
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
				</button>
			</div>
		</>
	);
};

export default CreateRide;
