import { useContext, useEffect, useCallback, useState } from 'react';
import { PlayersContext } from '../context/PlayersContextProvider';
import UsersGamesData from '../components/Profile/UsersGamesData';
import UsesTotalGameStats from '../components/Profile/UsersTotalGameStats';
import { Box, Typography } from '@mui/material';
import usePlayersStore from '../store/playerStore';
import axios from 'axios';
import { API_URL } from '../utils/constants';

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
  const { player1 } = usePlayersStore();
  const [gameData, setGameData] = useState(null);
  const [wins, setWins] = useState(0);
  console.log('player1= ', player1);

  const getUserData = useCallback(async () => {
    const email = player1.Email;
    const res = await axios
      .post(`${API_URL}games/player`, {
        email,
      })
      .catch((e) => {
        alert(e);
      });
    console.log(res);

    const gameData = res.data.map((row) => {
      const gameId = row.Id;
      const date = row.Date.split(' ')[0];
      const playAs = player1.Email === row.Spy ? 0 : 1;
      const opponent = playAs === 0 ? row.Agents : row.Spy;
      const win = player1.Email === row.Winner;
      const steps = row.Steps;

      if (win) setWins((prev) => prev + 1);

      return {
        gameId: gameId,
        date: date,
        playAs: playAs, //0=spy, 1=agents
        opponent: opponent,
        win: win,
        totalSteps: steps,
      };
    });

    setGameData(gameData);
  }, [player1?.Email]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  console.log(gameData?.length);
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

      <UsesTotalGameStats wins={wins} totalGames={gameData?.length} />
      <UsersGamesData gameData={gameData} />
    </Box>
  );
};

export default Profile;
