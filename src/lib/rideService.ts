import { db } from "./firebase";
import { Ride } from "./types";
import { addDoc, collection } from "firebase/firestore";

export async function createRide(
	driverSub: string,
	origin: string,
	destination: string,
	startTime: Date,
	vehicleId: string,
	capacity: number,
	riderSubs: string[]
): Promise<Ride> {
	const id = await putRide(
		driverSub,
		origin,
		destination,
		startTime,
		vehicleId,
		capacity,
		riderSubs
	);

	let ride: Ride = {
		id: id,
		driverSub: driverSub,
		origin: origin,
		destination: destination,
		startTime: startTime,
		vehicleId: vehicleId,
		capacity: capacity,
		riderSubs: riderSubs,
	};
	return ride;
}

async function putRide(
	driverSub: string,
	origin: string,
	destination: string,
	startTime: Date,
	vehicleId: string,
	capacity: number,
	riderSubs: string[]
): Promise<string> {
	// Add a new document in collection "rides"
	const rideRef = await addDoc(collection(db, "rides"), {
		driverSub: driverSub,
		origin: origin,
		destination: destination,
		startTime: startTime,
		vehicleId: vehicleId,
		capacity: capacity,
		riderSubs: riderSubs,
	});

	return rideRef.id;
}
