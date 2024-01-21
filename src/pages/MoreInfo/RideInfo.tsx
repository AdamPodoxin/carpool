import { useAuth0 } from "@auth0/auth0-react";
import { Ride } from "../../lib/types";

const RiderNamesList = ({ riderNames }: { riderNames: string[] }) => (
	<>
		<h2>Riders</h2>
		{riderNames.map((riderName) => (
			<p key={riderName}>{riderName}</p>
		))}
	</>
);

type RideInfoProps = {
	ride: Ride;
};

const RideInfo = ({ ride }: RideInfoProps) => {
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

	const { user } = useAuth0();

	return (
		<>
			<h2>Ride info</h2>
			<div className="infoContainer">
				<p className="column-2">
					<b>Origin:</b>
					<br />
					<b>Destination:</b>
					<br />
					<b>Pickup Time:</b>
					<br />
				</p>
				<p className="column-2">
					{ride.origin}
					<br />
					{ride.destination}
					<br />
					{pickupTime}
					<br />
				</p>
			</div>
		</>
	);
};

export default RideInfo;
