import { User, useAuth0 } from "@auth0/auth0-react";
import { Ride } from "../../lib/types";
import { getRidesAsDriver } from "../../lib/rideService";
import { useEffect, useState } from "react";

type RideInfoProps = {
	ride: Ride;
	user: User;
};

const RideInfo = ({ ride }: RideInfoProps) => {
	return (
		<>
			<div className="rideInfo">
				<p>From: {ride.origin}</p>
				<p>To: {ride.destination}</p>
				<p>At: {ride.startTime.toLocaleString()}</p>
			</div>
		</>
	);
};

export const GetRides = () => {
    const [driverRides, setRides] = useState<Ride[]>([]);
    const { user } = useAuth0();

    const getDriverRides = async () => {
        const driverRides = await getRidesAsDriver(user!.sub!);
        setRides(driverRides);
    };

    useEffect(() => {
        getDriverRides();
    });

    return (
		<>
            <h1>I'm driving</h1>
			{!!driverRides.length && (
				<div className="driverRidesList">
					{driverRides
						.map((ride) => (
							<RideInfo key={ride.id} ride={ride} user={user!} />
						))}
				</div>
			)}
		</>
	);
}