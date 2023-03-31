import React from 'react';
import {
  Box,
  Button,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const GameDescribe = ({ resetGame, steps, turn }) => {
  return (
    <Box
      border={1}
      sx={{
        boxShadow: 2,
        borderRadius: '16px',
      }}
      m={2}
      display={{ xs: 'block', md: 'flex' }}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Box display={'flex'} alignItems={'center'} p={3}>
        <Box>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <SyncIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`Player turn: ${turn}`} />
          </ListItem>
        </Box>
        <Box>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FlightTakeoffIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`Steps played: ${steps}`} />
          </ListItem>
        </Box>
      </Box>
      <Box mx={5} textAlign={'center'} mb={{ xs: 2, md: 0 }}>
        <Button variant='contained' size='large' onClick={resetGame}>
          Reset Game
        </Button>
      </Box>
    </Box>
  );
};

export default GameDescribe;
