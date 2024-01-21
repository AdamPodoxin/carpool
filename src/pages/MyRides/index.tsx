import { User, useAuth0 } from "@auth0/auth0-react";
import { Ride } from "../../lib/types";
import {
	closeRide,
	getRidesAsDriver,
	getRidesAsRider,
} from "../../lib/rideService";
import { useEffect, useState } from "react";
import "./style.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

type RideInfoProps = {
	ride: Ride;
	user: User;
};

const RideInfo = ({ ride }: RideInfoProps) => {
	const navigate = useNavigate();

	const { user } = useAuth0();

	const pickupTimestamp = ride.startTime as any;
	const timestamp = {
		seconds: pickupTimestamp.seconds,
		nanoseconds: pickupTimestamp.nanoseconds,
	};
	const firebaseDate = new Date(
		timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
	);
	const pickupTime =
		firebaseDate.toDateString() + " " + firebaseDate.toTimeString();

	return (
		<>
			<div className="rideInfo">
				<p>From: {ride.origin}</p>
				<p>To: {ride.destination}</p>
				<p>At: {pickupTime}</p>
				<Button
					onClick={() => {
						navigate(`/more-info/${ride.id}`);
					}}
				>
					More info
				</Button>

				{ride.driverSub === user?.sub &&
					(ride.closed ? (
						<span>Closed</span>
					) : (
						<Button
							onClick={() => {
								closeRide(ride);
								navigate(0);
							}}
						>
							Close
						</Button>
					))}
			</div>
		</>
	);
};

export const GetRides = () => {
	const [driverRides, setDriverRides] = useState<Ride[]>([]);
	const [riderRides, setRiderRides] = useState<Ride[]>([]);
	const { user, isAuthenticated } = useAuth0();

	const navigate = useNavigate();

	const getDriverRides = async () => {
		const driverRides = await getRidesAsDriver(user!.sub!);
		setDriverRides(driverRides);
	};

	const getRiderRides = async () => {
		const riderRides = await getRidesAsRider(user!.sub!);
		setRiderRides(riderRides);
	};

	useEffect(() => {
		if (isAuthenticated) {
			getDriverRides();
			getRiderRides();
		}
	}, [isAuthenticated]);

	return (
		<>
			<Button className={"allRides"} onClick={() => navigate("/")}>
				<h1>&lt; All Rides</h1>
			</Button>
			<div className="flex">
				<div className="column">
					<h1>I'm driving</h1>
					{!!driverRides.length && (
						<div className="driverRidesList">
							{driverRides.map((ride) => (
								<RideInfo key={ride.id} ride={ride} user={user!} />
							))}
						</div>
					)}
				</div>
				<div className="column">
					<h1>I'm riding</h1>
					{!!driverRides.length && (
						<div className="riderRidesList">
							{riderRides.map((ride) => (
								<RideInfo key={ride.id} ride={ride} user={user!} />
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
