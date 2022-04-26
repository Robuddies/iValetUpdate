import React from 'react';
import { useState } from 'react';
import {
    createMuiTheme,
    ThemeProvider,
    makeStyles,
} from '@material-ui/core/styles';
import StripeContainer from './components/StripeContainer';
import { useLocation } from 'react-router-dom';
import apis from './backend/api';

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
    const [fee, setFee] = useState(0);

    const {
        state: { state },
    } = useLocation();

    // alert(state.licence);
    async function getFee() {
        return apis
            .getFeeByLicence(state.licence)
            .then((response) => {
                const { data } = response;
                // alert(data.fee);
                setFee(data.fee);
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.message);
            });
    }

    getFee();
    // alert(fee);

    return (
        <div>
            <center>
                {showItem ? (
                    <StripeContainer />
                ) : (
                    <>
                        <h2 style={{ fontFamily: 'Montserrat' }}>${fee}</h2>
                        <button
                            style={{ fontFamily: 'Montserrat' }}
                            onClick={() => setShowItem(true)}
                        >
                            Pay
                        </button>
                    </>
                )}
            </center>
        </div>
    );
}

export default Cart;
