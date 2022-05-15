import React from 'react';
import useWallet from '../hooks/useWallet';

const Main = () => {
  const { web3, walletAddress } = useWallet();

  const handleWallet = async () => {
    const balance = await web3.eth.getBalance(walletAddress);
    console.log(balance);
  };

  return (
    <div>
      <button onClick={handleWallet}>See wallet balance</button>
    </div>
  );
};

export default Main;
