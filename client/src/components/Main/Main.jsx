import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useWeb3 from '../hooks/useWeb3';
import Gallery from './Gallery';
import LandingPage from './LandingPage';
import Profile from './Profile';
import SingleNft from './SingleNft';
const Main = () => {
  const { web3 } = useWeb3();
  const navigate = useNavigate();
  useEffect(() => {
    if (!web3) {
      navigate('/');
    }
  }, [web3]);
  return (
    <main className="p-3">
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
