import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWallet from '../hooks/useWallet';

const Profile = () => {
  const { web3, walletAddress } = useWallet();
  const [ethBalance, setEthBalance] = useState(null);
  const [nftBalance, setNftBalance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!walletAddress) {
      navigate('/');
    }
  }, []);

  const handleEthBalance = async () => {
    try {
      const balance = await web3.eth.getBalance(walletAddress);
      setEthBalance(balance);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNftBalance = async () => {
    try {
      const balance = await web3.eth.getBalance(walletAddress);
      setNftBalance(balance);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Welcome, ${walletAddress}`}</h1>
      <button onClick={handleEthBalance}>See eth balance</button>
      <button onClick={handleNftBalance}>Display NFTs</button>
      {ethBalance && <h2>{`Eth: ${ethBalance}`}</h2>}
    </div>
  );
};

export default Profile;
