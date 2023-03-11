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

function App() {
  return (
    <div>
      <NavBar />
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
  );
}

export default App;
