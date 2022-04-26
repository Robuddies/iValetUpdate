import React from 'react';
import {
    createMuiTheme,
    ThemeProvider,
    makeStyles,
} from '@material-ui/core/styles';
import ParkingForm from './components/ParkingForm';
import Grid from './components/Grid';
import Key from '@material-ui/icons/VpnKey';


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


function Details() {
    const classes = styles();
    return (
        <div>
            <h2 style={{ fontFamily: "Montserrat", margin:50 }}>Input Details</h2>
            <ParkingForm></ParkingForm>
            <div className={`${classes.grid} `}>
                <Grid
                    icon={
                        <Key
                            style={{
                                fill: '#c32a2a',
                                height: '125',
                                width: '125',
                            }}
                        />
                    }
                    title=''
                    btnNavLink='/park_your_car'
                    btnTitle='Park Your Car'
                />
            </div>
        </div>
    );
}

export default Details;
