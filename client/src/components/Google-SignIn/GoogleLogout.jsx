import React, { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { Avatar } from "@mui/material";


export const GoogleLogout = (props) => {
  const logout = () => {
    googleLogout();
  };
  return (
    <div>
      <Avatar src="/static/images/avatar/2.jpg" />
    </div>
  );
};
export default GoogleLogout;
