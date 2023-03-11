import React, { useEffect, useState } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChoosePlayerModal from '../components/HomePage/ChoosePlayerModal';

const HomePage = () => {
  // determine if ChoosePlayerModal is open or not
  const [open, setOpen] = useState(false);

  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  useEffect(() => {
    if (player1) {
      alert('player 2 login?');
    }
  }, [player1]);

  return (
    <Box m={5} width={'100%'} height={'100vh'}>
      <Typography variant='h3' textAlign={'center'}>
        Catch Me If You Can!
      </Typography>
      <Grid
        container
        spacing={5}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Grid item xs={6}>
          <img
            src='/map.png'
            alt=''
            style={{ width: '100%', border: '1px solid black' }}
          />
        </Grid>
        <Grid item xs={4}>
          <ChoosePlayerModal
            open={open}
            setOpen={setOpen}
            setPlayer1={setPlayer1}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
