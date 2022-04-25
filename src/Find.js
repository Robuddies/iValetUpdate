import React from 'react'
import {GoogleMap, useLoadScript, KmlLayer,Marker} from "@react-google-maps/api";
import {
    createMuiTheme,
    ThemeProvider,
    makeStyles,
} from '@material-ui/core/styles';
import Grid from './components/Grid';
import ShoppingCartIcon from '@material-ui/icons//ShoppingCart';

const theme = createMuiTheme({
    pallette: {
        primary: {
            main: '#c7d8ed',
        },
        secondary: {
            main: '#d80032',
        },
    },
    typography: {
        fontFamily: ['Montserrat'],
        h4: {
            fontWeight: 600,
            fontSize: 28,
            lineHeight: '2rem',
        },
        h5: {
            fontWeight: 100,
            lineHeight: '2rem',
        },
    },
});


const styles = makeStyles({
    wrapper: {
        width: '65%',
        margin: 'auto',
        textAlign: 'center',
    },
    bigSpace: {
        marginTop: '5rem',
    },
    littleSpace: {
        marginTop: '2.5rem',
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
});


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



function Find() {
    const classes = styles();
    const {isLoaded,loadError} = useLoadScript({
        googleMapsApiKey:"AIzaSyBrMNCKpLCtGTbMbC5LhQTtrq3Y727HE84"
    });
    if (loadError) return "Error loading Maps";
    if (!isLoaded) return "Loading Maps";


    return (
        <div>
            <h1>Here's your car! Be careful of oncoming traffic.</h1>
            <center>
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle} 
                    zoom={20} 
                    center={center} 
                >
                 <KmlLayer url="https://raw.githubusercontent.com/Robuddies/iValetUpdate/backend/KMLs/FindCrc1.kml" />       
                
                <Marker position={getLocation()} />
                </GoogleMap>
            </center>
            <h1>Before you go, we'll have to charge you a fee for parking with us.</h1>
            <div className={`${classes.grid} ${classes.bigSpace}`}>
                <Grid
                    icon={
                        <ShoppingCartIcon
                            style={{
                                fill: '#c32a2a',
                                height: '125',
                                width: '125',
                            }}
                        />
                    }
                    title=''
                    btnNavLink='/pay'
                    btnTitle='Pay before you go!'
                />
            </div>           
        </div>
        
    );
}

export default Find
