import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode";

export const GoogleSignIn = () => {
  const [user, setUser] = useState({});

  //Sign in
  const onSuccess = (res) => {
    let userObject = jwt_decode(res.credential);
    console.log(userObject);
    setUser(userObject);

  };

  const onError = (res) => { 
    console.log(res);
  }
  return (
    <div style={{marginTop:"1rem"}}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        size="large"
        locale="en"
        width="500"
   
      />
    </div>
  );
};
export default GoogleSignIn;
