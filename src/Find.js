import React from 'react'
import Findimage from './find.png'
import RedButton from './components/RedButton'
function Find() {
    return (
        <div>
            <h1>Find your Car</h1>
            <img src={Findimage} />
            <center><RedButton  Link={'//'} txt={"Pay Fee"} /></center>
            <center><RedButton  Link={'/exit_parking_lot'} txt={"Exit Parking Lot"} /></center>
        </div>
        
    )
}

export default Find
