import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { Ride } from "../../lib/types";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllRides } from "../../lib/rideService";

import "./style.css";

const RideInfo = ({ ride }: { ride: Ride }) => {
	return (
		<>
			<div className="rideInfo">
				<p>From: {ride.origin}</p>
				<p>To: {ride.destination}</p>
				<p>At: {ride.startTime.toLocaleString()}</p>
				<p>Seats left: {ride.capacity}</p>

				<Button onClick={() => {}}>Join</Button>
			</div>
		</>
	);
};

const HomePage = () => {
	const [rides, setRides] = useState<Ride[]>([]);

	const { user } = useAuth0();

	const navigate = useNavigate();

	const fetchRides = async () => {
		const rides = await getAllRides();
		setRides(rides);
	};

	useEffect(() => {
		fetchRides();
	}, []);

	return (
		<>
			<Button onClick={() => navigate("/create")}>Create a ride</Button>

			{!!rides.length && (
				<div className="ridesList">
					{rides
						.filter((ride) => ride.capacity > 0)
						.map((ride) => (
							<RideInfo key={ride.id} ride={ride} />
						))}
				</div>
			)}
		</>
	);
};

export default HomePage;
