export type Vehicle = {
	ownerSub: string;
	licensePlate: string;
	color: string;
	make: string;
	model: string;
	capacity: number;
};

export type Ride = {
	id: string;
	driverSub: string;
	driverName: string;
	origin: string;
	destination: string;
	startTime: Date;
	vehicleId: string;
	capacity: number;
	riderNames: string[];
	riderSubs: string[];
	closed: boolean;
};
