import React from 'react'
import Parkimage from './Park.png'
import RedButton from './components/RedButton'
function Park() {
    return (
        <div>
            <h1>Park Your Car</h1>
            <img src={Parkimage} />
            <center><RedButton  Link={'//'} txt={"Park Here"} /></center>
            <center><RedButton  Link={'/find_your_car'} txt={"Find Your Car"} /></center>
        </div>
        
    )
}

export default Park
