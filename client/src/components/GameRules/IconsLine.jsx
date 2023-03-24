import React from 'react';
import { Stack } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import GamepadIcon from '@mui/icons-material/Gamepad';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import FlightIcon from '@mui/icons-material/Flight';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FlightLandIcon from '@mui/icons-material/FlightLand';
const IconsLine = () => {
  return (
    <Stack>
      <FlightTakeoffIcon />
      <GamepadIcon />
      <SportsEsportsIcon />
      <FlightIcon />
      <VideogameAssetIcon />
      <SportsBasketballIcon />
      <AirplaneTicketIcon />
      <SportsCricketIcon />
      <SmartToyIcon />
      <SupportAgentIcon />
      <FlightLandIcon />

      {/* Second time */}
      <FlightTakeoffIcon />
      <GamepadIcon />
      <SportsEsportsIcon />
      <FlightIcon />
      <VideogameAssetIcon />
      <SportsBasketballIcon />
      <AirplaneTicketIcon />
      <SportsCricketIcon />
      <SmartToyIcon />
      <SupportAgentIcon />
      <FlightLandIcon />
    </Stack>
  );
};

export default IconsLine;
