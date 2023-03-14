import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const GameDescribe = ({ resetGame, message }) => {
  return (
    <Box m={1} alignItems={'center'} textAlign={'center'}>
      <Typography>{message}</Typography>
      <Button variant='contained' size='large' onClick={resetGame}>
        Reset Game
      </Button>
    </Box>
  );
};

export default GameDescribe;
