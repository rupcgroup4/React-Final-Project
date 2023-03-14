import React from 'react';
import { Box, Typography, Switch } from '@mui/material';

const ToggleAgents = ({ isAgent1Show, changeAgent }) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'flex-end'}
      position={'relative'}
      top={50}
      right={40}
      zIndex={1}
      mt={-4.7}
    >
      <Typography mr={1}>1</Typography>
      <Switch onChange={changeAgent} checked={!isAgent1Show} m={0} />
      <Typography>2</Typography>
    </Box>
  );
};

export default ToggleAgents;
