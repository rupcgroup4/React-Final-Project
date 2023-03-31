import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './screens/Profile';
import Gameboard from './screens/Gameboard';
import GameRules from './screens/GameRules';
import HomePage from './screens/HomePage';
import LeaderBoard from './screens/LeaderBoard';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import NavBar from './components/NavBar/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [theme, setTheme] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: theme ? 'dark' : 'light',
    },
  });

  return (
    <GoogleOAuthProvider clientId='183064569344-co9l095h9n0hp4l7mgsrb088akv71eig.apps.googleusercontent.com'>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div>
          <NavBar theme={theme} setTheme={setTheme} />
          <div>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/gameboard' element={<Gameboard />} />
              <Route path='/gameRules' element={<GameRules />} />
              <Route path='/leaderboard' element={<LeaderBoard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
