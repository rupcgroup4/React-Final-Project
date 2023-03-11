import React, { useState, createContext } from 'react';

export const PlayersContext = createContext();

const PlayersContextProvider = (props) => {
  //Initial players state
  const [players, setPlayers] = useState({
    player1: {},
    player2: {},
  });

  const updatePlayers = (players) => {
    setPlayers(players);
  };

  return (
    <PlayersContext.Provider value={{ players, updatePlayers }}>
      {props.children}
    </PlayersContext.Provider>
  );
};

export default PlayersContextProvider;
