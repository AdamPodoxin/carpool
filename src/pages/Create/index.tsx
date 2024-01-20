import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getVehicleForOwner } from "../../lib/vehiclesService";
import CreateRide from "./CreateRide";
import CreateVehicle from "./CreateVehicle";

const CreatePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasVehicle, setHasVehicle] = useState(false);

	const { user } = useAuth0();

	const fetchVehicleForOwner = async () => {
		if (!user) return;

		const vehicle = await getVehicleForOwner(user.sub!);
		setIsLoading(false);
		setHasVehicle(!!vehicle);
	};

	useEffect(() => {
		fetchVehicleForOwner();
	}, [user]);

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : hasVehicle ? (
				<CreateRide />
			) : (
				<CreateVehicle />
			)}
		</>
	);
};

export default CreatePage;
