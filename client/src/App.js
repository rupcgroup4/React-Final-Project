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
import PlayersContextProvider from './context/PlayersContextProvider';

function App() {
  const [theme, setTheme] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: theme ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <PlayersContextProvider>
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
      </PlayersContextProvider>
    </ThemeProvider>
  );
}

export default App;
