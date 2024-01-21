import { db } from "./firebase";
import { Ride } from "./types";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";

export async function createRide(
	driverSub: string,
	driverName: string,
	origin: string,
	destination: string,
	startTime: Date,
	vehicleId: string,
	capacity: number,
	riderNames: string[],
	riderSubs: string[]
): Promise<Ride> {
	const id = await putRide(
		driverSub,
		origin,
		destination,
		startTime,
		vehicleId,
		capacity,
		riderNames,
		riderSubs
	);

	let ride: Ride = {
		id,
		driverSub,
		driverName,
		origin,
		destination,
		startTime,
		vehicleId,
		capacity,
		riderNames,
		riderSubs,
		closed: false,
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
	riderNames: string[],
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
		riderNames: riderNames,
		riderSubs,
	});

	return rideRef.id;
}

export const getAllRides = async () => {
	const querySnapshot = await getDocs(collection(db, "rides"));
	const rides = querySnapshot.docs
		.filter((doc) => {
			const data = doc.data() as Ride;
			return data.capacity > 0 && !data.closed;
		})
		.map((doc) => {
			const data = doc.data();
			const ride = data as Ride;

			ride.id = doc.id;
			ride.startTime = (data.startTime as Timestamp).toDate();

			ride.startTime;

			return ride;
		});
	return rides;
};
