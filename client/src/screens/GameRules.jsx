import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Header from '../components/Header';
import GameObjective from '../components/GameRules/GameObjective';
import IconsLine from '../components/GameRules/IconsLine';
import GamePlay from '../components/GameRules/GamePlay';

const GameRules = () => {
  return (
    <Box
      m={'auto'}
      mt={3}
      border={1}
      borderRadius={15}
      width={{ xs: '90%', md: '60%' }}
      p={5}
    >
      <Box display={'flex'} justifyContent={'space-between'}>
        <IconsLine />
        <Box width={'80%'}>
          <Header header={'Game Rules'} />
          <Grid
            container
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignContent={'center'}
            mt={5}
            spacing={2}
          >
            <Grid item>
              <Typography variant='h6'>
                Number of players: 3 (1 spy, 2 agents)
              </Typography>
            </Grid>
            <Grid item>
              <GameObjective />
            </Grid>
            <Grid item>
              <GamePlay />
            </Grid>
          </Grid>
        </Box>
        <IconsLine />
      </Box>
    </Box>
  );
};

export default GameRules;
