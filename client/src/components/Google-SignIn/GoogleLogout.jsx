import React, { useState, useContext, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import { Avatar } from "@mui/material";
import { PlayersContext } from "../../context/PlayersContextProvider";

export const GoogleLogout = () => {
  const { player1 } = useContext(PlayersContext);
  const logout = () => {
    googleLogout();
  };
  return (
    player1 ?
    <div>
      <Avatar src={player1.picture} />
    </div> 
    : 
    <div>
    <Avatar src="/static/images/avatar/2.jpg" />
  </div> 
  );
};
export default GoogleLogout;
