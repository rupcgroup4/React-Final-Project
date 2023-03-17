import React, { useState, useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { PlayersContext } from '../../context/PlayersContextProvider';
import { useNavigate } from 'react-router-dom';
import usePlayersStore from '../../store/playerStore';

export const GoogleSignIn = () => {
  const { player1Login } = usePlayersStore();

  const navigate = useNavigate();

  //Sign in
  const onSuccess = (res) => {
    let userObject = jwt_decode(res.credential);
    const user = {
      FirstName: userObject.given_name,
      LastName: userObject.family_name,
      Email: userObject.email,
    };
    player1Login(user);
    navigate('/');
  };

  const onError = (res) => {
    console.log(res);
  };
  return (
    <div style={{ marginTop: '1rem' }}>
      <GoogleLogin onSuccess={onSuccess} onError={onError} width='500' />
    </div>
  );
};
export default GoogleSignIn;
