import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51KsetdBp1OS6vtkrSZPygIUa0W8kfBDjU6vV82J8vlGJxgfRaRRPRH3EiyqFPIQJs0VEQPLcxlqftHsxJtpC0MCM00n0fZ4RU2"
const stripeTestPromise=loadStripe(PUBLIC_KEY)

function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}

export default StripeContainer
