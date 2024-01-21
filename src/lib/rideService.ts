import { db } from "./firebase";
import { Ride } from "./types";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"; 

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

async function putRide(
    driverSub: string,
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

export async function getRidesAsDriver(
    driverSub: string) : Promise<Ride[]>
{
    const q = query(collection(db, "rides"), where("driverSub", "==", driverSub));

    const querySnapshot = await getDocs(q);
    let rides: Ride[] = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        let ride: Ride = doc.data() as Ride;
        rides.push(ride);
    });
    return rides;
}

export async function getRidesAsRider(
    riderSub: string) : Promise<Ride[]>
{
    const q = query(collection(db, "rides"), where("riderSubs", "array-contains", riderSub));

    const querySnapshot = await getDocs(q);
    let rides: Ride[] = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        let ride: Ride = doc.data() as Ride;
        rides.push(ride);
    });
    return rides;
}