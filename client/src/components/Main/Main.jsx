import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Gallery from './Gallery';
import LandingPage from './LandingPage';
import Profile from './Profile';
import SingleNft from './SingleNft';
const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/nft/:id" element={<SingleNft />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </main>
  );
};

export default Main;
