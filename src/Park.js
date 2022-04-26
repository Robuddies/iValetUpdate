import React from 'react';
import Ticket from '@material-ui/icons/ConfirmationNumber';
import {
    GoogleMap,
    useLoadScript,
    KmlLayer,
    Marker,
} from '@react-google-maps/api';
import {
    createMuiTheme,
    ThemeProvider,
    makeStyles,
} from '@material-ui/core/styles';
import Grid from './components/Grid';
import apis from './backend/api';
import { useLocation } from 'react-router-dom';

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

function getLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            return userLocation;
        });
    } else {
        alert('Your browser may not support geolocation.');
    }
}

const mapContainerStyle = {
    width: '320px',
    height: '200px',
};
const center = {
    lat: 33.776222,
    lng: -84.403926,
};

const Park = (props) => {
    const classes = styles();
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBrMNCKpLCtGTbMbC5LhQTtrq3Y727HE84',
    });
    const { state } = useLocation();
    // alert(state);
    if (loadError) return 'Error loading Maps';
    if (!isLoaded) return 'Loading Maps';

    return (
        <div>
            <h2 style={{ fontFamily: 'Montserrat', margin: 50 }}>
                Parking spot #{state.lotId}, will be marked as occupied on
                arrival. Please don't use another spot.
            </h2>
            <center>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={20}
                    center={center}
                >
                    <KmlLayer url='https://raw.githubusercontent.com/Robuddies/iValetUpdate/backend/KMLs/ParkCrc1.kml' />

                    <Marker position={getLocation()} />
                </GoogleMap>
            </center>
            <h2 style={{ fontFamily: 'Montserrat', margin: 50 }}>
                Don't remember where you parked? Click below to jog your memory.
            </h2>
            <div className={`${classes.grid}`}>
                <Grid
                    icon={
                        <Ticket
                            style={{
                                fill: '#c32a2a',
                                height: '125',
                                width: '125',
                            }}
                        />
                    }
                    title=''
                    btnNavLink='/find_your_car'
                    btnTitle='Find Your Car'
                />
            </div>
        </div>
    );
};

export default Park;
