import React from 'react';
import { Box, Typography } from '@mui/material';

const GameObjective = () => {
  return (
    <Box>
      <Typography variant='subtitle1'>Game Objective:</Typography>
      <Typography variant='body1'>
        The objective of the spy is to reach the target airport without getting
        caught by the agents.
      </Typography>
      <Typography variant='body1'>
        The objective of the agents is to catch the spy before he reaches the
        target airport.
      </Typography>
    </Box>
  );
};

export default GameObjective;
