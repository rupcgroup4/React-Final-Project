import React, { useState, useContext } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import ChoosePlayerModal from '../components/HomePage/ChoosePlayerModal';
import MapAnimation from '../components/HomePage/MapAnimation';
import Player2LoginModal from '../components/HomePage/Player2LogInModal';
import SpyAgentCards from '../components/HomePage/SpyAgentCards';
import Header from '../components/Header';

const HomePage = () => {
  // determine if ChoosePlayerModal is open or not
  const [isChoosePlayerModal, setIsChoosePlayerModal] = useState(false);
  //
  const [isPlayer2LoginModal, setIsPlayer2LoginModal] = useState(false);

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const cardHoverStyle = {
    transform: isHover ? [{ scale: 2 }] : 0,
    boxShadow: isHover
      ? '0 5px 5px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)'
      : '1px 1px 1px #FFFFFF',
  };

  return (
    <Box mx={5}>
      <Grid
        container
        spacing={1}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        mt={2}
      >
        <Grid item xs={6}>
          <Card
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={cardHoverStyle}
          >
            <CardContent>
              <MapAnimation />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Header header={'Catch Me If You Can!'} />
          <SpyAgentCards />
          <Box style={{ width: '50vh', margin: '0 auto' }}>
            <ChoosePlayerModal
              open={isChoosePlayerModal}
              setOpen={setIsChoosePlayerModal}
              setIsPlayer2LoginModal={setIsPlayer2LoginModal}
            />
          </Box>
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
