import React, { useState, useContext, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import { Avatar } from '@mui/material';
import { PlayersContext } from '../../context/PlayersContextProvider';
import usePlayersStore from '../../store/playerStore';
import { AvatarGenerator } from 'random-avatar-generator';

export const GoogleLogout = () => {
  const { player1 } = usePlayersStore();

  const generator = new AvatarGenerator();
  const [avatar, setAvatar] = useState(generator.generateRandomAvatar());

  useEffect(() => {
    if (player1 === null) {
      googleLogout();
    }
  }, [player1]);

  return player1 ? (
    <div>
      <Avatar src={avatar} />
    </div>
  ) : (
    <div>
      <Avatar src='/static/images/avatar/2.jpg' />
    </div>
  );
};
export default GoogleLogout;
