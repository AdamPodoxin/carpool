import { User, useAuth0 } from "@auth0/auth0-react";
import { Ride } from "../../lib/types";
import { getRidesAsDriver, getRidesAsRider } from "../../lib/rideService";
import { useEffect, useState } from "react";
import "./style.css";

type RideInfoProps = {
	ride: Ride;
	user: User;
};

const RideInfo = ({ ride }: RideInfoProps) => {
    const pickupTimestamp = ride.startTime as any;
    const timestamp = {
        seconds: pickupTimestamp.seconds,
        nanoseconds: pickupTimestamp.nanoseconds
    }
    const firebaseDate = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const pickupTime = firebaseDate.toDateString() + " " + firebaseDate.toTimeString();

	return (
		<>
			<div className="rideInfo">
				<p>From: {ride.origin}</p>
				<p>To: {ride.destination}</p>
				<p>At: {pickupTime}</p>
			</div>
		</>
	);
};

export const GetRides = () => {
    const [driverRides, setDriverRides] = useState<Ride[]>([]);
    const [riderRides, setRiderRides] = useState<Ride[]>([]);
    const { user } = useAuth0();

    const getDriverRides = async () => {
        const driverRides = await getRidesAsDriver(user!.sub!);
        setDriverRides(driverRides);
    };

    const getRiderRides = async () => {
        const riderRides = await getRidesAsRider(user!.sub!);
        setRiderRides(riderRides);
    };

    useEffect(() => {
        getDriverRides();
        getRiderRides();
    });

    return (
		<>
            <div className="flex">
            <div className="column">
            <h1>I'm driving</h1>
			{!!driverRides.length && (
				<div className="driverRidesList">
					{driverRides
						.map((ride) => (
							<RideInfo key={ride.id} ride={ride} user={user!} />
						))}
				</div>
			)}
            </div>
            <div className="column">
            <h1>I'm riding</h1>
			{!!driverRides.length && (
				<div className="riderRidesList">
					{riderRides
						.map((ride) => (
							<RideInfo key={ride.id} ride={ride} user={user!} />
						))}
				</div>
			)}
            </div>
            </div>
		</>
	);
}