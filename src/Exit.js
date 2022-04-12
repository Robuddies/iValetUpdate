import React from 'react';
import Exitimage from './Exit.png';
import LogoutButton from './components/LogoutButton';
function Exit() {
    return (
        <div>
            <h1>Exit the Parking Lot</h1>
            <img src={Exitimage} />
            <h1>Thank you for parking with us!</h1>
            <LogoutButton />
        </div>
    );
}

export default Exit;
