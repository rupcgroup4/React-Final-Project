import { useEffect, useCallback, useState } from 'react';
import UsersGamesData from '../components/Profile/UsersGamesData';
import UsesTotalGameStats from '../components/Profile/UsersTotalGameStats';
import { Box, Typography } from '@mui/material';
import usePlayersStore from '../store/playerStore';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const Profile = () => {
  const { player1 } = usePlayersStore();
  const [gameData, setGameData] = useState(null);
  const [wins, setWins] = useState(0);

  const getUserData = useCallback(async () => {
    const email = player1?.Email;
    const res = await axios
      .post(`${API_URL}/players/getPlayerGames`, {
        email,
      })
      .catch((e) => {
        alert(e);
      });

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
