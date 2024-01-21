import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "@firebase/firestore";
import { Ride, Vehicle } from "../../lib/types";
import RideInfo from "./RideInfo";
import { useEffect, useState } from "react";
import VehicleInfo from "./VehicleInfo";
import Button from "../../components/Button";
import { joinRide } from "../../lib/rideService";
import { useAuth0 } from "@auth0/auth0-react";

const JoinRidePage = () => {
	const { rideId } = useParams();
	const [ride, setRide] = useState<Ride | null>(null);
	const [vehicle, setVehicle] = useState<Vehicle | null>(null);

	const { user } = useAuth0();

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

	useEffect(() => {
		getRideInfo();
		{
			ride && getVehicleInfo();
		}
	}, [ride]);

	return (
		<>
			<div className="content">
				<h1>Join this ride!</h1>
				{vehicle && <VehicleInfo vehicle={vehicle} />}
				{ride && <RideInfo ride={ride} />}

				<Button onClick={() => join()}>+ Join</Button>
			</div>
		</>
	);
};

export default JoinRidePage;
