import { db } from "./lib/firebase";
import { Ride } from "./lib/types";
import { addDoc, collection } from "firebase/firestore"; 

export async function createRide(
    driverSub: string,
    driverName: string,
    origin: string,
    destination: string,
    startTime: Date,
    vehicleId: string,
    capacity: number,
    riderNames: string[]): Promise<Ride>
{
    const id = await putRide(
        driverSub,
        origin,
        destination,
        startTime,
        vehicleId,
        capacity,
        riderNames)

    let ride: Ride =
    {
        id: id,
        driverSub: driverSub,
        driverName: driverName,
        origin: origin,
        destination: destination,
        startTime: startTime,
        vehicleId: vehicleId,
        capacity: capacity,
        riderNames: riderNames,
        closed: false
    }
    return ride
}

async function putRide(driverSub: string,
    origin: string,
    destination: string,
    startTime: Date,
    vehicleId: string,
    capacity: number,
    riderNames: string[]) : Promise<string>
{
    // Add a new document in collection "rides"
    const rideRef = await addDoc(collection(db, "rides"), {
        driverSub: driverSub,
        origin: origin,
        destination: destination,
        startTime: startTime,
        vehicleId: vehicleId,
        capacity: capacity,
        riderNames: riderNames
    });

    return rideRef.id
}