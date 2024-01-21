import { Ride } from "../../lib/types";

type RideInfoProps= {
    ride: Ride;
}

const RideInfo = ({ride}: RideInfoProps) => {

    return (
        <>
            <h2>Ride info</h2>
            <p>
                Origin: {ride.origin}<br/>
                Destination: {ride.destination}
                {/* Pickup Time: {ride.startTime.toISOString()} */}
            </p>
        </>
    )
}

export default RideInfo;