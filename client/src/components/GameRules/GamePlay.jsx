import React from 'react';
import { Box, Typography } from '@mui/material';

const GamePlay = () => {
  return (
    <Box>
      <Typography variant='subtitle1'>Game Play:</Typography>
      <Typography variant='body1'>
        1. The game map is the map of the world with dots representing airports.
      </Typography>
      <Typography variant='body1'>
        2. Each player can only move to an airport that is directly connected to
        the airport he is currently on by a flight.
      </Typography>
      <Typography variant='body1'>
        3. The spy player moves first and chooses an airport to move to.
      </Typography>
      <Typography variant='body1'>
        4. After the spy moves, each of the agent players takes their turn to
        move.
      </Typography>
      <Typography variant='body1'>
        5. The game ends when either the spy wins by reaching the target airport
        or the agents win by catching the spy.
      </Typography>
    </Box>
  );
};

export default GamePlay;
