import React from 'react'
import { useState } from 'react';
import {
    createMuiTheme,
    ThemeProvider,
    makeStyles,
} from '@material-ui/core/styles';
import StripeContainer from './components/StripeContainer';

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
    const [showItem, setShowItem] = useState(false);

    return (
        <div>
            <h1>Once you pay, feel free to exit the lot!</h1>
            <center>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
					<h3>$10.00</h3>
					<button onClick={() => setShowItem(true)}>Pay</button>
				</>
			)}
            </center>
          
        </div>
        
    );
}

export default Cart
