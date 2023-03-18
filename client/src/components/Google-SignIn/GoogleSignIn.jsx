import React, { useState, useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { PlayersContext } from '../../context/PlayersContextProvider';
import { useNavigate } from 'react-router-dom';
import usePlayersStore from '../../store/playerStore';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

export const GoogleSignIn = (props) => {
  const { player1Login, player2Login, player1 } = usePlayersStore();

  const navigate = useNavigate();

  //Sign in
  const onSuccess = async (res) => {
    let userObject = jwt_decode(res.credential);

    const results = await axios
      .post(`${API_URL}/players/googleSignUp`, {
        FirstName: userObject.given_name,
        LastName: userObject.family_name,
        Email: userObject.email,
        Password: '',
      })
      .catch((e) => {
        alert(e);
        return;
      });

    const user = results.data;
    console.log(user);
    if (props.position === 1) {
      player1Login(user);
      navigate('/');
    } else {
      if (user.Email !== player1.Email) {
        player2Login(user);
        props.handleClose();
        navigate('/gameboard');
      } else {
        alert('Error - same user');
      }
    }
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
