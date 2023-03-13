import React from 'react';
import { Box, Typography } from '@mui/material';

const Path = ({ path }) => {
  console.log(path);
  return (
    <Box m={2}>
      {path.map((airPort) => (
        <Typography key={airPort}>{airPort}</Typography>
      ))}
    </Box>
  );
};

export default Path;
