import { Vehicle } from "../../lib/types";

type VehicleInfoProps = {
    vehicle: Vehicle;
}

const VehicleInfo = ({vehicle}: VehicleInfoProps) => {
    return (
        <>
            <h2>Vehicle info</h2>
            <div className="infoContainer">
                <p className="column-2">
                    <b>License Plate:</b><br/>
                    <b>Colour:</b><br/>
                    <b>Make:</b><br/>
                    <b>Model:</b><br/>
                </p>
                <p className="column-2">
                    {vehicle.licensePlate}<br/>
                    {vehicle.color}<br/>
                    {vehicle.make}<br/>
                    {vehicle.model}<br/>
                </p>
            </div>
        </>
    )
}

export default VehicleInfo;