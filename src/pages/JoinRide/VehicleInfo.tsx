import { Vehicle } from "../../lib/types";

type VehicleInfoProps = {
    vehicle: Vehicle;
}

const VehicleInfo = ({vehicle}: VehicleInfoProps) => {
    return (
        <>
            <h2>Vehicle info</h2>
            <p>
                License Plate: {vehicle.licensePlate}<br/>
                Colour: {vehicle.color}<br/>
                Make: {vehicle.make}<br/>
                Model: {vehicle.model}<br/>
            </p>
        </>
    )
}

export default VehicleInfo;