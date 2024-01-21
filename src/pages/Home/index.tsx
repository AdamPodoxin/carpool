import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { Ride } from "../../lib/types";
import { User, useAuth0 } from "@auth0/auth0-react";
import { getAllRides, joinRide, leaveRide } from "../../lib/rideService.ts";

import "./style.css";

type RideInfoProps = {
	ride: Ride;
	user: User;
};

const RideInfo = ({ ride, user }: RideInfoProps) => {
	const navigate = useNavigate();

	const join = async () => {
		await joinRide(ride, user!.sub!, user!.name!);
		navigate(0);
	};

	const leave = async () => {
		await leaveRide(ride, user!.sub!, user!.name!);
		navigate(0);
	};

	return (
		<>
			<div className="rideInfo">
				<p>From: {ride.origin}</p>
				<p>To: {ride.destination}</p>
				<p>At: {ride.startTime.toLocaleString()}</p>
				<p>
					Seats left: {ride.capacity}
					<img src="/images/person.png" alt="person-icon"></img>
				</p>

				<div className="buttons">
				{ride.riderSubs.includes(user!.sub!) ? (
					<>
						<Button onClick={() => leave()}>Leave</Button>
					</>
				) : (
					<>
						<Button onClick={() => join()}>Join</Button>
					</>
				)}

				<Button
					onClick={() => {
						navigate(`/joinRide/${ride.id}`);
					}}
				>
					More info
				</Button>
				</div>
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
			<div className="ridesContainer">
				<div className="buttons">
				<Button onClick={() => navigate("/create")}>Create a ride</Button>
				<Button onClick={() => navigate("/my-rides")}>Your rides</Button>
				</div>

				{!!rides.length && (
					<div className="ridesList">
						{rides
							.filter((ride) => ride.capacity > 0)
							.map((ride) => (
								<RideInfo key={ride.id} ride={ride} user={user!} />
							))}
					</div>
				)}
			</div>
		</>
	);
};

export default HomePage;
