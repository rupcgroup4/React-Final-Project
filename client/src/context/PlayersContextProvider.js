import React, { useState, createContext } from 'react';

export const PlayersContext = createContext();

const PlayersContextProvider = (props) => {
  //Initial players state
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const player1Login = (player) => {
    setPlayer1(player);
  };

  const player2Login = (player) => {
    setPlayer2(player);
  };

  const updatePlayersRole = (player1Role, player2Role) => {
    setPlayer1({ ...player1, role: player1Role });
    setPlayer2({ ...player2, role: player2Role });
  };

  return (
    <PlayersContext.Provider
      value={{
        player1,
        player2,
        player1Login,
        updatePlayersRole,
        player2Login,
      }}
    >
      {props.children}
    </PlayersContext.Provider>
  );
};

export default PlayersContextProvider;
