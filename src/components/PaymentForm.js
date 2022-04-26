import React, {useState} from 'react'
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import axios from "axios"
import Grid from './Grid';
import CloseIcon from '@material-ui/icons/EmojiTransportation'
import {
    createMuiTheme,
    ThemeProvider,
    makeStyles,
} from '@material-ui/core/styles';

const CARD_OPTIONS ={
    iconStyle: "solid",
    style:{
        base:{
            iconColor:'#c4f0ff',
            color: '#000',
            fontWeight: 500,
            fontFamily: 'Montserrat',
            fontSize:'16px',
            fontSmoothing:"anti-aliased",
            ":-webkit-autofill":{color: '#fce883'},
            "::placeholder": {color:"87bbfd"}
        },
        invalid:{
            iconColor:"#ffc7ee",
            color:"#ffc7ee"
        }
    }
}
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

function PaymentForm() {
    const classes = styles();
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/payment", {
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
       <div>
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
                    btnTitle='Exit the Parking Lot'
                />
            </div>         
       </div> 
        }
            
        </>
    )
}

export default PaymentForm

