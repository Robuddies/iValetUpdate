import React from 'react'
import {
    createMuiTheme,
    ThemeProvider,
    makeStyles,
} from '@material-ui/core/styles';
import Grid from './components/Grid';
import CloseIcon from '@material-ui/icons/EmojiTransportation'

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


function Cart() {
    const classes = styles();
    return (
        <div>
            <h1>Once you pay, feel free to exit the lot!</h1>
            <center>
                <h1>Cart stuff</h1>
            </center>
            <div className={`${classes.grid} ${classes.bigSpace}`}>
                <Grid
                    icon={
                        <CloseIcon
                            style={{
                                fill: '#c32a2a',
                                height: '125',
                                width: '125',
                            }}
                        />
                    }
                    title=''
                    btnNavLink='/exit_parking_lot'
                    btnTitle='Good Bye!'
                />
            </div>           
        </div>
        
    );
}

export default Cart
