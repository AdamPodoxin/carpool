import React, { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

const AddressFill = () => {
    const [address, setAddress] = useState("");


    function onPlaceSelect(value: any) {
        console.log(value);
    }

    function onSuggectionChange(value: any) {
        console.log(value);
    }

    return <GeoapifyContext apiKey="1a40c040eb6d4f84b23a8f7fa6655801">
        <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
            lang={'en'}
            value={address}
        />
    </GeoapifyContext>
}

export default AddressFill