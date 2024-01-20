export type Ride = {
    id: string,
    driverSub: string,
    origin: string,
    destination: string,
    startTime: Date,
    vehicleId: string,
    capacity: number,
    riderSubs: string[]
}

export type Vehicle = {
	ownerSub: string;
	licensePlate: string;
	color: string;
	make: string;
	model: string;
};
