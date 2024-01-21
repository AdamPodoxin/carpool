import JoinButton from "../../components/JoinButton"
import { useParams } from "react-router-dom"
import { db } from "../../lib/firebase";
import { doc, getDoc } from "@firebase/firestore";
import { Ride, Vehicle } from "../../lib/types";
import RideInfo from "./RideInfo";
import { useEffect, useState } from "react";

const JoinRidePage = () => {
    const { rideId } = useParams();
    var vehicle: Vehicle;
    const [ ride, setRide ] = useState<Ride | null>(null);

    const getRideInfo = async () => {
        const rideDoc = await getDoc(doc(db, "rides", rideId!))
        console.log(rideDoc.data());
        setRide(rideDoc.data() as Ride)
    };

    const getVehicleInfo = async () => {
        // const vehicleDoc = await getDoc(doc(db, "vehicle", ride.vehicleId));
        // vehicle = vehicleDoc.data() as Vehicle;
    }

    const vehicleInfo = getVehicleInfo();

    useEffect(() => {
        getRideInfo();
    }, [])

    return (
        <>
            <h1>Join this ride!</h1>
            <h2>Vehicle info</h2>
            <p>
                License Plate:
                Colour:
                Make:
                Model:
            </p>
            {ride && <RideInfo ride={ride}/>}
            
            <JoinButton />
        </>
    )
}

export default JoinRidePage;