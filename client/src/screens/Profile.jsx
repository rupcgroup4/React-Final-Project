import React from 'react';
import { useContext } from 'react';
import { PlayersContext } from '../context/PlayersContextProvider';
import UsersGamesData from '../components/Profile/UsersGamesData';
import UsesTotalGameStats from '../components/Profile/UsersTotalGameStats';
import { Box, Typography } from '@mui/material';
import useUserStore from '../store/playerStore';

//temp game data hardcoded
const gameData = [
  {
    gameId: 1,
    date: '1.1.23',
    playAs: 0, //0=spy, 1=agents
    opponent: 'stav',
    win: 1,
    totalSteps: 12,
  },
  {
    gameId: 2,
    date: '1.1.23',
    playAs: 0, //0=spy, 1=agents
    opponent: 'Moshe',
    win: 1,
    totalSteps: 10,
  },
  {
    gameId: 3,
    date: '1.1.23',
    playAs: 1, //0=spy, 1=agents
    opponent: 'Yoav',
    win: 0,
    totalSteps: 7,
  },
  {
    gameId: 4,
    date: '1.1.23',
    playAs: 0, //0=spy, 1=agents
    opponent: 'Maya',
    win: 1,
    totalSteps: 4,
  },
  {
    gameId: 5,
    date: '1.1.23',
    playAs: 1, //0=spy, 1=agents
    opponent: 'Shira',
    win: 0,
    totalSteps: 14,
  },
];

//temp
const usersGameStats = {
  gamesPlayed: 2,
  gamesWon: 1,
  winPersentage: 50,
};

const Profile = () => {
  const { player1 } = useUserStore();
  console.log('player1= ', player1);

  return (
    <Box>
      <Typography
        variant='h2'
        textAlign={'center'}
        mt={3}
        mb={3}
        style={{
          fontFamily: '"Caveat", "cursive"',
        }}
      >
        Profile{' '}
        {player1 ? ' - ' + player1.FirstName + ' ' + player1.LastName : ''}
      </Typography>

      <UsesTotalGameStats usersGameStats={usersGameStats} />
      <UsersGamesData gameData={gameData} />
    </Box>
  );
};

export default Profile;
