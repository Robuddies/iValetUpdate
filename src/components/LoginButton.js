import React from 'react'
import { GoogleLogin } from 'react-google-login';

const client_Id = '817198085077-dc3u322nbisnl1llu3q72c65gkjmacpq.apps.googleusercontent.com';

function LoginButton(){
    const onSuccess = (res) => {
        console.log("Login success! Current User: ", res.profileObj);
    }

    const onFailure = (res) =>{
        console.log("Login failed! res:", res);
    }
    return(
        <div id="signInButton">
            <GoogleLogin
                clientId={client_Id}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}
export default LoginButton
