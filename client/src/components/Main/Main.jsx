import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Profile from './Profile';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </main>
  );
};

export default Main;
