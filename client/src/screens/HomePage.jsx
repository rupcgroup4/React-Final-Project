import React, { useState, useContext } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ChoosePlayerModal from '../components/HomePage/ChoosePlayerModal';
import MapAnimation from '../components/HomePage/MapAnimation';
import Player2LoginModal from '../components/HomePage/Player2LogInModal';
import { PlayersContext } from '../context/PlayersContextProvider';

const HomePage = () => {
  // determine if ChoosePlayerModal is open or not
  const [isChoosePlayerModal, setIsChoosePlayerModal] = useState(false);
  //
  const [isPlayer2LoginModal, setIsPlayer2LoginModal] = useState(false);

  const { players, updatePlayer } = useContext(PlayersContext);

  return (
    <Box mx={5} mt={2}>
      <Typography
        variant='h2'
        textAlign={'center'}
        style={{
          fontFamily: '"Caveat", "cursive"',
        }}
      >
        Catch Me If You Can!
      </Typography>
      <Grid
        container
        spacing={5}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        mt={2}
      >
        <Grid item xs={6}>
          <MapAnimation />
        </Grid>
        <Grid item xs={4}>
          <ChoosePlayerModal
            open={isChoosePlayerModal}
            setOpen={setIsChoosePlayerModal}
            setIsPlayer2LoginModal={setIsPlayer2LoginModal}
          />
        </Grid>
      </Grid>
      <Player2LoginModal
        open={isPlayer2LoginModal}
        setOpen={setIsPlayer2LoginModal}
      />
    </Box>
  );
};

export default HomePage;
