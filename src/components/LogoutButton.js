import React from 'react'
import { GoogleLogout } from 'react-google-login';

const client_Id = '817198085077-dc3u322nbisnl1llu3q72c65gkjmacpq.apps.googleusercontent.com';

function LogoutButton() {
    const onSuccess = () => {
        console.log("Log out successful!");
    }
    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={client_Id}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default LogoutButton
