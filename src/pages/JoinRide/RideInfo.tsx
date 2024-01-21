import { Ride } from "../../lib/types";
// import firebase from "../../lib/firebase"

type RideInfoProps = {
    ride: Ride;
}

const RideInfo = ({ride}: RideInfoProps) => {
    const pickupTimestamp = ride.startTime as any;
    const timestamp = {
        seconds: pickupTimestamp.seconds,
        nanoseconds: pickupTimestamp.nanoseconds
    }
    const firebaseDate = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const pickupTime = firebaseDate.toDateString() + " " + firebaseDate.toTimeString();

    return (
        <>
            <h2>Ride info</h2>
            <p>
                Origin: {ride.origin}<br/>
                Destination: {ride.destination}<br/>
                Pickup Time: {pickupTime}<br/>
            </p>
        </>
    )
}

export default RideInfo;