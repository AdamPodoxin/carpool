import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getVehicleForOwner } from "../../lib/vehiclesService";
import CreateRide from "./CreateRide";
import CreateVehicle from "./CreateVehicle";
import { Vehicle } from "../../lib/types";

const CreatePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [vehicle, setVehicle] = useState<Vehicle | null>(null);
	const [vehicleId, setVehicleId] = useState("");

	const { user } = useAuth0();

	const fetchVehicleForOwner = async () => {
		if (!user) return;

		const vehicle = await getVehicleForOwner(user.sub!);

		setIsLoading(false);
		setVehicle(vehicle);

		if (vehicle) setVehicleId(vehicle.id);
	};

	useEffect(() => {
		fetchVehicleForOwner();
	}, [user]);

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : vehicle ? (
				<CreateRide vehicleId={vehicleId} vehicle={vehicle} />
			) : (
				<CreateVehicle />
			)}
		</>
	);
};

export default CreatePage;
