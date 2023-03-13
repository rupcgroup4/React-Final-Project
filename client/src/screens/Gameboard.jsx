import React, { useContext } from 'react';
import { PlayersContext } from '../context/PlayersContextProvider';

const Gameboard = () => {
  const { player2 } = useContext(PlayersContext);
  console.log(player2);
  return <div>Gameboard</div>;
};

export default Gameboard;
