import { useState } from "react";

type CreateRideProps = {
	vehicleId: string;
};

const CreateRide = ({ vehicleId }: CreateRideProps) => {
	const [origin, setOrigin] = useState("");

	return (
		<>
			<p>Create Ride form</p>
			<p>Vehicle Id: {vehicleId}</p>

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
			</div>
		</>
	);
};

export default CreateRide;
