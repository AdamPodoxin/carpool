import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "@firebase/firestore";
import { Ride, Vehicle } from "../../lib/types";
import RideInfo from "./RideInfo";
import { useEffect, useState } from "react";
import VehicleInfo from "./VehicleInfo";
import Button from "../../components/Button";
import { joinRide, leaveRide } from "../../lib/rideService.ts";
import { useAuth0 } from "@auth0/auth0-react";

import "./style.css";

const JoinRidePage = () => {
	const { rideId } = useParams();
	const [ride, setRide] = useState<Ride | null>(null);
	const [vehicle, setVehicle] = useState<Vehicle | null>(null);

	const { user, isAuthenticated } = useAuth0();

	const navigate = useNavigate();

	const getRideInfo = async () => {
		const rideDoc = await getDoc(doc(db, "rides", rideId!));
		setRide(rideDoc.data() as Ride);
	};

	const getVehicleInfo = async () => {
		const vehicleDoc = await getDoc(doc(db, "vehicles", ride!.vehicleId));
		setVehicle(vehicleDoc.data() as Vehicle);
	};

	const join = async () => {
		await joinRide(ride!, user!.sub!, user!.name!);
		navigate("/");
	};

	const leave = async () => {
		await leaveRide(ride!, user!.sub!, user!.name!);
		navigate("/");
	};

    const cancel = async () => {
        navigate("/");
    }

	useEffect(() => {
		if (isAuthenticated) getRideInfo();
	}, [isAuthenticated]);

	useEffect(() => {
		if (isAuthenticated && ride) getVehicleInfo();
	}, [isAuthenticated, ride]);

	return (
		<>
			<div className="content">
				<h1>Join this ride!</h1>
                <div className="joinRideDetails">
                    <div className="joinRideInfoContainer">
                        <div className="infoBox">{ride && <RideInfo ride={ride} />}</div><br/>
                        <div className="infoBox">{vehicle && <VehicleInfo vehicle={vehicle} />}</div><br/>
                    </div><br/>
                    <div className="buttons">
                        {ride?.riderSubs.includes(user!.sub!) ? (
                            <Button onClick={() => leave()}>- Leave</Button>
                        ) : (
                            <Button onClick={() => join()}>+ Join</Button>
                        )}
                        <Button onClick={() => cancel()}>Cancel</Button>
                    </div>
                </div>
			</div>
		</>
	);
};

export default JoinRidePage;
