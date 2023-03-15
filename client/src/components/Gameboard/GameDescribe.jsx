import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const GameDescribe = ({ resetGame, message, steps, turn }) => {
  return (
    <Box m={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Box>
        <Typography>Player turn: {turn}</Typography>
        <Typography>Steps played: {steps}</Typography>
      </Box>
      <Box mx={5}>
        <Button variant='contained' size='large' onClick={resetGame}>
          Reset Game
        </Button>
      </Box>
      <Typography>{message}</Typography>
    </Box>
  );
};

export default GameDescribe;
