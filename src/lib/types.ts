export type Ride = {
    id: string,
    driverSub: string,
    driverName: string,
    origin: string,
    destination: string,
    startTime: Date,
    vehicleId: string,
    capacity: number,
    riderNames: string[],
    closed: boolean
}