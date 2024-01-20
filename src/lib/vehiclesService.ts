import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { Vehicle } from "./types";

export const getVehicleForOwner = async (ownerSub: string) => {
	const q = query(
		collection(db, "vehicles"),
		where("ownerSub", "==", ownerSub)
	);

	const querySnapshot = await getDocs(q);
	return querySnapshot.empty ? null : (querySnapshot.docs[0].data() as Vehicle);
};

export const createVehicle = async (vehicle: Vehicle) => {
	await addDoc(collection(db, "vehicles"), vehicle);
};
