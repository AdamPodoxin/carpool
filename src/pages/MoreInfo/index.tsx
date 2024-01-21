import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "@firebase/firestore";
import { Ride, Vehicle } from "../../lib/types";
import RideInfo from "./RideInfo";
import { useEffect, useState } from "react";
import VehicleInfo from "./VehicleInfo";
import Button from "../../components/Button";

import "./style.css";

const MoreInfoPage = () => {
	const { rideId } = useParams();
	const [ride, setRide] = useState<Ride | null>(null);
	const [vehicle, setVehicle] = useState<Vehicle | null>(null);

	const navigate = useNavigate();

	const getRideInfo = async () => {
		const rideDoc = await getDoc(doc(db, "rides", rideId!));
		setRide(rideDoc.data() as Ride);
	};

	const getVehicleInfo = async () => {
		const vehicleDoc = await getDoc(doc(db, "vehicles", ride!.vehicleId));
		setVehicle(vehicleDoc.data() as Vehicle);
	};

	const goBack = async () => {
		navigate("/my-rides");
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
				<div className="rideInfoContainer">
					<div className="infoBox">{ride && <RideInfo ride={ride} />}</div><br/>
					<div className="infoBox">{vehicle && <VehicleInfo vehicle={vehicle} />}</div><br/>
				</div><br/>

				<div className="buttons"><Button onClick={() => goBack()}> See all your rides</Button></div>
			</div>
		</>
	);
};

export default MoreInfoPage;
