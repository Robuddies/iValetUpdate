import React from 'react'
import Exitimage from './Exit.png'
import RedButton from './components/RedButton'
function Exit() {
    return (
        <div>
            <h1>Exit the Parking Lot</h1>
            <img src={Exitimage} />
            <h2>Thank you for parking with us!</h2>
            <center><RedButton  Link={'//'} txt={"Logout"} /></center>
        </div>

    )
}

export default Exit
