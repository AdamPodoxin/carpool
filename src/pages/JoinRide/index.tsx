import JoinButton from "../../components/JoinButton"
import { useParams } from "react-router-dom"
import { db } from "../../lib/firebase";
import { doc, getDoc } from "@firebase/firestore";
import { Ride, Vehicle } from "../../lib/types";
import RideInfo from "./RideInfo";
import { useEffect, useState } from "react";
import VehicleInfo from "./VehicleInfo";

const JoinRidePage = () => {
    const { rideId } = useParams();
    const [ ride, setRide ] = useState<Ride | null>(null);
    const [ vehicle, setVehicle ] = useState<Vehicle | null>(null);

    const getRideInfo = async () => {
        const rideDoc = await getDoc(doc(db, "rides", rideId!))
        console.log(rideDoc.data());
        setRide(rideDoc.data() as Ride)
    };

    const getVehicleInfo = async () => {
        const vehicleDoc = await getDoc(doc(db, "vehicles", ride!.vehicleId));
        console.log(vehicleDoc.data());
        setVehicle(vehicleDoc.data() as Vehicle);
    }

    const getInfos = async () => {
        await getRideInfo().then(() => {getVehicleInfo();})
    }

    useEffect(() => {
        // getRideInfo().then(() => {getVehicleInfo()});
        getRideInfo();
        console.log("Ride: " + ride);
        getVehicleInfo();
        // getInfos();
    }, [])

    return (
        <>
            <h1>Join this ride!</h1>
            {vehicle && <VehicleInfo vehicle={vehicle}/>}
            {ride && <RideInfo ride={ride}/>}
            
            <JoinButton />
        </>
    )
}

export default JoinRidePage;