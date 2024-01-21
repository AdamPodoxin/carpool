export type Ride = {
    id: string,
    driverSub: string,
    origin: string,
    destination: string,
    startTime: Date,
    vehicleId: string,
    capacity: number,
    riderSubs: string[],
    closed: boolean
}