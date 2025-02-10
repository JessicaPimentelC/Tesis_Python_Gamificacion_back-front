import { GoogleLogin } from "@react-oauth/google";
import decodejson from "../utils/decodejson";
import React from 'react';

export default function Loginsesion() {
    function handleError() {
        console.log("Inicio de sesión fallido");
    }
    function handleSuccess(credentialResponse) {
        console.log("credentialResponse", credentialResponse);
        if (credentialResponse.credential) {
            const { payload } = decodejson(credentialResponse.credential);
            console.log("payload", payload);
        }
    }
    return (
        <div>
            <GoogleLogin onError={handleError} onSuccess={handleSuccess} />
        </div>
    );
}
