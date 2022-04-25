import React from 'react';
import LogoutButton from './components/LogoutButton';
import {GoogleMap, useLoadScript, KmlLayer,Marker} from "@react-google-maps/api";




function getLocation(){
    if('geolocation' in navigator) {
        navigator.geolocation.watchPosition((position) => {
           const userLocation = {
               lat: position.coords.latitude,
               lng: position.coords.longitude,
           };
           return userLocation;
       })
    } else {
       alert("Your browser may not support geolocation.")
    }
    
}

const mapContainerStyle ={
    width:'320px',
    height:'200px',
};
const center = {
    lat:33.776222,
    lng:-84.403926
}
function Exit() {
    const {isLoaded,loadError} = useLoadScript({
        googleMapsApiKey:"AIzaSyBrMNCKpLCtGTbMbC5LhQTtrq3Y727HE84"
    });
    if (loadError) return "Error loading Maps";
    if (!isLoaded) return "Loading Maps";


    return (
        <div>
            <h1>Thank you for parking with us! Exit the Parking Lot.</h1>
            <center>
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle} 
                    zoom={20} 
                    center={center} 
                >
                 <KmlLayer url="https://raw.githubusercontent.com/Robuddies/iValetUpdate/backend/KMLs/ExitCrc1.kml" />       
                
                <Marker position={getLocation()} />
                </GoogleMap>
            </center>
            <LogoutButton />
          
        </div>
        
    );
}

export default Exit;
