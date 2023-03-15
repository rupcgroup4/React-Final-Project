import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const GameDescribe = ({ resetGame, message, steps }) => {
  return (
    <Box m={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Typography>{message}</Typography>
      <Box mx={5}>
        <Button variant='contained' size='large' onClick={resetGame}>
          Reset Game
        </Button>
      </Box>
      <Typography>Steps played: {steps}</Typography>
    </Box>
  );
};

export default GameDescribe;
